// ===============================
// MENU TOGGLE (UPDATED)
// ===============================
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// Close menu when clicking link
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("active");
  });
});


// ===============================
// STAR BACKGROUND
// ===============================
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffff";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}
animateStars();


// ===============================
// THREE.JS CUBE
// ===============================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1";

document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true
  })
);

scene.add(cube);
camera.position.z = 3;

function animateCube() {
  requestAnimationFrame(animateCube);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animateCube();


// ===============================
// SCROLL ANIMATION
// ===============================
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    if (top > sec.offsetTop - 300) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});


// ===============================
// RESPONSIVE FIX
// ===============================
window.addEventListener("resize", () => {
  resizeCanvas();

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});