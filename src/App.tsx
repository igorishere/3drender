 import './App.css';  
 import { Object3D , BoxGeometry , MeshPhongMaterial,Mesh} from 'three';
 import Render from './Render';
 import logo from './assets/images/promob_logo_80x80.png';
 
function CreateCube(){
   const geometry = new  BoxGeometry( 1,1,1 );
   const material = new MeshPhongMaterial( { color: 0x00ff00 } );
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
            Nome: Lorem Ipsum
            <br /> 
            Código: LA1234  
          </div>

          <div id="informationAreaSmallerText">
            Cliente: Lorem Ipsum
            <br/> 
            Projeto: Lorem Ipsum
            <br/> 
            Data: 00/00/0000
          </div>
        </div>
        <img src={logo} alt="logo"/>
      </div>
      </>   
  );
}
export default App;
