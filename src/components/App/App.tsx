 import './style/App.css';  
 import './style/App@500-800.css';  
 import { Object3D , BoxGeometry , MeshPhongMaterial,Mesh} from 'three';
 import Render from '../Render/Render'; 
import logo from '../../assets/images/promob_logo_80x80.png';
 
function CreateCube(){
   const geometry = new  BoxGeometry( 1,1,1 );
   const material = new MeshPhongMaterial({ color: 0x151FD3,transparent: true,opacity:0.9 } );
  return new  Mesh( geometry, material );
} 
function App(){ 

var cube = CreateCube();

let objectsToRender: Object3D[] = [cube];

   return (
    <>
      <div id="renderContainer"> 
        <Render objects={objectsToRender}/> 
      </div> 
      <div id="informationArea">
        <div id="informationAreaText">
          <div id="informationAreaBiggerText">
            Lateral esquerda - LT0008A
          </div>

          <div id="informationAreaSmallerText">
            <p>Cliente: Lorem Ipsum</p> 
            <p>Projeto: Lorem Ipsum</p> 
            <p>Data: 00/00/0000</p>
          </div>
        </div>
        <img src={logo} alt="logo"/>
      </div>
      </>   
  );
}
export default App;
