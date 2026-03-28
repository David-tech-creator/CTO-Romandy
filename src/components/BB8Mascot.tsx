'use client'

import { useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function BB8Model() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/bb8.glb')

  // Auto-scale and center the model on first mount
  useLayoutEffect(() => {
    if (!group.current) return
    const box = new THREE.Box3().setFromObject(group.current)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxDim          // fit into 2.8 units
    group.current.scale.setScalar(scale)
    group.current.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale,
    )
  }, [scene])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  )
}

export default function BB8Mascot() {
  return (
    <div style={{ width: '100%', height: 440, maxWidth: 480 }}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient base */}
        <ambientLight intensity={0.40} />
        {/* Key light — amber, top-left */}
        <directionalLight position={[-4, 5, 3]} intensity={1.8} color="#c8834a" />
        {/* Fill — neutral, right */}
        <directionalLight position={[4, 2, -2]} intensity={0.6} color="#ffffff" />
        {/* Rim — amber from below */}
        <pointLight position={[0, -4, 2]} intensity={0.5} color="#c8834a" />

        <BB8Model />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/bb8.glb')
