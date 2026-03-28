'use client'

import { useRef, useLayoutEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function RobotModel() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/robot.glb')

  const clonedScene = useMemo(() => scene.clone(true), [scene])

  const origin = useRef({ x: 0, y: 0, z: 0 })

  // Auto-scale and center — fit to 2.8 unit cube, centered on screen
  useLayoutEffect(() => {
    if (!group.current) return
    const box = new THREE.Box3().setFromObject(group.current)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.8 / maxDim
    group.current.scale.setScalar(scale)
    const ox = -center.x * scale
    const oy = -center.y * scale
    const oz = -center.z * scale
    origin.current = { x: ox, y: oy, z: oz }
    group.current.position.set(ox, oy, oz)
  }, [clonedScene])

  const clock = useRef(0)

  useFrame((_, delta) => {
    clock.current += delta
    if (!group.current) return

    const t = clock.current
    // Gentle idle float
    group.current.position.y = origin.current.y + Math.sin(t * 1.1) * 0.1
    // Slow side-to-side sway
    group.current.rotation.y = Math.sin(t * 0.6) * 0.25
    // Very slight tilt
    group.current.rotation.z = Math.sin(t * 0.4) * 0.04
  })

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  )
}

export default function BB8Mascot() {
  return (
    <div style={{ width: '100%', height: 440, maxWidth: 480 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient base */}
        <ambientLight intensity={0.6} />
        {/* Key light — warm white, top-left */}
        <directionalLight position={[-4, 6, 3]} intensity={2.0} color="#fff5e8" />
        {/* Fill — neutral, right */}
        <directionalLight position={[5, 2, -2]} intensity={0.7} color="#ffffff" />
        {/* Amber rim from below */}
        <pointLight position={[0, -4, 2]} intensity={0.8} color="#c8834a" />

        <RobotModel />

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

useGLTF.preload('/robot.glb')
