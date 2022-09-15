 import './App.css';
 import * as THREE from 'three';
 import {useEffect} from 'react';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 


 let scene,camera,renderer,orbitControls,ambLight,dirLightUp,dirLightDown, width,height,aspectRatio,lastObject;
  
function Init(){
  renderer.setSize( width, height);

  let cube = CreateCube();
  lastObject = cube;

  scene.add(cube);
  scene.add(ambLight);
  scene.add(dirLightUp);
  scene.add(dirLightDown);
  scene.background = new THREE.Color("#D5FFFB");

  ambLight.position.set(0,10,0);
  dirLightUp.position.set(5,10,7.5);
  dirLightDown.position.set(-5,-10,-7.5);

  ResetCamera();

  orbitControls.enablePan = false;
  orbitControls.enableDamping = true;
}


function Animate(){
  requestAnimationFrame( Animate );
  orbitControls.update(); 
	renderer.render( scene, camera );
}

function CreateCube(){
   const geometry = new THREE.BoxGeometry( 1,1,1 );
   const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  return new THREE.Mesh( geometry, material );
}

 function SetDefaultProperties(){
  width = document.getElementById('render').clientWidth;
  height = document.getElementById('render').clientHeight;
  aspectRatio = width/height;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  orbitControls = new OrbitControls(camera,renderer.domElement); 
  ambLight = new THREE.AmbientLight( 0x404040 ,1);
  dirLightUp = new THREE.DirectionalLight( 0xffffff, 0.8 );
  dirLightDown = new THREE.DirectionalLight( 0xffffff, 0.8 );
  lastObject = new THREE.Object3D();
 }

 window.onresize = () =>{
  width = document.getElementById('render').clientWidth;
  height = document.getElementById('render').clientHeight;
  aspectRatio = width/height;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(width,height); 
 }

 function ResetCamera(){
  camera.position.set( 5, 2, 3 );
 }

 function AddCube(){
  var lastObjectPosition = lastObject.position;
  var {x,y,z} = lastObjectPosition;

  var cube = CreateCube();
  cube.position.set( x + 3, y, z );
  lastObject = cube;

  scene.add(cube);

 }


function App() { 

  useEffect(() => { 
    SetDefaultProperties();
    Init();
    document.getElementById('render').appendChild(renderer.domElement);
    Animate();
  });

  return (
    <div id="App">
      <h1>3D render sample</h1>
      <div id="renderContainer">
        <div id="render"></div>
        <div id="toolBox">
          <button onClick={() => ResetCamera()}>Reset camera</button>
          <button onClick={() => AddCube()}>Add cube</button>
        </div>
      </div>
    </div>
  );
}

export default App;
