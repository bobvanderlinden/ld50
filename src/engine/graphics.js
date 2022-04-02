export default class Graphics {
  constructor(context) {
    this.context = context;
  }

  clear() {
    this.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, 9000, 9000);
    this.restore();
  }

  fillStyle(s) {
    if (s) {
      this.context.fillStyle = s;
    } else {
      return s;
    }
  }

  strokeStyle(s) {
    if (s) {
      this.context.strokeStyle = s;
    } else {
      return s;
    }
  }

  font(font) {
    this.context.font = font;
  }

  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, true);
    this.context.closePath();
  }

  rectangle(x, y, w, h) {
    this.context.rect(x, y, w, h);
  }

  polygon(points) {
    this.context.beginPath();
    if (points.length > 0) {
      this.context.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        this.context.lineTo(points[i].x, points[i].y);
      }
    }
    this.context.closePath();
  }

  strokePolygon(points) {
    this.polygon(points);
    this.context.stroke();
  }

  fillPolygon(points) {
    this.polygon(points);
    this.context.fill();
  }

  strokeRectangle(x, y, w, h) {
    this.context.strokeRect(x, y, w, h);
  }

  fillRectangle(x, y, w, h) {
    this.context.fillRect(x, y, w, h);
  }

  strokeCircle(x, y, radius) {
    this.circle(x, y, radius);
    this.context.stroke();
  }

  fillCircle(x, y, radius) {
    this.circle(x, y, radius);
    this.context.fill();
  }

  fillLoading(x, y, radius, fraction) {
    var c = this.context;
    var abegin = (fraction * 360 - 90) * (Math.PI / 180);
    var aend = (0 - 90) * (Math.PI / 180);

    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + Math.cos(abegin) * radius, y + Math.sin(abegin) * radius);
    c.arc(x, y, radius, abegin, aend, false);
    c.lineTo(x, y);
    c.closePath();
    c.fill();
  }

  shadow(color, blur, offx, offy, fn) {
    this.context.shadowColor = color;
    this.context.shadowBlur = blur;
    this.context.shadowOffsetX = offx;
    this.context.shadowOffsetY = offy;
    fn();
    this.context.shadowColor = "";
    this.context.shadowBlur = 0;
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
  }

  line(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.closePath();
  }

  strokeLine(x1, y1, x2, y2) {
    this.line(x1, y1, x2, y2);
    this.context.stroke();
  }

  translate(x, y, translated) {
    this.save();
    this.context.translate(x, y);
    translated();
    this.restore();
  }

  rotate(x, y, r, rotated) {
    this.save();
    this.context.translate(x, y);
    this.context.rotate(r);
    this.context.translate(-x, -y);
    rotated();
    this.restore();
  }

  scale(x, y, sx, sy, scaled) {
    this.save();
    this.context.translate(x, y);
    this.context.scale(sx, sy);
    this.context.translate(-x, -y);
    scaled();
    this.restore();
  }

  scalerotate(x, y, sx, sy, r, rotatedscaled) {
    this.save();
    this.context.translate(x, y);
    this.context.rotate(r);
    this.context.scale(sx, sy);
    this.context.translate(-x, -y);
    rotatedscaled();
    this.restore();
  }

  drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!img) return;
    this.context.drawImage.apply(this.context, arguments);
  }

  drawCenteredImage(img, x, y) {
    this.drawImage(img, x - img.width / 2, y - img.height / 2);
  }

  drawRotatedImage(img, x, y, angle) {
    this.rotate(x, y, angle, () => {
      this.drawImage(img, x, y);
    });
  }

  fillCenteredText(text, x, y) {
    var size = this.context.measureText(text);
    this.context.fillText(text, x - size.width / 2, y);
  }

  fillText(text, x, y) {
    this.context.fillText(text, x, y);
  }

  save() {
    if (!this._depth) {
      this._depth = 0;
    }
    this._depth++;
    this.context.save();
  }

  restore() {
    if (this._depth <= 0) {
      console.log("NOES");
      throw "NOES";
    }
    this.context.restore();
    this._depth--;
  }
}
