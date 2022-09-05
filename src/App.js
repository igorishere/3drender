 import './App.css';
 import * as THREE from 'three';
 import {useEffect} from 'react';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

 
function init(){
  renderer.setSize( width, height);

  let cube = CreateCube();

  scene.add(cube);

  camera.position.z = 5;
}


function animate(){
  requestAnimationFrame( animate );
  orbitControls.update(); 
	renderer.render( scene, camera );
}

function CreateCube(){
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  return new THREE.Mesh( geometry, material );
}

const width = 1000;
const height = 600;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const orbitControls = new OrbitControls(camera,renderer.domElement); 

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
