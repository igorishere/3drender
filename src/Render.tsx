import './Render.css';
import * as THREE from 'three';
import {useEffect} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 
import { AmbientLight, DirectionalLight, Mesh, Object3D, Scene } from 'three';
import {RenderProps} from './RenderProps';

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
let objectsToRender: Object3D[];

function Configure(){
    const element = document.getElementById('render') as HTMLElement;
  
    width = element?.clientWidth ?? 0;
    height = element.clientHeight ?? 0;
    aspectRatio = width/height;
  
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 10000 );
    renderer = new THREE.WebGLRenderer({alpha: true});
    orbitControls = new OrbitControls(camera,renderer.domElement); 
    ambLight = new THREE.AmbientLight( 0x404040 ,1);
    dirLightUp = new THREE.DirectionalLight( 0xffffff, 0.8 );
    dirLightDown = new THREE.DirectionalLight( 0xffffff, 0.8 );
    lastObject = new THREE.Object3D();
   }

   function Init(){
    renderer.setSize( width, height);  

    scene.add(ambLight);
    scene.add(dirLightUp);
    scene.add(dirLightDown);
  
    ambLight.position.set(0,10,0);
    dirLightUp.position.set(5,10,7.5);
    dirLightDown.position.set(-5,-10,-7.5);
   
    camera.position.set( 5,5,5 ); 
    camera.lookAt(0,0,0);
  
    orbitControls.enablePan = false;
    orbitControls.enableDamping = true;
    orbitControls.minDistance = 0;
    orbitControls.maxDistance = 50;

    if(objectsToRender.some( x => x != null )){
        objectsToRender.forEach( object =>{
            scene.add(object);
        });
    }
  }

  function Animate(){
    requestAnimationFrame( Animate );
    orbitControls.update(); 
      renderer.render( scene, camera );
  }
 
window.onresize = () => {
  const element = document.getElementById('render') as HTMLElement;
  
  width = element.clientWidth;
  height = element.clientHeight;
  aspectRatio = width/height;

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(width,height); 
};

function Render(props: RenderProps){

    if(props.objects!=null){
        objectsToRender = props.objects;
    }

    useEffect(() => { 
        Configure();
        Init();
        Animate();

        const element = document.getElementById('render') as HTMLElement;
        element.appendChild(renderer.domElement);
      });

    return(<div id='render'></div>)
}

export default Render;