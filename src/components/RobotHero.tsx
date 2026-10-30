"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// Procedural 6-axis arm in MIVA's white, graphite and blue. If WebGL is unavailable the hero image underneath stays visible.
function buildArm() {
  const white = new THREE.MeshStandardMaterial({ color: 0xe9eef3, metalness: 0.35, roughness: 0.3 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x151a21, metalness: 0.9, roughness: 0.32 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x38b6ff, emissive: 0x38b6ff, emissiveIntensity: 3.2 });
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, y = 0) => { const o = new THREE.Mesh(g, m); o.position.y = y; return o; };
  const ring = (r: number) => { const o = mesh(new THREE.TorusGeometry(r, 0.012, 12, 72), glow); o.rotation.x = Math.PI / 2; return o; };
  const joint = (r: number, w: number) => {
    const g = new THREE.Group();
    const c = mesh(new THREE.CylinderGeometry(r, r, w, 48), dark); c.rotation.x = Math.PI / 2; g.add(c);
    [w / 2, -w / 2].forEach((z) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r * 0.72, 0.011, 10, 56), glow); t.position.z = z; g.add(t); });
    return g;
  };
  const link = (len: number, r1: number, r2: number) => {
    const g = new THREE.Group();
    const s = new THREE.Shape();
    s.moveTo(-r1, 0); s.bezierCurveTo(-r1, len * 0.4, -r2, len * 0.6, -r2, len); s.lineTo(r2, len);
    s.bezierCurveTo(r2, len * 0.6, r1, len * 0.4, r1, 0); s.closePath();
    const e = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: r1 * 1.25, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 6, curveSegments: 24 }), white);
    e.position.z = -r1 * 0.625; g.add(e);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.014, len * 0.62, 0.01), glow);
    strip.position.set(0, len * 0.5, r1 * 0.625 + 0.04); g.add(strip);
    return g;
  };

  const root = new THREE.Group();
  root.add(mesh(new THREE.CylinderGeometry(0.72, 0.84, 0.16, 64), dark, 0.08));
  const r0 = ring(0.76); r0.position.y = 0.17; root.add(r0);

  const j1 = new THREE.Group(); j1.position.y = 0.16; root.add(j1);
  j1.add(mesh(new THREE.CylinderGeometry(0.42, 0.56, 0.5, 64), white, 0.25));
  const r1 = ring(0.43); r1.position.y = 0.5; j1.add(r1);
  const j2 = new THREE.Group(); j2.position.y = 0.72; j1.add(j2);
  j2.add(joint(0.3, 0.68));
  j2.add(link(1.65, 0.25, 0.17));
  const j3 = new THREE.Group(); j3.position.y = 1.65; j2.add(j3);
  j3.add(joint(0.23, 0.56));
  j3.add(link(1.35, 0.17, 0.11));
  const j4 = new THREE.Group(); j4.position.y = 1.35; j3.add(j4);
  j4.add(joint(0.15, 0.36));
  const j5 = new THREE.Group(); j4.add(j5);
  j5.add(mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.34, 40), dark, 0.2));
  const j6 = new THREE.Group(); j6.position.y = 0.38; j5.add(j6);
  const r6 = ring(0.15); j6.add(r6);
  j6.add(mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.08, 40), white, 0.04));
  const fingers = [-1, 1].map((d) => {
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.3, 0.1), dark);
    f.position.set(d * 0.08, 0.22, 0); j6.add(f); return f;
  });
  return { root, j1, j2, j3, j5, j6, fingers };
}

export default function RobotHero() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05070b, 7, 17);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.85;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    const key = new THREE.SpotLight(0x9fdcff, 90, 22, 0.5, 0.7); key.position.set(-4, 7, 5); scene.add(key);
    const rim = new THREE.PointLight(0x38b6ff, 45, 14); rim.position.set(3.5, 2.5, -3); scene.add(rim);

    const arm = buildArm(); scene.add(arm.root);
    const grid = new THREE.GridHelper(30, 60, 0x38b6ff, 0x1a2a3a);
    (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.42; scene.add(grid);

    const pts = new Float32Array(1500);
    for (let i = 0; i < pts.length; i += 3) { pts[i] = (Math.random() - 0.5) * 16; pts[i + 1] = Math.random() * 7; pts[i + 2] = (Math.random() - 0.5) * 12; }
    const dust = new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(pts, 3)),
      new THREE.PointsMaterial({ color: 0x9fdcff, size: 0.018, transparent: true, opacity: 0.75 }));
    scene.add(dust);

    let wide = true;
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      wide = w > 760;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      camera.position.set(wide ? -1.7 : 0, 2.5, wide ? 11.5 : 15);
      arm.root.position.x = wide ? 1.9 : 0.9;
      arm.root.position.y = 0;
      grid.position.y = 0;
      camera.lookAt(wide ? -1.7 : 0, wide ? 2.05 : 0.4, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(el);

    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; };
    addEventListener("pointermove", onMove, { passive: true });

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let visible = true, raf = 0;
    const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); vis.observe(el);

    const render = () => {
      const t = reduce ? 1.2 : clock.getElapsedTime();
      mouse.sx += (mouse.x - mouse.sx) * 0.05; mouse.sy += (mouse.y - mouse.sy) * 0.05;
      const sc = Math.min(1.4, scrollY / Math.max(1, innerHeight));
      // Slow pick-and-place choreography, biased by pointer and scroll.
      arm.j1.rotation.y = Math.sin(t * 0.42) * 0.62 + mouse.sx * 0.7 - 0.25 + sc * 0.9;
      arm.j2.rotation.z = -0.22 + Math.sin(t * 0.56 + 1) * 0.2 + mouse.sy * 0.14 - sc * 0.3;
      arm.j3.rotation.z = 1.02 + Math.sin(t * 0.56) * 0.3 + sc * 0.45;
      arm.j5.rotation.z = 0.7 + Math.sin(t * 0.7) * 0.34;
      arm.j6.rotation.y = t * 0.55;
      const grip = 0.08 + (Math.sin(t * 1.1) + 1) * 0.03;
      arm.fingers[0].position.x = -grip; arm.fingers[1].position.x = grip;
      dust.rotation.y = t * 0.012;
      grid.position.z = (t * 0.18) % 0.5;
      renderer.render(scene, camera);
    };
    const loop = () => { if (visible && !document.hidden) render(); raf = requestAnimationFrame(loop); };
    if (reduce) render(); else loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); vis.disconnect();
      removeEventListener("pointermove", onMove);
      scene.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); });
      envMap.dispose(); pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={host} aria-hidden="true" />;
}
