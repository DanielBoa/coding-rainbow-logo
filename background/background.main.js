var colours = [ '#9659A7', '#2494C1', '#49BB6C', '#F1C500', '#F25A57' ];
var gridSize = 100;
var donuts = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  initDonuts();
}

function windowResized() {
  setup();
}

function draw() {
  var i, donut;
  var aspect = width / height;
  var w = width;
  var h = height / aspect;

  background('#f5f5f5');
  ortho(-w / 2, w / 2, -h / 2, h / 2, 0.1, 100);
  ambientLight(255);
  translate(-w / 2, -h / 2);
  translate(-gridSize / 2, -gridSize / 2);

  for (i = 0; i < donuts.length; i++) {
    donut = donuts[i];
    push();
    translate(donut.x, donut.y);
    ambientMaterial(donut.colour);
    rotateY(((i % 2) ? HALF_PI : 0) + (0.02 * frameCount));
    torus(8 * 2, 3 * 2);
    pop();
  }

  torus(10, 5);
  translate(20, 0);
}

function initDonuts() {
  var x, y, i, colour;
  var colourIndex = 0;
  var rows = floor(height / gridSize);
  var cols = floor(width / gridSize);

  for (y = 0; y < rows; y++) {
    for (x = 0; x < cols; x++) {
      colourIndex = (++colourIndex < colours.length) ? colourIndex : 0;
      colour = colours[colourIndex];
      i = (y * cols) + x;

      donuts[i] = donuts[i] || {
        x: (x * gridSize),
        y: (y * gridSize),
        colour: color(colour)
      };
    }
  }

  donuts = donuts.slice(0, i + 1);
}