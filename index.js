/**
 * Coding Rainbow (www.patreon.com/codingrainbow) logo created with p5js (p5js.org)
 * 
 * @author Daniel Boa <daniel.boa@gmail.com> <twitter.com/DanielBoa>
 * @date 4th Jun 2016
 */

var colours = [ '#9659A7', '#2494C1', '#49BB6C', '#F1C500', '#F25A57' ]
var lineThickness = 30;
var outerRadius, innerRadius, x, y, endAngle, angleOffsets;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  angleOffsets = angleOffsets || colours.map(randomAngleOffset);
  outerRadius = (width < (height * 2) ? width : (height * 2)) * 0.6;
  innerRadius = outerRadius - ((colours.length * 2) * lineThickness);
  endAngle = endAngle || PI;
  x = width / 2;
  y = (height / 2) + (outerRadius / 4.5); 
}

function randomAngleOffset() {
  return random(radians(-5), radians(5));
}

function windowResized() {
  setup();
}

function draw() {
  var i;
  var startAngle = PI;
  var desiredEndAngle = startAngle + map(mouseX, 0, windowWidth, 0, PI);

  endAngle += (desiredEndAngle - endAngle) * 0.05;

  clear();
  background('#f5f5f5');
  noFill();
  strokeCap(ROUND);

  strokeWeight(lineThickness * 2);

  //  draw shadows
  for (i = 0; i < colours.length; i++) {
    drawArc(x, y + 10, startAngle, endAngle, i, '#ddd');
  }
  //  draw rainbow stroke
  for (i = 0; i < colours.length; i++) {
    drawArc(x, y, startAngle, endAngle, i, '#fff');
  }

  strokeWeight(lineThickness);

  //  draw coding rainbow
  for (i = 0; i < colours.length; i++) {
    drawArc(x, y, startAngle, endAngle, i);
  }
}

function drawArc(x, y, start, end, index, colour) {
  var r = map(index, 0, colours.length, outerRadius, innerRadius);

  colour = colour || colours[index];
  start += angleOffsets[index];
  end -= angleOffsets[index];
 
  end = (end > start) ? end : (start + radians(0.01));

  stroke(colour);
  arc(x, y, r, r, start, end);
}


//  avoid scrolling on mobile to allow interaction with touch to work as expected
document.addEventListener('mousemove', preventDefault);
document.addEventListener('touchmove', preventDefault);
function preventDefault(e) { e.preventDefault(); }