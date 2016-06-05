var colours = [ '#9659A7', '#2494C1', '#49BB6C', '#F1C500', '#F25A57' ];
var gridSize = 120;
var torusSizeCoe = 1.4;
var donuts = [];
var mouseToScale = {};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  initScaleMap();
  initDonuts();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initDonuts();
}

function draw() {
  var i, donut, mouseScaleModifer;
  var aspect = width / height;
  var w = width;
  var h = height / aspect;

  ortho(-w / 2, w / 2, -h / 2, h / 2, 0.1, 100);
  ambientLight(255);
  translate(-w / 2, -h / 2);
  translate(-gridSize / 2, -gridSize / 2);

  for (i = 0; i < donuts.length; i++) {
    donut = donuts[i];

    mouseScaleModifer = mouseToScale[floor(dist(mouseX, mouseY, donut.x, donut.y))] || 1;

    push();
    translate(donut.x, donut.y);
    ambientMaterial(donut.colour);
    rotateY(((i % 2) ? HALF_PI : 0) + (0.02 * frameCount));
    scale(donut.scale * mouseScaleModifer);
    torus(8 * torusSizeCoe, 3 * torusSizeCoe);
    pop();
  }
}

function initScaleMap() {
  var scaleRadius = 3 * gridSize;

  for (var i = 0; i < scaleRadius; i++) {
    mouseToScale[i] = map(i, 0, scaleRadius, 2, 1);
  }
}

function initDonuts() {
  var x, y, donut, i, xOffset, yOffset, colour;
  var rows = ceil(height / gridSize);
  var cols = ceil(width / gridSize);

  for (y = 0; y < rows; y++) {
    for (x = 0; x < cols; x++) {
      colour = colours[floor(random(colours.length))];
      i = (y * cols) + x;
      xOffset = (y % 2) && (-gridSize / 4);
      yOffset = (x % 2) && (-gridSize / 6);

      donut = donuts[i] = donuts[i] || {};

      donut.x = (x * gridSize) + xOffset;
      donut.y = (y * gridSize) + yOffset;
      donut.colour = color(colour);
      donut.scale = random(0.6, 1);
    }
  }

  donuts = donuts.slice(0, i + 1);
}

//  avoid scrolling on mobile to allow interaction with touch to work as expected
document.addEventListener('mousemove', preventDefault);
document.addEventListener('touchmove', preventDefault);
function preventDefault(e) { e.preventDefault(); }