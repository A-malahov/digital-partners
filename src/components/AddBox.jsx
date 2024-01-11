import {useThree} from "@react-three/fiber";
import * as THREE from "three";
import {useDrag} from 'react-use-gesture';
import {useEffect, useRef, useState} from "react";
import { animated, useSpring } from "@react-spring/three";
function AddBox(props) {
    const {selected, setSelected} = props;
    const [position, setPosition] = useState([0, 0, 0]);
    const {size, viewport} = useThree();
    const aspect = size.width / viewport.width;
    const ref = useRef();
    const refBox = useRef();
    const [line,setLine] = useState()
    useEffect(()=>{
        if(refBox.current){
            refBox.current.name='Cube'
            setLine(new THREE.LineSegments(new THREE.EdgesGeometry(refBox.current.geometry), new THREE.LineBasicMaterial({color: 'white'})));
        }
    },[])

    const bind = useDrag(
        ({offset: [x, y]}) => {
            const [, , z] = position;
            setPosition([x / aspect, -y / aspect, z]);
            refBox.current.scale.x = 1 + x / aspect;
            refBox.current.scale.y = 1 + -y / aspect;
            refBox.current.scale.z = 1 + z / aspect;
            refBox.current.position.x = (x / aspect) / 2;
            refBox.current.position.y = (-y / aspect) / 2;
            refBox.current.position.z = (z / 2);
        },
        {pointerEvents: true}
    );
    const [spring, api] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: { friction: 10 },
    }));
    window.addEventListener("keydown", (e) => {
        if (e.key === 'Escape' && selected) {
            setSelected(false);
        }
    });
    useEffect(()=>{
        if(selected){
            api.start({
                rotation: [0,Math.PI / 2,0]

            });
            setTimeout(()=>{
                api.start({
                    rotation: [0,0,0]

                });
            },300)
        }
    },[selected])
    return (
        <>{selected && (
            <group position={position} {...bind()} ref={ref}>
                <mesh scale={0.1} position={0.6}>
                    <sphereGeometry args={[1, 16, 16]}/>
                    <meshStandardMaterial color={"white"}/>
                </mesh>
            </group>
        )}

            <animated.mesh {...spring} onClick={() => {
                if (!selected) {
                    setSelected(true)
                }

            }}   onPointerMissed={() => {
                if (selected) {
                    setSelected(false)
                }
            }} ref={refBox} visible={true} receiveShadow={true} castShadow={true}>
                <boxGeometry attach='geometry' args={[1, 1, 1]}/>
                <meshStandardMaterial color={'pink'}/>
                {selected && (<primitive object={line}/>)}
            </animated.mesh>
        </>
    )

}

export default AddBox;