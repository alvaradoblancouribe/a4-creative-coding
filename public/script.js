import * as THREE from "./three.js";
import * as dat from "./data.gui.js";
const app = {
  init() {
    alert(
      "this application displays the public schools, hospitals, police stations, and fire departments in Boston. Hover over the locations to learn more about each location. In addition, a color themed animation is attached in the botton right"
     );
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    document.body.appendChild(this.renderer.domElement);

    this.createLights();
    this.knot = this.createKnot(110, 5, 0xffc0cb);
    this.knot2 = this.createKnot(250, 35, 0xc71585);
    this.fire=this.createFire()
    this.ball = this.createBall();

    this.createGUI();

    this.render = this.render.bind(this);
    this.render();
  },

  createGUI() {
    this.gui = new dat.GUI();
    this.gui.add(this.ball.scale, "z", 0.1, 2).name("Center");
    this.gui.add(this.knot.scale, "z", 0.1, 2).name("Small Knot");
    //this.gui.add(this.knot1.scale, "z", 0.1, 2).name("Middle Knot");
    this.gui.add(this.knot2.scale, "z", 0.1, 2).name("Large Knot");
    this.gui.add(this.knot.rotation, "x", 0, 180).name("Small Knot Rotate");
    // this.gui.add(this.knot1.rotation, "x", 0, 180).name("Middle Knot Rotate");
    this.gui.add(this.knot2.rotation, "x", 0, 180).name("Large Knot Rotate");
    this.gui.add(this.camera.position, "z", 0.1, 200).name("Camera");
  },

  createLights() {
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.z = 100;

    this.scene.add(pointLight);
  },

  createKnot(x, y, color) {
    const knotgeo = new THREE.TorusKnotGeometry(y, 10, x, 10, 30, 36);
    const mat = new THREE.MeshPhongMaterial({ color: color, shininess: 5 });
    const knot = new THREE.Mesh(knotgeo, mat);

    this.scene.add(knot);
    return knot;
  },

  createBall() {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    const geometry = new THREE.ShapeBufferGeometry(shape);

    //const geometry = new THREE.DodecahedronBufferGeometry(2, 2);
    var material = new THREE.MeshBasicMaterial({ color: 0x6666ff });
    var ball = new THREE.Mesh(geometry, material);
    this.scene.add(ball);
    return ball;
  },

  createFire() {
    const radius = 700;
    const geometry = new THREE.OctahedronBufferGeometry(radius);
    return geometry;
  },

  render(speed) {
    this.knot.rotation.y += 0.001;
    this.ball.rotation.y += 0.001;
    this.knot2.rotation.y += 0.0025;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render);
  }
};

window.onload = () => app.init();
