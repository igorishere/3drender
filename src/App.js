 import './App.css';
 import * as THREE from 'three';
 import {useEffect} from 'react';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

 
function init(){
  renderer.setSize( width, height);

  let cube = CreateCube();

  scene.add(cube);
  scene.add(ambLight);
  scene.add(dirLightUp);
  scene.add(dirLightDown);

  ambLight.position.set(0,10,0);
  dirLightUp.position.set(5,10,7.5);
  dirLightDown.position.set(-5,-10,-7.5);

  camera.position.set(0,0,5);

  orbitControls.enablePan = false;
  orbitControls.enableDamping = true;
}


function animate(){
  requestAnimationFrame( animate );
  orbitControls.update(); 
	renderer.render( scene, camera );
}

function CreateCube(){
  const geometry = new THREE.BoxGeometry( 1,1,1 );
  const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  return new THREE.Mesh( geometry, material );
}

const width = 1000;
const height = 600;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const orbitControls = new OrbitControls(camera,renderer.domElement); 
const ambLight = new THREE.AmbientLight( 0x404040 );
const dirLightUp = new THREE.DirectionalLight( 0xffffff, 0.5 );
const dirLightDown = new THREE.DirectionalLight( 0xffffff, 0.5 );


function App() {

  useEffect(() => { 
    init();
    document.getElementById('renderContainer').appendChild(renderer.domElement);
    animate();
  });

  return (
    <div id="App">
      <h1>3D render sample</h1>
      <div id="renderContainer"></div>
    </div>
  );
}

export default App;
