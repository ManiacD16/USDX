import React, { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import './styles.css'
import {
  Billboard,
  Capsule,
  Cylinder,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei'
import Dna from './dna'
import Particles from './Particles'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  HueSaturation,
  SMAA,
  Vignette
} from '@react-three/postprocessing'
import CameraRig from './CameraRig'
import CameraAnimation from './CameraAnimation'
import Robo from './eth'
// import Robo from './1k'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 1, 4] }} gl={{ antialias: false, alpha: false }} dpr={1}>
      <color args={['#cee7ff']} attach="background" />
      <Suspense fallback={null}>
        <CameraRig>
          <Float rotation={[-0.8, 0, -Math.PI / 2.5]} floatIntensity={4} rotationIntensity={4}>
            {/* <Cylinder args={[1.8, 1.8, 0.2, 200]}> */}
            {/* <MeshTransmissionMaterial
              ior={1.3}
              color={'#c3e9ff'}
              clearcoat={0.5}
              roughness={0.3}
              iridescence={1}
              iridescenceIOR={1.55}
              chromaticAberration={0.15}
              anisotropicBlur={0.1}
            /> */}
            {/* </Cylinder> */}

            {/* Position ETH inside the cylinder */}
            <Robo
              scale={[35, 35, 15]} // Increased size
              position={[0, 0, -0.1]} // Adjusted to be inside the cylinder
              rotation={[Math.PI / 2, 0, 0]} // Lay flat
            />
          </Float>

          <Environment preset="city" environmentIntensity={1.5}>
            <Lightformer form="rect" intensity={0.1} position={[2, 3, 3]} scale={3} />
            <Lightformer form="rect" intensity={0.1} position={[-2, 2, -4]} scale={3} />
          </Environment>
          <Particles particlesCount={50} />

          <Billboard>
            <Text
              font="BigShouldersDisplay-Light.ttf"
              rotation={[0, 0, 0]}
              position={[0, -1, -2]}
              fontSize={9}
              color="#4f6880"
              fillOpacity={0.1}
              letterSpacing={-0.05}>
              USDX
            </Text>
          </Billboard>
        </CameraRig>

        <EffectComposer multisampling={0}>
          <SMAA />
          <Bloom
            mipmapBlur
            intensity={0.8}
            levels={9}
            opacity={0.4}
            luminanceSmoothing={0.1}
            luminanceThreshold={0.7}
          />
          <DepthOfField focusDistance={0.0005} focalLength={0.15} bokehScale={16} />
          <HueSaturation saturation={0.3} hue={0.15} />
          <Vignette offset={0.65} opacity={0.7} />
        </EffectComposer>

        <CameraAnimation />
      </Suspense>
    </Canvas>
  )
}

export default Scene
