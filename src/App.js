import './App.css';
import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import AddBox from "./components/AddBox";
import AddLights from "./components/AddLights";
import {useState} from "react";

function App() {
    const [selected,setSelected] = useState(false)

  return (
    <div className="App">
      <Canvas
          style={{background: "#58ada1"}}
          shadows={true}>
        <OrbitControls enabled={!selected}/>
        <AddLights/>
        <AddBox selected={selected} setSelected={setSelected}/>
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={50} near={1} far={200}/>
      </Canvas>
    </div>
  );
}

export default App;
