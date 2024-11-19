export class MeteorRain {
  private SCREEN_WIDTH = window.innerWidth;
  private SCREEN_HEIGHT = window.innerHeight;

  private cursor: any;
  private canvas: any;
  private context: any;

  private particles: any[] = [];

  private mouseX = 0;
  private mouseY = 0;

  constructor(canvas: any) {
    this.canvas = canvas;
    if (canvas && canvas.getContext) {
      this.context = this.canvas.getContext('2d');

      document.addEventListener('mousemove', this.documentMouseMoveHandler, false);
      document.addEventListener('mousedown', this.documentMouseDownHandler, false);
      window.addEventListener('resize', this.windowResizeHandler, false);

      this.createCursor?.();

      this.windowResizeHandler?.();

      setInterval(this.loop, 1000 / 100);
    }
  }

  createCursor(position?: any) {
    var w = 300;
    var h = 300;

    if (!position) {
      var pos = {
        x: (this.SCREEN_WIDTH - w) * 0.5 + (Math.random() * w),
        y: (this.SCREEN_HEIGHT - h) * 0.5 + (Math.random() * h)
      }

      var m = Cursor;
      m.position.x = pos.x;
      m.position.y = pos.y;

      this.cursor = m;

      this.createParticles(m.position);

    } else {
      var m = Cursor;
      m.position.x = position.x;
      m.position.y = position.y;

      this.createParticles(m.position);
    }
  }

  createParticles(pos) {
    for (var i = 0; i < 50; i++) {
      var p: any = Particle;
      p.position.x = pos.x;
      p.position.y = pos.y;
      p.shift.x = pos.x;
      p.shift.y = pos.y;

      this.particles.push(p);
    }
  }

  documentMouseMoveHandler(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  documentMouseDownHandler(event) {
    this.createCursor({ x: this.mouseX, y: this.mouseY });
  }

  windowResizeHandler() {
    this.canvas.width = this.SCREEN_WIDTH;
    this.canvas.height = this.SCREEN_HEIGHT;

    this.canvas.style.position = 'absolute';

    this.canvas.style.left = (window.innerWidth - this.SCREEN_WIDTH) * 0.5 + 'px';
    this.canvas.style.top = (window.innerHeight - this.SCREEN_HEIGHT) * 0.5 + 'px';
  }

  loop() {
    if (!this?.context) return;
    this.context.fillStyle = 'rgba(0,0,0,0.2)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var particle;
    var i, j, ilen, jlen;

    this.cursor.position.x += (this.mouseX - this.cursor.position.x) * 0.1;
    this.cursor.position.y += (this.mouseY - this.cursor.position.y) * 0.1;

    for (i = 0, ilen = this.particles.length; i < ilen; i++) {
      particle = this.particles[i];

      particle.angle += particle.speed;

      particle.shift.x += (this.cursor.position.x - particle.shift.x) * particle.speed;
      particle.shift.y += (this.cursor.position.y - particle.shift.y) * particle.speed;

      particle.position.x = particle.shift.x + Math.sin(i + particle.angle) * (particle.orbit * particle.force);
      particle.position.y = particle.shift.y + Math.cos(i + particle.angle) * (particle.orbit * particle.force);

      particle.orbit += (this.cursor.orbit - particle.orbit) * 0.01;

      this.context.beginPath();
      this.context.fillStyle = "hsl(" + ((particle.position.x / this.canvas.width + particle.position.y / this.canvas.height) * 180) + ", 100%, 70%)";
      this.context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
      this.context.fill();
    }
  }
}

const distanceBetween = (p1, p2) => {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx ^ 2 + dy ^ 2);
}

const Particle = {
  size: 2 + Math.random() * 4,
  position: { x: 0, y: 0 },
  shift: { x: 0, y: 0 },
  angle: 0,
  speed: 0.01 + Math.random() * 0.02,
  force: -(Math.random() * 10),
  orbit: 1,

}

const Cursor = {
  orbit: 100,
  position: { x: 0, y: 0 },
}