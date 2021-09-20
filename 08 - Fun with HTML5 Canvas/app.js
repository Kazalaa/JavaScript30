const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'xor';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the function from running when they are not moused down
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0
  };

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 10) {
    direction = !direction;
  };

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

const advice = document.querySelector('#advice')
canvas.addEventListener('mousedown', (e) => {
  advice.remove();
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// This function reset the drawing from scratch
function resetDrawing() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "xor";
}

let removeActiveClass;
// This function change the ctx.globalCompositeOperation and toggle active class on the button
function changeGco() {
  // console.log(e);
  // console.log(this.value);
  ctx.globalCompositeOperation = this.value;
  removeActiveClass = document.querySelectorAll(".active")
  removeActiveClass.forEach(item => item.classList.remove("active"));
  this.classList.toggle("active");
}

const btnreset = document.getElementById('btn-reset')
btnreset.addEventListener('click', resetDrawing);

const changeButtons = document.querySelectorAll(".button").forEach(button =>
  button.addEventListener("click", changeGco)
);
