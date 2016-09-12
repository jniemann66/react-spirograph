import React, { Component } from 'react';
import Spirograph from './Spirograph.js';
//import {Table} from 'react-bootstrap'
import './App.css';

class App extends Component {
    constructor(props) {
    super(props);
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.state = {
      
      canvasWidth: 1024, // window.innerWidth,
      canvasHeight: 768, // Math.floor(window.innerHeight*0.75),
      isMobile: isMobile,  
      animate: true,
      afterglow: 5,
      minWheelSize: 1,
      maxWheelSize: 256,
      minPenPosition: -2,
      maxPenPosition: 2,
      minRadius: -300,
      maxRadius: 300,
      precision: isMobile ? 10 : 100, // use lower precision for mobiles (assuming weaker CPU)

      color0: '#ff0000',
      outerWheel0: 96,
      innerWheel0: 52,
      penPosition0: -2,
      radius0: 100,

      color1: '#0000ff',
      outerWheel1: 96,
      innerWheel1: 52,
      penPosition1: 2,
      radius1: 100
    };

   
  }

_onChangeOuterWheel0(evt){
    this.setState({
      outerWheel0: Math.min(Math.max(evt.target.value, this.state.minWheelSize), this.state.maxWheelSize)
    });
  }

_onChangeInnerWheel0(evt){
    this.setState({
      innerWheel0: Math.min(Math.max(evt.target.value, this.state.minWheelSize), this.state.maxWheelSize)
    });
  }

_onChangePenPosition0(evt){
    this.setState({
      penPosition0: Math.min(Math.max(evt.target.value, this.state.minPenPosition), this.state.maxPenPosition)
    });
  }

_onChangeRadius0(evt){
    this.setState({
      radius0: Math.min(Math.max(evt.target.value, this.state.minRadius), this.state.maxRadius)
    });
  }

_onChangeColor0(evt){
    this.setState({
      color0: evt.target.value
    });
  }

_onChangeOuterWheel1(evt){
    this.setState({
      outerWheel1: Math.min(Math.max(evt.target.value, this.state.minWheelSize), this.state.maxWheelSize)
    });
  }

_onChangeInnerWheel1(evt){
    this.setState({
      innerWheel1: Math.min(Math.max(evt.target.value, this.state.minWheelSize), this.state.maxWheelSize)
    });
  }

_onChangePenPosition1(evt){
    this.setState({
      penPosition1: Math.min(Math.max(evt.target.value, this.state.minPenPosition), this.state.maxPenPosition)
    });
  }

_onChangeRadius1(evt){
    this.setState({
      radius1: Math.min(Math.max(evt.target.value, this.state.minRadius), this.state.maxRadius)
    });
  }

_onChangeColor1(evt){
    this.setState({
      color1: evt.target.value,
    });
  }

  _onChangePrecision(evt){
    this.setState({
      precision: Math.min(Math.max(evt.target.value, 0.01), 1000)
    });
  }

_onChangeAfterglow(evt){
   
    this.setState({
      afterglow: Math.min(Math.max(evt.target.value, 0), 10)
    });
  }

_onChangeAnimate(evt){
   
    this.setState({
      animate: evt.target.checked
    });
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Spirograph Animation</h2>
        </div>
        <hr/>
        <div style={{margin: "auto", width: "50%"}}>
          <table>
            <thead>
              <tr>
                <th scope="col">Start Frame</th>
                <th scope="col">End Frame</th>
                <th scope="col">Global Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="parameterLabel">

                  outer wheel size: <input type="number" min={this.state.minWheelSize} max={this.state.maxWheelSize} value={this.state.outerWheel0} onChange={this._onChangeOuterWheel0.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  inner wheel size: <input type="number" min={this.state.minWheelSize} max={this.state.maxWheelSize} value={this.state.innerWheel0} onChange={this._onChangeInnerWheel0.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  inner wheel pen position: <input type="number" min={this.state.minPenPosition} max={this.state.maxPenPosition} step="0.01" value={this.state.penPosition0} onChange={this._onChangePenPosition0.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  drawing radius: <input type="number" min={this.state.minRadius} max={this.state.maxRadius} value={this.state.radius0} onChange={this._onChangeRadius0.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  color: <input type="color" value={this.state.color0} onChange={this._onChangeColor0.bind(this)}/> 
                  </p>
                </td>
                <td>
                  <p className="parameterLabel">
                  outer wheel size: <input type="number" min={this.state.minWheelSize} max={this.state.maxWheelSize} value={this.state.outerWheel1} onChange={this._onChangeOuterWheel1.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  inner wheel size: <input type="number" min={this.state.minWheelSize} max={this.state.maxWheelSize} value={this.state.innerWheel1} onChange={this._onChangeInnerWheel1.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  inner wheel pen position: <input type="number" min={this.state.minPenPosition} max={this.state.maxPenPosition} step="0.01" value={this.state.penPosition1} onChange={this._onChangePenPosition1.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  drawing radius: <input type="number" min={this.state.minRadius} max={this.state.maxRadius} value={this.state.radius1} onChange={this._onChangeRadius1.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  color: <input type="color" value={this.state.color1} onChange={this._onChangeColor1.bind(this)}/> 
                  </p>
                </td>
                <td>
                  <p className="parameterLabel">
                    Animate <input type="checkbox" checked={this.state.animate} onChange={this._onChangeAnimate.bind(this)}/>
                  </p>
                  <p className="parameterLabel">
                    Precision <input type="number" min={0.0} max={1000} value={this.state.precision} onChange={this._onChangePrecision.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                    Afterglow <input type="number" min={0} max={10} step="0.1" value={this.state.afterglow} onChange={this._onChangeAfterglow.bind(this)} />
                  </p>
                  <p className="parameterLabel">
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Spirograph outerWheel0={this.state.outerWheel0} innerWheel0={this.state.innerWheel0} penPosition0={this.state.penPosition0} radius0={this.state.radius0} color0={this.state.color0} outerWheel1={this.state.outerWheel1} innerWheel1={this.state.innerWheel1} penPosition1={this.state.penPosition1} radius1={this.state.radius1} color1={this.state.color1} canvasWidth={this.state.canvasWidth} canvasHeight={this.state.canvasHeight} precision={this.state.precision} afterglow={this.state.afterglow} animate={this.state.animate}/>
          <p style={{textAlign: "center"}}>Judd Niemann 2016</p>  
        </div>
      </div>
    );
  }
}

export default App;
