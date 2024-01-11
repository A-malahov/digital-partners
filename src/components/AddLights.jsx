import * as THREE from "three";
function AddLights(){
    const directionalLight = new THREE.DirectionalLight('white', 2);
    directionalLight.position.x = 1;
    directionalLight.position.z = 1;
    directionalLight.castShadow=true;
    return(
        <>
            <primitive object={directionalLight}></primitive>
        </>
    )
}

export default AddLights;