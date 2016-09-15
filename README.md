## React-Spirograph

This project was inspired by the beautiful patterns that can be created by Spirograph Sets.

I looked into the mathematics behind spirograph curves, and attempted to write some code to model and render them.

A live version is available here: [http://spirograph.juddn.com/](http://spirograph.juddn.com/ "http://spirograph.juddn.com/")

You type in pretty much any parameters and you will get some sort of result, but obviously, some are better than others. 
It usually works best when one of the wheels (inner or outer) remains fixed, and the other changing. 
Setting the outer wheel to a prime number (eg 97) also gives relatively stable results.

The numbers for the inner and outer wheels correspond to the number of teeth on real-world Spirograph gears. See here: [http://spirographicart.com/spirograph-pattern-guide/](http://spirographicart.com/spirograph-pattern-guide/ "http://spirographicart.com/spirograph-pattern-guide/") (unlike the real world, the inner wheel can actually be bigger than the outer etc)

## Description of Parameters

When animation is activated, the drawing will morph between two key frames (Start Frame and End Frame), each with their own set of parameters.

**outer wheel size:** number of teeth on outer wheel

**inner wheel size:** number of teeth on inner wheel

**inner wheel pen Position:** (equivalent to which hole you put the pen into on a real spirpgraph wheel). 

explanation of *inner wheel pen position* values:

* 0 : center (just draws a circle), 
* 1 : edge of wheel, 
* >1 : outside the perimeter of the wheel. 
* negative values: opposite side of the wheel

**color:** drawing color (colors will also morph between the key frames)

**animate:** when checked, morph between the two key frames. When not checked, just draw the start frame

**Precision**: Represents the number of subdivisions between each tooth position. The higher the number, the smoother the curves, but at the cost of greater CPU usage. (Note: try setting small non-integer values for some really interesting results)

**Afterglow**: sets the amount of persistence of previous lines drawn on the screen. The higher the value, the longer older pixels will continue to glow after they have been deactivated. Creates an nice effect reminiscent of phosphor persistence in old CRT screens.
