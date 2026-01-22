const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
   w = canvas.width = innerWidth;
   h = canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const particles = [];
const COUNT = 750;

for (let i = 0; i < COUNT; i++) {
   particles.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (Math.min(w, h) * 0.55),
      speed: 0.0005 + Math.random() * 0.004,
      size: 0.7 + Math.random() * 1.2,
   });
}

let mouseX = 0,
   mouseY = 0;
addEventListener("mousemove", (e) => {
   mouseX = (e.clientX - w / 2) * 0.0008;
   mouseY = (e.clientY - h / 2) * 0.0008;
});

function drawText() {
   ctx.save();
   ctx.translate(w / 2, h / 2); // EXACT center

   ctx.fillStyle = "rgba(255, 0, 0, 0.95)";
   ctx.shadowColor = "red";
   ctx.shadowBlur = 35;

   ctx.font = "bold 48px Segoe UI, sans-serif";
   ctx.textAlign = "center";
   ctx.textBaseline = "middle"; // THIS fixes vertical centering
   ctx.fillText("WIN3ZZ", 0, 0);

   ctx.restore();
}

function loop(t) {
   ctx.clearRect(0, 0, w, h);
   ctx.save();
   ctx.translate(w / 2, h / 2);

   for (const p of particles) {
      p.angle += p.speed + mouseX * 0.02;

      const x = Math.cos(p.angle) * p.radius;
      const y = Math.sin(p.angle) * p.radius + mouseY * 25;

      ctx.fillStyle = "rgba(0, 200, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
   }

   ctx.restore();

   drawText();

   requestAnimationFrame(loop);
}

requestAnimationFrame(loop);