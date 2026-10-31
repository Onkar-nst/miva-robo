"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// MIVA's companion robot: stands large in a page's [data-robot-stage], docks in the corner on scroll.
function build() {
  const shell = new THREE.MeshStandardMaterial({ color: 0xe9ebec, metalness: 0.08, roughness: 0.46 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x79838d, metalness: 0.92, roughness: 0.38 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x20262d, metalness: 0.55, roughness: 0.5 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0b0f14, metalness: 0.3, roughness: 0.42 });
  const light = new THREE.MeshBasicMaterial({ color: 0x8fd4ff });
  const core = new THREE.MeshBasicMaterial({ color: 0x45b4f5 });
  const add = <T extends THREE.Object3D>(p: THREE.Object3D, o: T, x = 0, y = 0, z = 0) => { o.position.set(x, y, z); p.add(o); return o; };
  const M = (g: THREE.BufferGeometry, m: THREE.Material) => new THREE.Mesh(g, m);
  const lathe = (pts: number[][], m: THREE.Material) => M(new THREE.LatheGeometry(new THREE.SplineCurve(pts.map(([x, y]) => new THREE.Vector2(x, y))).getPoints(48), 72), m);

  const root = new THREE.Group();
  const body = add(root, new THREE.Group());
  // Slim graphite column on a low plinth, with a single hairline of light.
  add(body, lathe([[0.001, 0], [0.3, 0.005], [0.32, 0.04], [0.27, 0.09], [0.15, 0.13], [0.12, 0.2], [0.001, 0.21]], graphite));
  const hair = add(body, M(new THREE.TorusGeometry(0.3, 0.004, 8, 96), light), 0, 0.075); hair.rotation.x = Math.PI / 2;
  add(body, lathe([[0.001, 0.14], [0.13, 0.15], [0.15, 0.34], [0.2, 0.68], [0.19, 0.86], [0.001, 0.88]], shell));
  add(body, M(new THREE.CylinderGeometry(0.15, 0.17, 0.07, 48), graphite), 0, 0.9);
  // Tailored torso: broad at the shoulder, tapered at the waist, flattened front to back.
  const chest = new THREE.Group(); chest.position.y = 0.93; body.add(chest);
  const torso = add(chest, lathe([[0.001, 0], [0.15, 0.005], [0.19, 0.12], [0.31, 0.56], [0.37, 0.84], [0.28, 1.02], [0.09, 1.08], [0.001, 1.085]], shell)); torso.scale.z = 0.62;
  const spine = add(chest, M(new THREE.BoxGeometry(0.012, 0.16, 0.008), core), 0, 0.74, 0.215);
  spine.rotation.x = -0.02;
  add(chest, M(new THREE.CylinderGeometry(0.06, 0.09, 0.13, 28), graphite), 0, 1.13);
  // Head: narrow oval with a full-width glass visor and one thin line of light.
  const head = new THREE.Group(); head.position.y = 1.38; chest.add(head);
  const skull = add(head, M(new THREE.SphereGeometry(0.2, 56, 40), shell)); skull.scale.set(0.9, 1.18, 0.98);
  const visor = add(head, M(new THREE.SphereGeometry(0.203, 48, 28, Math.PI / 2 - 1.15, 2.3, 1.2, 0.62), glass)); visor.scale.set(0.9, 1.18, 0.98);
  const bar = add(head, M(new THREE.BoxGeometry(0.15, 0.007, 0.004), light), 0, 0.012, 0.197);
  const arm = (dir: number) => {
    const shoulder = new THREE.Group(); shoulder.position.set(dir * 0.385, 0.87, 0); chest.add(shoulder);
    add(shoulder, M(new THREE.SphereGeometry(0.082, 32, 24), shell));
    add(shoulder, M(new THREE.CapsuleGeometry(0.05, 0.36, 10, 28), graphite), 0, -0.26);
    const elbow = new THREE.Group(); elbow.position.y = -0.52; shoulder.add(elbow);
    add(elbow, M(new THREE.SphereGeometry(0.052, 24, 18), steel));
    add(elbow, M(new THREE.CapsuleGeometry(0.044, 0.34, 10, 24), shell), 0, -0.25);
    const hand = add(elbow, M(new THREE.SphereGeometry(0.05, 24, 18), graphite), 0, -0.52); hand.scale.set(0.8, 1.35, 0.6);
    return { shoulder, elbow };
  };
  return { root, body, chest, head, bar, core, left: arm(-1), right: arm(1) };
}

