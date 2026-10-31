"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Drop a model here to replace the built-in robot; until it exists the procedural one stands in.
const MODEL_URL = "/models/miva-robot.glb";

// MIVA's companion robot: stands large in a page's [data-robot-stage], docks in the corner on scroll.
// A full humanoid: glossy white armour over grey and graphite joints, traced with lines of blue light.
const WAIST = 1.78;
function build() {
  const shell = new THREE.MeshPhysicalMaterial({ color: 0xeef0f2, metalness: 0.05, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const grey = new THREE.MeshStandardMaterial({ color: 0x5a6068, metalness: 0.5, roughness: 0.45 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x23272d, metalness: 0.6, roughness: 0.45 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x07090c, metalness: 0.3, roughness: 0.12, clearcoat: 1 });
  const light = new THREE.MeshBasicMaterial({ color: 0x4aa8ff });
  const core = new THREE.MeshBasicMaterial({ color: 0x4aa8ff });
  const add = <T extends THREE.Object3D>(p: THREE.Object3D, o: T, x = 0, y = 0, z = 0) => { o.position.set(x, y, z); p.add(o); return o; };
  const M = (g: THREE.BufferGeometry, m: THREE.Material) => new THREE.Mesh(g, m);
  const curve = (pts: number[][]) => new THREE.SplineCurve(pts.map(([x, y]) => new THREE.Vector2(x, y))).getPoints(48);
  const lathe = (pts: number[][], m: THREE.Material, phi = 0, len = Math.PI * 2) => M(new THREE.LatheGeometry(curve(pts), 64, phi, len), m);
  const box = (w: number, h: number, d: number, r: number, m: THREE.Material) => M(new RoundedBoxGeometry(w, h, d, 3, r), m);
  // A strip of light laid on a surface: (x, y, z) centre, length, tilt in the face plane, and turn to follow the curve.
  const strip = (p: THREE.Object3D, x: number, y: number, z: number, len: number, tilt = 0, turn = 0) => {
    const s = add(p, M(new THREE.BoxGeometry(0.009, len, 0.006), light), x, y, z); s.rotation.set(0, turn, tilt); return s;
  };

  const root = new THREE.Group();
  const body = add(root, new THREE.Group());
  // Stands in a slight three-quarter turn toward the page's content.
  body.rotation.y = -0.32;

  // Pelvis: a white shield tapering into the hips, a graphite core behind it.
  const pelvis = add(body, lathe([[0.001, 1.36], [0.07, 1.37], [0.15, 1.5], [0.2, 1.64], [0.18, 1.74], [0.001, 1.75]], shell)); pelvis.scale.z = 0.7;
  add(body, box(0.02, 0.008, 0.01, 0.003, light), 0, 1.66, 0.136);
  const leg = (dir: number) => {
    const hip = add(body, new THREE.Group(), dir * 0.17, 1.53);
    add(hip, M(new THREE.SphereGeometry(0.08, 28, 20), graphite), 0, 0, -0.03);
    // Thigh: broad white plate with a line of light running down the outer front.
    const thigh = add(hip, lathe([[0.001, 0.03], [0.1, 0.01], [0.122, -0.14], [0.108, -0.42], [0.086, -0.56], [0.001, -0.58]], shell)); thigh.scale.z = 0.92;
    strip(hip, dir * 0.055, -0.2, 0.098, 0.26, 0, dir * 0.5);
    strip(hip, dir * 0.028, -0.4, 0.09, 0.14, dir * 0.45, dir * 0.3);
    // Knee and shin: graphite joint, white shin guard wrapped in grey at the back and sides.
    add(hip, M(new THREE.SphereGeometry(0.068, 24, 18), graphite), 0, -0.61, -0.015);
    const shinPts = [[0.001, -0.6], [0.095, -0.63], [0.108, -0.8], [0.088, -1.1], [0.07, -1.3], [0.001, -1.32]];
    add(hip, lathe(shinPts, shell));
    const wrap = add(hip, lathe(shinPts, grey, 0.62, Math.PI * 2 - 1.24)); wrap.scale.set(1.04, 0.97, 1.04); wrap.position.y = -0.03;
    add(hip, box(0.014, 0.05, 0.008, 0.004, light), 0, -0.74, 0.106);
    add(hip, M(new THREE.SphereGeometry(0.045, 20, 16), graphite), 0, -1.34);
    // Foot: rounded white shoe with a graphite heel and sole.
    add(hip, box(0.17, 0.12, 0.32, 0.05, shell), 0, -1.455, 0.06);
    add(hip, box(0.12, 0.06, 0.08, 0.02, graphite), 0, -1.42, -0.09);
    add(hip, box(0.18, 0.03, 0.33, 0.012, graphite), 0, -1.515, 0.06);
    return hip;
  };
  leg(-1); leg(1);

  // Chest pivots at the waist so the upper body can turn toward what it watches.
  const chest = add(body, new THREE.Group(), 0, WAIST);
  const abs = add(chest, lathe([[0.001, -0.06], [0.11, -0.05], [0.13, 0.02], [0.12, 0.1], [0.001, 0.11]], grey)); abs.scale.z = 0.78;
  strip(chest, 0, 0.03, 0.104, 0.11, Math.PI / 2);
  // Breastplate: broad at the shoulders, a glowing ring at its centre, light lines branching out from it.
  const plate = add(chest, lathe([[0.001, 0.07], [0.15, 0.08], [0.2, 0.16], [0.232, 0.32], [0.24, 0.44], [0.2, 0.52], [0.1, 0.56], [0.001, 0.565]], shell)); plate.scale.z = 0.66;
  const disc = add(chest, M(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 32), graphite), 0, 0.37, 0.152); disc.rotation.x = Math.PI / 2;
  add(chest, M(new THREE.TorusGeometry(0.046, 0.008, 12, 48), core), 0, 0.37, 0.158);
  for (const dir of [-1, 1]) {
    strip(chest, dir * 0.09, 0.26, 0.128, 0.15, dir * 0.85, dir * 0.45);
    strip(chest, dir * 0.09, 0.455, 0.14, 0.12, -dir * 0.95, dir * 0.4);
    add(chest, M(new THREE.SphereGeometry(0.085, 24, 18), grey), dir * 0.25, 0.44, -0.01);
  }
  add(chest, M(new THREE.CylinderGeometry(0.045, 0.055, 0.12, 24), graphite), 0, 0.6);

  // Head: white helmet, dark visor band with two blue eyes, ear pods ringed in light.
  const head = add(chest, new THREE.Group(), 0, 0.58);
  const S = [1, 1.25, 1.1];
  const skull = add(head, M(new THREE.SphereGeometry(0.12, 48, 36), shell), 0, 0.17); skull.scale.set(S[0], S[1], S[2]);
  const bar = add(head, M(new THREE.SphereGeometry(0.123, 48, 12, Math.PI / 2 - 1.05, 2.1, 1.25, 0.36), glass), 0, 0.17); bar.scale.set(S[0], S[1], S[2]);
  for (const dir of [-1, 1]) {
    const eye = add(head, box(0.028, 0.014, 0.006, 0.004, core), dir * 0.04, 0.194, 0.129); eye.rotation.y = dir * 0.3;
    const ear = add(head, M(new THREE.CylinderGeometry(0.042, 0.042, 0.03, 32), graphite), dir * 0.118, 0.18); ear.rotation.z = Math.PI / 2;
    const ring = add(head, M(new THREE.TorusGeometry(0.036, 0.005, 8, 40), light), dir * 0.134, 0.18); ring.rotation.y = Math.PI / 2;
    strip(head, dir * 0.075, 0.11, 0.108, 0.07, dir * 0.25, dir * 0.6);
  }
  add(head, box(0.04, 0.006, 0.006, 0.002, graphite), 0, 0.075, 0.125);

  // Arms: rounded shoulder pads, white segments with a light line down the outside, a ring of light at the wrist.
  const arm = (dir: number) => {
    const shoulder = add(chest, new THREE.Group(), dir * 0.33, 0.47);
    add(shoulder, M(new THREE.SphereGeometry(0.072, 24, 18), graphite));
    const pad = add(shoulder, M(new THREE.SphereGeometry(0.1, 32, 24), shell), dir * 0.02, 0.03); pad.scale.set(1.15, 0.85, 1);
    add(shoulder, M(new THREE.CapsuleGeometry(0.064, 0.24, 10, 28), shell), 0, -0.21);
    strip(shoulder, dir * 0.064, -0.21, 0, 0.18, 0, Math.PI / 2);
    const elbow = add(shoulder, new THREE.Group(), 0, -0.42);
    add(elbow, M(new THREE.SphereGeometry(0.058, 24, 18), graphite));
    add(elbow, M(new THREE.CapsuleGeometry(0.052, 0.3, 10, 24), grey), 0, -0.2);
    const guard = add(elbow, M(new THREE.CapsuleGeometry(0.06, 0.22, 10, 24, 1), shell), dir * 0.008, -0.19, 0.006); guard.scale.set(1, 1, 0.9);
    strip(elbow, dir * 0.06, -0.2, 0, 0.2, 0, Math.PI / 2);
    const cuff = add(elbow, M(new THREE.TorusGeometry(0.052, 0.007, 8, 40), light), 0, -0.39); cuff.rotation.x = Math.PI / 2;
    // Hand: white palm with four graphite fingers and a thumb.
    add(elbow, M(new THREE.SphereGeometry(0.04, 20, 16), graphite), 0, -0.42);
    add(elbow, box(0.075, 0.1, 0.035, 0.014, shell), 0, -0.49);
    for (let f = 0; f < 4; f++) add(elbow, M(new THREE.CapsuleGeometry(0.0095, 0.07, 6, 12), graphite), (f - 1.5) * 0.019, -0.585, 0.004);
    const thumb = add(elbow, M(new THREE.CapsuleGeometry(0.01, 0.05, 6, 12), graphite), -dir * 0.045, -0.52, 0.018); thumb.rotation.z = -dir * 0.5;
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
    const key = new THREE.DirectionalLight(0xfff7ee, 1.6); key.position.set(-3, 5, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0xc9d8ec, 1.6); rim.position.set(4, 1, -3); scene.add(rim);
    const accent = new THREE.Color(0x4aa8ff), glow = new THREE.Color(0xd6ecff);
    const cam = new THREE.OrthographicCamera(0, 1, 0, 1, -4000, 4000);
    cam.position.z = 2000;
    const R = build(); scene.add(R.root);
    // A supplied model is scaled to the robot's height, stood on the floor and centred; then the built-in body hides.
    let model: THREE.Object3D | null = null;
    new GLTFLoader().load(MODEL_URL, (gltf) => {
      const m = gltf.scene, b = new THREE.Box3().setFromObject(m), size = b.getSize(new THREE.Vector3());
      m.scale.setScalar(2.7 / size.y);
      b.setFromObject(m);
      m.position.set(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
      model = new THREE.Group(); model.add(m); model.rotation.y = -0.32;
      R.root.add(model); R.body.visible = false;
    }, undefined, () => {});

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
      // Breathe through the upper body so the feet stay planted.
      R.chest.position.y = WAIST + bob;

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
      // An unrigged model turns as a whole toward what has attention and sways with the scroll.
      if (model) {
        model.rotation.y = lerp(model.rotation.y, -0.32 + clamp(dx * 0.9, 0.45), 0.04);
        model.rotation.z = R.body.rotation.z;
        model.position.y = bob;
      }
      // Arms stay composed: a slight open gesture toward whatever has attention.
      R.right.shoulder.rotation.x = lerp(R.right.shoulder.rotation.x, target ? -0.5 : -0.04, 0.04);
      R.right.shoulder.rotation.z = lerp(R.right.shoulder.rotation.z, 0.1, 0.05);
      R.right.elbow.rotation.x = lerp(R.right.elbow.rotation.x, target ? -0.55 : -0.14, 0.04);
      R.left.shoulder.rotation.z = -0.1 - Math.sin(t * 0.6) * 0.012;
      R.left.elbow.rotation.x = -0.14;
      flash *= 0.92;
      R.core.color.copy(accent).lerp(glow, flash);
      r.render(scene, cam);

      // Soft contact shadow only.
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      const sh = g.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pos.s * 0.2);
      sh.addColorStop(0, "rgba(15,40,63,.28)"); sh.addColorStop(1, "rgba(15,40,63,0)");
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
