 import './App.css';
 import * as THREE from 'three';
 import {useEffect} from 'react';
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
 import { AmbientLight, DirectionalLight, Mesh, Object3D, Scene } from 'three';
import Render from './Render';


 let scene: Scene;
 let camera: THREE.PerspectiveCamera;
 let renderer: THREE.WebGLRenderer;
 let orbitControls: OrbitControls;
 let ambLight: AmbientLight;
 let dirLightUp: DirectionalLight;
 let dirLightDown:DirectionalLight;
 let width: number;
 let height: number;
 let aspectRatio: number;
 let lastObject: Object3D;
  
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
  camera.lookAt(0,0,0);

  orbitControls.enablePan = false;
  orbitControls.enableDamping = true;
  orbitControls.minDistance = 0;
  orbitControls.maxDistance = 50;
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
  const element = document.getElementById('render') as HTMLElement;

  width = element?.clientWidth ?? 0;
  height = element.clientHeight ?? 0;
  aspectRatio = width/height;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 10000 );
  renderer = new THREE.WebGLRenderer();
  orbitControls = new OrbitControls(camera,renderer.domElement); 
  ambLight = new THREE.AmbientLight( 0x404040 ,1);
  dirLightUp = new THREE.DirectionalLight( 0xffffff, 0.8 );
  dirLightDown = new THREE.DirectionalLight( 0xffffff, 0.8 );
  lastObject = new THREE.Object3D();
 } 

 function ResetCamera(){
  camera.position.set( 5,5,5 ); 
 }

 function AddCube(){
  var lastObjectPosition = lastObject.position;
  var {x,y,z} = lastObjectPosition;

  var cube = CreateCube();
  cube.position.set( x + 3, y, z );
  lastObject = cube;

  scene.add(cube);

 }

 let positionMouseDown = new THREE.Vector2();
 let positionMouseUp = new THREE.Vector2();

 window.addEventListener('mousedown', (event) => {
  
  positionMouseDown.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	positionMouseDown.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

 })

 window.addEventListener('mouseup',(event) =>
 {

  positionMouseUp.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	positionMouseUp.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 
  HandleClick();
})

function HandleClick(){

  if(positionMouseUp.distanceTo(positionMouseDown) === 0)
  {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( positionMouseUp, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    
    if(intersects.length > 0)
    {
      const obj = intersects[0].object;
      
      if(obj instanceof THREE.Mesh)
      {
        obj.material.color.set( '#f00' );
      }
    }
    else
    {
        if(scene.children.length > 0)
        {
          scene.children.forEach(element => {

            if(element instanceof Mesh)
            {
              element.material.color.set('#00FF00');
            }

          });
        } 
    }
  }
}

function App(){ 

var cube = CreateCube();

let objectsToRender: Object3D[] = [cube];

   return (
    <div id="App"> 
      <h1>3D render sample</h1>
      <div id="renderContainer"> 
      <Render objects={objectsToRender}/>
        <div id="toolBox">
          <button onClick={() => ResetCamera()}>Reset camera</button>
          <button onClick={() => AddCube()}>Add cube</button>
        </div>
      </div>
    </div>
  );
}
export default App;
