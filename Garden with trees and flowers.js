// === Scene, Camera, Renderer ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 15, 10);
scene.add(directionalLight);

// === Ground (Grass) ===
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x7cfc00 }); // Lawn Green
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// === Sky (Background) ===
scene.background = new THREE.Color(0x87CEEB); // Sky Blue

// === Tree Function ===
function createTree(x, z) {
  const tree = new THREE.Group();

  // Trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 4, 8); // Larger Trunk
  const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Brown
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = 2;
  tree.add(trunk);

  // Foliage
  const foliageGeometry = new THREE.SphereGeometry(2.5, 16, 16); // Larger Foliage
  const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 }); // Forest Green
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.y = 4;
  tree.add(foliage);

  tree.position.set(x, 0, z);
  scene.add(tree);
}

// Add Multiple Trees
for (let i = 0; i < 8; i++) {
  createTree(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 60
  );
}

// === Flower Plant Function ===
function createFlowerPlant() {
  const flowerPlant = new THREE.Group();

  // Stem
  const stemGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8); // Taller and thicker stem
  const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 }); // Green stem
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.y = 1;
  flowerPlant.add(stem);

  // Leaves
  const leafGeometry = new THREE.SphereGeometry(0.5, 8, 8); // Bigger leaves
  const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x32CD32 }); // Lime Green

  for (let i = 0; i < 4; i++) {
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(
      (Math.random() - 0.5) * 0.8,
      0.5 + Math.random() * 0.5,
      (Math.random() - 0.5) * 0.8
    );
    flowerPlant.add(leaf);
  }

  // Flower Petals
  const petalGeometry = new THREE.SphereGeometry(0.4, 8, 8); // Bigger petals
  const petalColors = [0xFF6347, 0xFFD700, 0xFF69B4, 0x8A2BE2];

  for (let i = 0; i < 5; i++) {
    const petalMaterial = new THREE.MeshLambertMaterial({
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    });
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.position.set(
      Math.sin((i / 5) * Math.PI * 2) * 0.6,
      2,
      Math.cos((i / 5) * Math.PI * 2) * 0.6
    );
    flowerPlant.add(petal);
  }

  // Flower Center
  const centerGeometry = new THREE.SphereGeometry(0.25, 8, 8); // Larger center
  const centerMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFF00 }); // Yellow
  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  center.position.y = 2;
  flowerPlant.add(center);

  return flowerPlant;
}

// Add Multiple Flower Plants
function createFlowerPlants(count) {
  for (let i = 0; i < count; i++) {
    const flowerPlant = createFlowerPlant();
    flowerPlant.position.set(
      (Math.random() - 0.5) * 60,
      0,
      (Math.random() - 0.5) * 60
    );
    scene.add(flowerPlant);
  }
}

createFlowerPlants(40); // Add 40 large flower plants

// === Camera Position ===
camera.position.set(0, 25, 50);
camera.lookAt(0, 0, 0);

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === Resize Handler ===
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Math.random is used so as obvious the position of trees and flowers change on refresh
