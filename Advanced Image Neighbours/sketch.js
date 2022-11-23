//https://idmnyu.github.io/p5.js-image/Advanced/index.html
var img = new Array(2);
let whichimage = 0;

var srcimg, dstimg;

function preload() {
  srcimg = loadImage('img.png');
}

function setup() {
  createCanvas(srcimg.width, srcimg.height);
  pixelDensity(1);
  dstimg = createImage(srcimg.width, srcimg.height);
  img[0] = srcimg;
  img[1] = dstimg;
}

function draw() {
  background(0, 0, 0);
  img[0].loadPixels();
  img[1].loadPixels();
  processImage();
}

function processImage ( ) {
var w = srcimg.width;
var h = srcimg.height;
for (var x = 0; x < w; x++) {
for (var y = 0; y < h; y++) {
  /*
These formulas might look scary, but they are not that difficult to grasp once you look at them in sections. The first thing we have to pay attention to is the position of the neighbor regarding its x and y values.

If you want to access the left neighbor of a pixel, for example, you know that it’s y position is the same, and it’s x position is the x of the center pixel - 1.
If you want to access the lower neighbor of a pixel, you know that it’s x position is the same, and it’s y position is the y of the center pixel + 1.

If the center pixel is at the edge, simply plus or minus one from its x,y coordinate might get a number that is out of index. For instance, if x,y coordinate is 0,0, when we getting the center left pixel we will use -1,0, and it turns to index -4 (out of range). To prevent this happen, we define neighbors for pixels that are on the edge in a different way.

To access the left neighbor, we will need the ( x position relative to the center pixel + width) % width. This formula works because if the pixel is not at the edge, the remainder will be the number itself, not affecting the result at all. However, if the x position is higher than the width, it will prevent the number from getting out of range. Following the same logic, to access the upper neighbor, we will need the ( y position relative to the center pixel + height) % height.
  */
// PIXEL NEIGHBORHOOD
var uc = ((x-0+w)%w + w*((y-1+h)%h))*4;//location of upper center px
var ul = ((x-1+w)%w + w*((y-1+h)%h))*4;//location of upper left px
var ur = ((x+1+w)%w + w*((y-1+h)%h))*4;//location of upper right px

var mc = ((x-0+w)%w + w*((y+0+h)%h))*4;//location of current px
var ml = ((x-1+w)%w + w*((y+0+h)%h))*4;//location of left px
var mr = ((x+1+w)%w + w*((y+0+h)%h))*4;//location of right px

var lc = ((x-0+w)%w + w*((y+1+h)%h))*4;//location of lower center px
var ll = ((x-1+w)%w + w*((y+1+h)%h))*4;//location of lower left px
var lr = ((x+1+w)%w + w*((y+1+h)%h))*4;//location of lower right px
  /*The process of manipulating each pixel is similar to the process we use to manipulate each rgb value, except that instead of simply saying that:

pixels [ index + 0 ] = a number

We need to copy pixels from the image we are displaying to the one we are manipulating. That means we need to do:

dstimg.pixels [ mc ] == src.pixels[ mc ]

To generate motion, we cannot copy the pixel at the same position. If we want to scroll up, for example, we copy into the destination image the pixel below on the source image.*/
  
// COPYING (to scroll up) 
img[1-whichimage].pixels [mc] = img[whichimage].pixels [lc];
img[1-whichimage].pixels [mc+1] = img[whichimage].pixels [lc+1];
img [1-whichimage].pixels [mc+2] = img[whichimage].pixels [lc+2];
img [1-whichimage].pixels [mc+3] = img[whichimage].pixels [lc+3];

        }
    }
  
/*After we have made the changes which will cause the image to be animated, we can then flip the image we are manipulating with the one we are displaying and let our for loop to that repeatedly.*/
  
whichimage = 1-whichimage; // flip source and destination
img[whichimage].updatePixels () ;
image (img[whichimage], 0, 0, srcimg.width, srcimg.height);
  
}

