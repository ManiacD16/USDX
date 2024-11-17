import React, { useRef, useMemo, useContext, createContext } from 'react';
import { useGLTF, Merged, useAnimations } from '@react-three/drei';

const context = createContext();

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/1k.glb');
  const instances = useMemo(
    () => ({
      Object: nodes.Object_7,
      Object1: nodes.Object_8,
      Object2: nodes.Object_9,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  );
}

export default function Robo(props) {
  const instances = useContext(context);
  const group = useRef();
  
  // Load animations safely
  const { nodes, animations } = useGLTF('/1k.glb');
  const { actions } = useAnimations(animations || [], group); // Use an empty array if no animations

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[1.5709, 0, 0]}
          scale={1.4421}
          userData={{ name: 'Sketchfab_model' }}>
          <group
            name="f95ba1337bf34cbaa688b750654cb3acfbx"
            rotation={[-Math.PI, 0, 0]}
            scale={0.01}
            userData={{ name: 'f95ba1337bf34cbaa688b750654cb3ac.fbx' }}>
            <group name="Object_2" userData={{ name: 'Object_2' }}>
              <group name="RootNode" userData={{ name: 'RootNode' }}>
                <group name="Object_4" userData={{ name: 'Object_4' }}>
                  <primitive object={nodes._rootJoint} />
                  <instances.Object name="Object_7" userData={{ name: 'Object_7' }} />
                  <instances.Object1 name="Object_8" userData={{ name: 'Object_8' }} />
                  <instances.Object2 name="Object_9" userData={{ name: 'Object_9' }} />
                  <group name="Object_6" userData={{ name: 'Object_6' }} />
                  <group
                    name="Droide_de_seguridad_Star_Wars_KX"
                    userData={{ name: 'Droide_de_seguridad_Star_Wars_KX' }}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/1k.glb');
