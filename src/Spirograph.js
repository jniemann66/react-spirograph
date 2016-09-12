import React, { Component } from 'react';

// hex2rgb() : converts a html hex color string to separate r,g,b values returned as an array
function hex2rgb(hexString) {
    if (hexString.lastIndexOf('#') > -1) {
        hexString = hexString.replace(/#/, '0x');
    } else {
        hexString = '0x' + hexString;
    }
    var r = hexString >> 16;
    var g = (hexString & 0x00FF00) >> 8;
    var b = hexString & 0x0000FF;
    return [r, g, b];
};

// rgb2hex() : convert separate r,g,b values to html 6-digit hex color string
function rgb2hex(r, g, b) {
  return '#' 
  + ('0' + r.toString(16)).slice(-2)
  + ('0' + g.toString(16)).slice(-2)
  + ('0' + b.toString(16)).slice(-2); 
}

/////////////////////////////////////////////////////////////////////////////////////
// Spirograph Component
// List of accepted Props:

// outerWheel0
// innerWheel0
// penPosition0
// radius0
// color0
// outerWheel1
// innerWheel1
// penPosition1
// radius1
// color1
// animate
// canvasWidth
// canvasHeight
// precision
// afterglow

class Spirograph extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        canvasWidth: props.canvasWidth,
        canvasHeight: props.canvasHeight,
        centerX: props.canvasWidth / 2,
        centerY: props.canvasHeight / 2,
        animationFrame: 0, // animation frames are numbered from 0 to sequenceLength-1 inclusive
        animationDirection: 1, // 1: forward, -1: reverse
        sequenceLength: 256, // total number of frames in animation sequence
        reciprocalSequenceLength: 1 / 256.0, // reciprocal (for avoiding division)
        wipeGlobalAlpha: 0.5, // global alpha value for clearing previous frames using fillRect() - value derived from props.afterglow using a polynomial formula
        context: null,
      };

     // animation timer:
     setInterval(this._mutateShape.bind(this),16.7); // 16.7ms = 60fps
    }
  
    componentDidMount() {
        this.setState({
          context: this.refs.canvas.getContext('2d')
        });
      //  this.refs.canvas.getContext('2d').translate(0.5, 0.5); // straddle pixels - helps with antialiasing (sort of ...)
        this.updateCanvas();
    }

    componentWillReceiveProps (nextProps) {
      let a = nextProps.afterglow;
      
      // custom polynomial to map "afterglow" value to globalAlpha value: (thanks mycurvefit.com ...)
      let ga = 0.9995114 
      - 0.08828013*a
      - 0.09579729*Math.pow(a,2) 
      + 0.02521496*Math.pow(a,3) 
      - 0.00230852*Math.pow(a,4) 
      + 0.00007333708*Math.pow(a,5); 
   
      this.setState({        
        canvasWidth: nextProps.canvasWidth,
        canvasHeight: nextProps.canvasHeight,
        centerX: nextProps.canvasWidth / 2,
        centerY: nextProps.canvasHeight / 2,
        wipeGlobalAlpha:  Math.min(Math.max(ga, 0.001), 1.0),
      });
    }

     _mutateShape(){
      
      if(this.state.animationFrame <= 0)
        this.setState({animationDirection: 1});
      else if(this.state.animationFrame >= (this.state.sequenceLength-1) )
        this.setState({animationDirection: -1});

      this.setState({
        animationFrame: this.state.animationFrame + this.state.animationDirection
      });

      this.updateCanvas();
    }

    updateCanvas() {
        const context = this.state.context;
        let width = this.refs.canvas.width;
        let height = this.refs.canvas.height;
        context.globalAlpha = this.state.wipeGlobalAlpha;
        context.fillStyle = '#000000';
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
     
        // M : Outer Wheel, N: Inner Wheel
        
        let M;
        let N;
        let penRadius;
        let drawingRadius;

        if(this.props.animate) {

          let p = this.state.animationFrame * this.state.reciprocalSequenceLength; // position in animation sequence, normalized to range of [0.0,1.0)

          // split start and end colors into their component values:
          let colorComponents0 = hex2rgb(this.props.color0); // note: r,g,b components returned as array
          let colorComponents1 = hex2rgb(this.props.color1); 

          // calculate current color based on value of p
          let currentRed = Math.floor(colorComponents0[0] + p * (colorComponents1[0] - colorComponents0[0]));
          let currentGreen = Math.floor(colorComponents0[1] + p * (colorComponents1[1] - colorComponents0[1]));
          let currentBlue = Math.floor(colorComponents0[2] + p * (colorComponents1[2] - colorComponents0[2])); 
        
          // set color:
          context.strokeStyle = rgb2hex(currentRed,currentGreen,currentBlue);

          // calculate current params based on p:
          M = Math.floor(this.props.outerWheel0 + p * (this.props.outerWheel1 - this.props.outerWheel0));
          N = Math.floor(this.props.innerWheel0 + p * (this.props.innerWheel1 - this.props.innerWheel0));
          penRadius = this.props.penPosition0 + p * (this.props.penPosition1 - this.props.penPosition0);
          drawingRadius = this.props.radius0 + p * (this.props.radius1 - this.props.radius0);
          
        } else {
          M = this.props.outerWheel0;
          N = this.props.innerWheel0;
          penRadius = this.props.penPosition0;
          drawingRadius = this.props.radius0;
          context.strokeStyle = this.props.color0;
        }
        
        var gearRatio = N / M;
        var inc = (2*Math.PI / Math.max(N,M) / this.props.precision);
       
        context.beginPath();

     // draw first point:   
     // context.moveTo (centerX + drawingRadius*((1 - gearRatio)  + penRadius * gearRatio), centerY);
        
        for (var t = 0; t < 2*Math.PI;  t += inc){
          var x = (1 - gearRatio) * Math.cos(N * t) + penRadius * (gearRatio) * Math.cos ((M - N) * t);
          var y = (1 - gearRatio) * Math.sin(N * t) - penRadius * (gearRatio) * Math.sin ((M - N) * t);
          context.lineTo (this.state.centerX + drawingRadius * x, this.state.centerY + drawingRadius * y); 
        }
     
        context.stroke();
   
    }
    render() {
        
        return ( 
            <canvas ref="canvas" width={this.props.canvasWidth} height={this.props.canvasHeight}/>
        );
    }
}

Spirograph.defaultProps = {
  canvasWidth: 640,
  canvasHeight: 480,
  precision: 100,
  afterglow: 5,
  animate: true,
};

export default Spirograph;