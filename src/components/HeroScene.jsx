import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedShape() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2

      // Mouse-reactive tilt
      const { x, y } = state.mouse
      meshRef.current.rotation.x += y * 0.15
      meshRef.current.rotation.y += x * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.6}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
        <Suspense fallback={null}>
          <AnimatedShape />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene