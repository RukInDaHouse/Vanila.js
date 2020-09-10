var ss = 1000; //svg size
var p = document.getElementById('p'),
    poly, $;

function Pt(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Pt.dist = function(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

function Rect(x, y, w, h) {
    this.x = 0;
    this.y = 0;
    this.w = w || 0; 
    this.h = h || 0; 
    this.l = x; //left
    this.r = x + w; //right
    this.t = y; //top
    this.b = y + h; //bottom
  }
  //verlet point
function vPt(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.px = this.x;
    this.py = this.y;
  }
  //update
vPt.prototype.upd = function() {
    var tmpX = this.x,
      tmpY = this.y;
    this.x += this.getX();
    this.y += this.getY();
    this.px = tmpX;
    this.py = tmpY;
  }
  //set position
vPt.prototype.setPos = function(x, y) {
    this.x = this.px = x;
    this.y = this.py = y;
  }
  //contain
vPt.prototype.cont = function(rect) {
    this.x = Math.max(rect.l, Math.min(rect.r, this.x));
    this.y = Math.max(rect.t, Math.min(rect.b, this.y));
  }
  //set verlet x
vPt.prototype.setX = function(val) {
    this.px = this.x - val;
  }
  //get verlet x
vPt.prototype.getX = function() {
    return this.x - this.px;
  }
  //set verlet y
vPt.prototype.setY = function(val) {
    this.py = this.y - val;
  }
  //get verlet y
vPt.prototype.getY = function() {
    return this.y - this.py;
  }
  //verlet lines
function vLine(ptA, ptB, k, length) {
    this.ptA = ptA;
    this.ptB = ptB;
    this.k = k || 0.5;
    this.length = length || Pt.dist(ptA, ptB);
  }
  //update lines
vLine.prototype.upd = function() {
  var dx = this.ptB.x - this.ptA.x,
      dy = this.ptB.y - this.ptA.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      diff = (this.length - dist) / dist,
      offX = diff * dx * this.k,
      offY = diff * dy * this.k;
      this.ptA.x -= offX;
      this.ptA.y -= offY;
      this.ptB.x += offX;
      this.ptB.y += offY;
}

