"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import {
  CanvasTexture,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace
} from "three";

const MODEL_PATH = "/models/desktop_pc/scene.gltf";
const BANNER_PATH = "/images/black-heroes-banner.webp";
const ROTATION_SPEED = 0.18;

function createFittedBannerTexture(image: HTMLImageElement, anisotropy: number) {
  const width = 1024;
  // Match the workstation's 1.905:1 screen face so the supplied image stays undistorted.
  const height = 538;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create the Black Heroes monitor texture.");
  }

  context.fillStyle = "#171717";
  context.fillRect(0, 0, width, height);

  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight
  );

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.flipY = true;
  texture.anisotropy = anisotropy;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  return texture;
}

function isMesh(object: Object3D): object is Mesh {
  return object.type === "Mesh";
}

function isStandardMaterial(material: Material): material is MeshStandardMaterial {
  return material.type === "MeshStandardMaterial";
}

function Workstation() {
  const rotationGroup = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const banner = useTexture(BANNER_PATH);
  const { gl, size } = useThree();

  useFrame((_, delta) => {
    if (rotationGroup.current) {
      rotationGroup.current.rotation.y += Math.min(delta, 0.05) * ROTATION_SPEED;
    }
  });

  const bannerTexture = useMemo(() => {
    const image = banner.image;
    if (!(image instanceof HTMLImageElement)) {
      throw new Error("The Black Heroes banner did not load as an image.");
    }

    return createFittedBannerTexture(image, Math.min(8, gl.capabilities.getMaxAnisotropy()));
  }, [banner, gl]);

  const workstation = useMemo(() => {
    const clonedScene = scene.clone(true);
    const screenMeshes: Mesh[] = [];
    clonedScene.traverse((object) => {
      if (isMesh(object) && object.name.toLowerCase().includes("screen")) {
        screenMeshes.push(object);
      }
    });
    const screen =
      screenMeshes.find((mesh) => mesh.name === "MY SCREEN_MY SCREEN_0") ??
      (screenMeshes.length === 1 ? screenMeshes[0] : undefined);
    if (!screen) {
      throw new Error("The source workstation model is missing its screen mesh.");
    }

    const sourceMaterials = Array.isArray(screen.material)
      ? screen.material
      : [screen.material];
    const screenMaterials = sourceMaterials.map((material) => {
      if (!isStandardMaterial(material)) {
        throw new Error("The source workstation screen uses an unsupported material.");
      }

      const screenMaterial = material.clone();
      screenMaterial.map = bannerTexture;
      screenMaterial.emissiveMap = bannerTexture;
      screenMaterial.emissive.set(0xffffff);
      screenMaterial.emissiveIntensity = 0.3;
      screenMaterial.color.set(0xffffff);
      screenMaterial.needsUpdate = true;
      return screenMaterial;
    });

    screen.material = Array.isArray(screen.material)
      ? screenMaterials
      : screenMaterials[0];

    return { scene: clonedScene, screenMaterials };
  }, [bannerTexture, scene]);

  useEffect(() => {
    bannerTexture.needsUpdate = true;
    workstation.screenMaterials.forEach((material) => {
      material.needsUpdate = true;
    });

    return () => {
      bannerTexture.dispose();
      workstation.screenMaterials.forEach((material) => material.dispose());
    };
  }, [bannerTexture, workstation]);

  const isMobile = size.width <= 500;

  return (
    <>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight intensity={1} />
      <group
        ref={rotationGroup}
        position={isMobile ? [0, -4.6, -2.2] : [0, -3.25, -1.5]}
      >
        <primitive
          object={workstation.scene}
          scale={isMobile ? 0.47 : 0.75}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </group>
    </>
  );
}

export default function Hero3DCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      frameloop="always"
      shadows="percentage"
      dpr={[1, 1.5]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ antialias: true, powerPreference: "low-power" }}
      style={{ touchAction: "pan-y" }}
      fallback={
        <div className="grid h-full place-items-center px-6 text-center text-sm text-white/70">
          Die 3D-Ansicht wird von diesem Gerät nicht unterstützt.
        </div>
      }
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Workstation />
      </Suspense>
    </Canvas>
  );
}