export default function Robot() {
  const host = useRef<HTMLDivElement>(null);
  const fx = useRef<HTMLCanvasElement>(null);
  const path = usePathname();
  const stage = useRef<Element | null>(null);

  useEffect(() => { stage.current = document.querySelector("[data-robot-stage]"); }, [path]);

  useEffect(() => {
    const el = host.current!, c = fx.current!, g = c.getContext("2d")!;
    let r: THREE.WebGLRenderer;
    try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    r.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.02;
    r.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    el.appendChild(r.domElement);

    const scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(r);
    const env = pm.fromScene(new RoomEnvironment(), 0.03).texture;
    scene.environment = env; scene.environmentIntensity = 0.7;
    const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-3, 5, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0x6cc8ff, 2.2); rim.position.set(4, 1, -3); scene.add(rim);
    const cam = new THREE.OrthographicCamera(0, 1, 0, 1, -4000, 4000);
    cam.position.z = 2000;
    const R = build(); scene.add(R.root);

    let W = 1, H = 1, dpr = 1;
    const size = () => {
      W = innerWidth; H = innerHeight; dpr = Math.min(devicePixelRatio, 1.75);
      r.setSize(W, H, false);
      c.width = W * dpr; c.height = H * dpr;
      cam.left = 0; cam.right = W; cam.top = 0; cam.bottom = -H; cam.updateProjectionMatrix();
    };
    size(); addEventListener("resize", size);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, on: false };
    let target: Element | null = null, flash = 0, lastScroll = scrollY, vel = 0;
    const eye = new THREE.Vector3(), corePos = new THREE.Vector3();
    const pos = { x: -1, y: -1, s: 0 };

    // New content and clicks register as a soft pulse in the chest light.
    const onSignal = () => { flash = Math.min(1, flash + 0.25); };
    const onOver = (e: PointerEvent) => {
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
      const t = (e.target as Element).closest?.("a,button,article,input,textarea,[data-reveal='wipe']");
      target = t && !t.closest("header") ? t : null;
    };
    const onDown = () => { flash = 1; };
    addEventListener("miva:signal", onSignal); addEventListener("pointermove", onOver, { passive: true }); addEventListener("pointerdown", onDown, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const t = reduce ? 1 : clock.getElapsedTime();
      vel = lerp(vel, Math.abs(scrollY - lastScroll), 0.1); const dir = Math.sign(scrollY - lastScroll); lastScroll = scrollY;

      // Docked in the corner by default; large inside a stage until it scrolls out.
      const small = W < 760;
      const dockH = small ? 104 : Math.min(236, H * 0.28);
      const dock = { x: W - (small ? 50 : 112) + (small ? 0 : Math.sin(t * 0.35) * 26), y: H - (small ? 12 : 22), h: dockH };
      let goal = dock;
      const st = stage.current?.isConnected ? stage.current.getBoundingClientRect() : null;
      if (st && st.height > 0) {
        const k = Math.min(1, Math.max(0, -st.top / (st.height * 0.8)));
        const e = k * k * (3 - 2 * k);
        const big = small ? { x: W * 0.72, y: st.bottom - 26, h: Math.min(H * 0.36, 300) } : { x: W * 0.77, y: st.bottom - H * 0.06, h: H * 0.8 };
        goal = { x: lerp(big.x, dock.x, e), y: lerp(big.y, dock.y, e), h: lerp(big.h, dock.h, e) };
        if (k >= 1) goal = dock;
      }
      if (pos.x < 0 || reduce) { pos.x = goal.x; pos.y = goal.y; pos.s = goal.h; }
      else { pos.x = lerp(pos.x, goal.x, 0.09); pos.y = lerp(pos.y, goal.y, 0.09); pos.s = lerp(pos.s, goal.h, 0.09); }
      const scale = pos.s / 3.0, bob = Math.sin(t * 0.8) * 0.012;
      R.root.position.set(pos.x, -pos.y, 0);
      R.root.scale.setScalar(scale);
      R.root.children[0].position.y = bob;

      // Look at the hovered element, otherwise the pointer, otherwise gently scan.
      R.root.updateMatrixWorld();
      R.head.getWorldPosition(eye); R.core && R.chest.getWorldPosition(corePos);
      eye.y = -eye.y; corePos.y = -corePos.y - 0.53 * scale;
      let lx = pointer.on ? pointer.x : pos.x + Math.sin(t * 0.5) * 400, ly = pointer.on ? pointer.y : pos.y - pos.s;
      if (target && target.isConnected) { const b = target.getBoundingClientRect(); lx = b.left + b.width / 2; ly = b.top + b.height / 2; if (b.bottom < 0 || b.top > H) target = null; }
      const dx = (lx - eye.x) / W, dy = (ly - eye.y) / H;
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
      R.head.rotation.y = lerp(R.head.rotation.y, clamp(dx * 1.8, 0.65), 0.05);
      R.head.rotation.x = lerp(R.head.rotation.x, clamp(dy * 0.8, 0.28), 0.05);
      R.chest.rotation.y = lerp(R.chest.rotation.y, clamp(dx * 0.4, 0.16), 0.03);
      R.body.rotation.z = lerp(R.body.rotation.z, clamp(dir * vel * 0.002, 0.05), 0.06);
      // Arms stay composed: a slight open gesture toward whatever has attention.
      R.right.shoulder.rotation.x = lerp(R.right.shoulder.rotation.x, target ? -0.5 : -0.04, 0.04);
      R.right.shoulder.rotation.z = lerp(R.right.shoulder.rotation.z, 0.1, 0.05);
      R.right.elbow.rotation.x = lerp(R.right.elbow.rotation.x, target ? -0.55 : -0.14, 0.04);
      R.left.shoulder.rotation.z = -0.1 - Math.sin(t * 0.6) * 0.012;
      R.left.elbow.rotation.x = -0.14;
      flash *= 0.92;
      R.core.color.setRGB(0.27 + flash * 0.6, 0.7 + flash * 0.3, 0.96 + flash * 0.04);
      r.render(scene, cam);

      // Soft contact shadow only.
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      const sh = g.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pos.s * 0.2);
      sh.addColorStop(0, "rgba(10,20,32,.28)"); sh.addColorStop(1, "rgba(10,20,32,0)");
      g.save(); g.translate(pos.x, pos.y); g.scale(1, 0.14); g.translate(-pos.x, -pos.y); g.fillStyle = sh;
      g.beginPath(); g.arc(pos.x, pos.y, pos.s * 0.2, 0, 7); g.fill(); g.restore();
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size); removeEventListener("miva:signal", onSignal); removeEventListener("pointermove", onOver); removeEventListener("pointerdown", onDown);
      scene.traverse((o) => (o as THREE.Mesh).geometry?.dispose?.());
      env.dispose(); pm.dispose(); r.dispose(); r.domElement.remove();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <canvas ref={fx} className="absolute inset-0 size-full" />
      <div ref={host} className="absolute inset-0" />
    </div>
  );
}
