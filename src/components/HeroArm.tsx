"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Joint angles for one pose: base yaw, shoulder, elbow, wrist roll, gripper opening. The wrist pitch is solved so the gripper always points down.
type Pose = [number, number, number, number, number];
const OPEN = 0.075, SHUT = 0.03;
// Pick-and-place loop: hover, reach, grip, lift, swing, lower, release, rise. Each step eases over `dur` seconds.
const steps: { pose: Pose; dur: number }[] = [
  { pose: [-0.2, 1.1, 1.3, 0, OPEN], dur: 1.6 },
  { pose: [-0.2, 1.22, 1.5, 0, OPEN], dur: 1.4 },
  { pose: [-0.2, 1.22, 1.5, 0, SHUT], dur: 0.6 },
  { pose: [-0.2, 1.02, 1.3, 0, SHUT], dur: 1.2 },
  { pose: [0.5, 1.05, 1.28, 1.1, SHUT], dur: 1.8 },
  { pose: [0.5, 1.2, 1.48, 1.1, SHUT], dur: 1.3 },
  { pose: [0.5, 1.2, 1.48, 1.1, OPEN], dur: 0.6 },
  { pose: [0.5, 1.04, 1.3, 1.1, OPEN], dur: 1.2 },
];
const total = steps.reduce((s, x) => s + x.dur, 0);
const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);

function poseAt(t: number): Pose {
  let s = t % total, i = 0;
  while (s > steps[i].dur) s -= steps[i++].dur;
  const a = steps[(i + steps.length - 1) % steps.length].pose, b = steps[i].pose, k = ease(s / steps[i].dur);
  return a.map((v, j) => v + (b[j] - v) * k) as Pose;
}

function build() {
  // Gloss white shells, brushed alloy collars, graphite trim and a cyan status light.
  const shell = new THREE.MeshPhysicalMaterial({ color: 0xf3f4f5, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.22 });
  const alloy = new THREE.MeshStandardMaterial({ color: 0xc8cdd2, roughness: 0.3, metalness: 0.65 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x15181c, roughness: 0.45, metalness: 0.2 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x1e2a35, roughness: 0.04, metalness: 0.3, clearcoat: 1, emissive: 0x0b6d93, emissiveIntensity: 0.25 });
  const seam = new THREE.MeshStandardMaterial({ color: 0x6b737c, roughness: 0.5 });
  const led = new THREE.MeshBasicMaterial({ color: 0x00d1ff });
  const glow = new THREE.MeshBasicMaterial({ color: 0x00d1ff, transparent: true, opacity: 0.9 });
  // Printed wordmark: navy type on a transparent canvas, used as a decal.
  const decal = (text: string, w: number, h: number, size: number, spacing: number, vertical = false) => {
    const c = document.createElement("canvas"); c.width = vertical ? h : w; c.height = vertical ? w : h;
    const g = c.getContext("2d")!;
    if (vertical) { g.translate(c.width / 2, c.height / 2); g.rotate(Math.PI / 2); g.translate(-w / 2, -h / 2); }
    g.fillStyle = "#0b1d33"; g.font = `600 ${size}px Inter, Helvetica, Arial, sans-serif`; g.textAlign = "center"; g.textBaseline = "middle";
    g.letterSpacing = `${spacing}px`; g.fillText(text, w / 2, h / 2);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return new THREE.MeshStandardMaterial({ map: t, transparent: true, roughness: 0.4, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  };

  const add = <T extends THREE.Object3D>(parent: THREE.Object3D, o: T, x = 0, y = 0, z = 0) => { o.position.set(x, y, z); parent.add(o); return o; };
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material) => { const o = new THREE.Mesh(g, m); o.castShadow = true; return o; };
  const box = (w: number, h: number, d: number, r: number, m: THREE.Material) => mesh(new RoundedBoxGeometry(w, h, d, 5, r), m);
  // A solid of revolution about y from [radius, height] points.
  const lathe = (pts: [number, number][], m: THREE.Material) => mesh(new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 72), m);
  // A cylinder about y with its rims rounded off by `e`.
  const drum = (r: number, h: number, e: number, m: THREE.Material) => {
    const pts: [number, number][] = [[0, -h / 2]];
    for (let i = 0; i <= 6; i++) { const a = (i / 6) * (Math.PI / 2); pts.push([r - e + Math.sin(a) * e, -h / 2 + e - Math.cos(a) * e]); }
    for (let i = 0; i <= 6; i++) { const a = (i / 6) * (Math.PI / 2); pts.push([r - e + Math.cos(a) * e, h / 2 - e + Math.sin(a) * e]); }
    pts.push([0, h / 2]);
    return lathe(pts, m);
  };
  const ring = (parent: THREE.Object3D, r: number, tube: number, m: THREE.Material, y = 0) => add(parent, mesh(new THREE.TorusGeometry(r, tube, 10, 96), m), 0, y).rotateX(Math.PI / 2);
  // A joint housing turning about z: a rounded drum with panel lines near each face, an inset alloy cap and,
  // on the face towards the camera, a small lens.
  const joint = (parent: THREE.Object3D, r: number, depth: number) => {
    const j = add(parent, drum(r, depth, r * 0.22, shell)); j.rotation.x = Math.PI / 2;
    for (const s of [-1, 1]) {
      ring(j, r * 0.995, 0.005, seam, s * (depth / 2 - r * 0.32));
      add(j, drum(r * 0.66, 0.03, 0.012, alloy), 0, s * (depth / 2 - 0.004));
      ring(j, r * 0.66, 0.006, seam, s * (depth / 2 + 0.01));
    }
    add(j, drum(r * 0.3, 0.03, 0.012, glass), 0, depth / 2 + 0.014);
    return j;
  };
  // A link along +y: a capsule with dark seam rings near both ends.
  const link = (parent: THREE.Object3D, r: number, len: number) => {
    add(parent, mesh(new THREE.CapsuleGeometry(r, len, 12, 48), shell), 0, len / 2);
    const g = add(parent, new THREE.Group());
    for (const y of [0.3, len - 0.3]) ring(g, r * 1.004, 0.004, seam, y);
  };

  const root = new THREE.Group();
  // Plinth: a low rounded cabinet wrapped by a graphite band, with a vent grille and a cyan status strip on its face.
  add(root, box(2.2, 0.4, 1.1, 0.09, shell), 0.25, 0.2);
  add(root, box(2.212, 0.034, 1.112, 0.016, dark), 0.25, 0.29);
  add(root, box(0.5, 0.012, 0.01, 0.004, led), -0.42, 0.11, 0.552);
  add(root, new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.062), decal("MIVA ROBOTICS", 1024, 102, 64, 22)), -0.42, 0.19, 0.5515);
  for (let i = 0; i < 7; i++) add(root, box(0.016, 0.11, 0.01, 0.005, dark), 0.95 + i * 0.045, 0.15, 0.551);

  const mount = add(root, new THREE.Group(), 0.72, 0.4);
  add(mount, lathe([[0, 0], [0.54, 0], [0.56, 0.015], [0.56, 0.07], [0.52, 0.1], [0.45, 0.115], [0.45, 0.3], [0.43, 0.32], [0, 0.32]], alloy));
  ring(mount, 0.452, 0.01, dark, 0.13);
  ring(mount, 0.452, 0.01, dark, 0.28);
  // Status ring: a thin cyan band round the turntable that breathes while the arm works.
  ring(mount, 0.453, 0.007, glow, 0.205);

  const yaw = add(mount, new THREE.Group(), 0, 0.32);
  add(yaw, lathe([[0, 0], [0.4, 0], [0.4, 0.04], [0.36, 0.08], [0.33, 0.4], [0.31, 0.5], [0, 0.5]], shell));
  ring(yaw, 0.398, 0.006, seam, 0.035);
  const shoulder = add(yaw, new THREE.Group(), 0, 0.68);
  joint(shoulder, 0.3, 0.62);

  const L1 = 1.5, L2 = 1.22;
  link(shoulder, 0.17, L1);
  // Wordmark wrapped round the front of the upper arm, reading along its length.
  add(shoulder, new THREE.Mesh(new THREE.CylinderGeometry(0.1715, 0.1715, 0.5, 32, 1, true, -0.42, 0.84), decal("MIVA", 512, 150, 118, 30, true)), 0, L1 * 0.52);
  const elbow = add(shoulder, new THREE.Group(), 0, L1);
  joint(elbow, 0.21, 0.46);
  link(elbow, 0.125, L2);
  const wrist = add(elbow, new THREE.Group(), 0, L2);
  joint(wrist, 0.15, 0.34);
  const roll = add(wrist, new THREE.Group());
  add(roll, lathe([[0, 0.06], [0.115, 0.06], [0.115, 0.26], [0.13, 0.28], [0.13, 0.33], [0, 0.33]], shell));
  ring(roll, 0.131, 0.005, seam, 0.3);
  add(roll, drum(0.12, 0.05, 0.012, alloy), 0, 0.36);
  // Parallel gripper: graphite body with a status line, alloy guide rail, fingers with dark pads.
  add(roll, box(0.34, 0.12, 0.18, 0.04, dark), 0, 0.44);
  add(roll, box(0.2, 0.01, 0.004, 0.003, led), 0, 0.445, 0.091);
  add(roll, box(0.38, 0.028, 0.1, 0.01, alloy), 0, 0.515);
  const fingers = [-1, 1].map((s) => {
    const f = add(roll, new THREE.Group(), s * OPEN, 0.5);
    add(f, box(0.05, 0.05, 0.12, 0.012, alloy), 0, 0.045);
    add(f, box(0.04, 0.22, 0.09, 0.012, alloy), 0, 0.16);
    add(f, box(0.046, 0.07, 0.094, 0.014, dark), 0, 0.25);
    return f;
  });

  return { root, yaw, shoulder, elbow, wrist, roll, fingers, glow };
}

const mark = "absolute size-3 border-[#3b4652]";
const corners = (
  <>
    <span className="absolute inset-[6px] animate-[hud-scan_4s_ease-in-out_infinite] bg-[rgba(0,131,176,.09)]" />
    <span className={`${mark} left-0 top-0 border-l border-t`} /><span className={`${mark} right-0 top-0 border-r border-t`} />
    <span className={`${mark} bottom-0 left-0 border-b border-l`} /><span className={`${mark} bottom-0 right-0 border-b border-r`} />
  </>
);

// The hero's centrepiece: a white six-axis arm on a plinth running a slow pick-and-place loop. Two bracket targets
// follow its shoulder and wrist on screen, like a vision system tracking the joints. `detail` frames a closer
// three-quarter view of the working arm instead, without the targets.
export default function HeroArm({ detail = false }: { detail?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const tShoulder = useRef<HTMLSpanElement>(null);
  const tWrist = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = host.current!;
    let r: THREE.WebGLRenderer;
    try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1.05;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    el.prepend(r.domElement);

    const scene = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(r);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.85;
    const key = new THREE.DirectionalLight(0xfffaf3, 1.9);
    key.position.set(-3, 9, 4); key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005;
    Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -2, near: 1, far: 20 });
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xd6e4f0, 1.4); rim.position.set(5, 3, -4); scene.add(rim);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c0c7, 0.45));
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.14 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    // Contact shadow: a soft dark pool right under the plinth that grounds it on the floor.
    const pool = document.createElement("canvas"); pool.width = pool.height = 128;
    const pg = pool.getContext("2d")!, grad = pg.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(10,14,20,.55)"); grad.addColorStop(0.6, "rgba(10,14,20,.18)"); grad.addColorStop(1, "rgba(10,14,20,0)");
    pg.fillStyle = grad; pg.fillRect(0, 0, 128, 128);
    const contact = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.9), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pool), transparent: true, depthWrite: false }));
    contact.rotation.x = -Math.PI / 2; contact.position.set(0.25, 0.002, 0); scene.add(contact);

    const A = build(); scene.add(A.root);
    const cam = new THREE.PerspectiveCamera(26, 1.6, 0.1, 100);

    const size = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(w, h, false);
      // Frame about 2.85 units of height, backing off on narrow screens so the full reach (about 5 units) still fits.
      cam.aspect = w / h;
      const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      if (detail) {
        const dist = Math.max(3, 4.2 / cam.aspect) / (2 * tan);
        cam.position.set(-0.5 + dist * 0.4, 1.7 + dist * 0.1, dist * 0.92); cam.lookAt(-0.5, 1.5, 0);
      } else {
        const dist = Math.max(2.85, 5 / cam.aspect) / (2 * tan);
        cam.position.set(-0.7, 1.22 + dist * 0.12, dist); cam.lookAt(-0.7, 1.22, 0);
      }
      cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(size); ro.observe(el); size();

    const p = new THREE.Vector3();
    const follow = (o: THREE.Object3D, t: HTMLElement | null) => {
      if (!t) return;
      o.getWorldPosition(p).project(cam);
      t.style.left = `${(p.x + 1) * 50}%`; t.style.top = `${(1 - p.y) * 50}%`;
    };
    const pose = (t: number) => {
      const [yaw, sh, el2, roll, grip] = poseAt(t);
      A.yaw.rotation.y = yaw; A.shoulder.rotation.z = sh; A.elbow.rotation.z = el2;
      A.wrist.rotation.z = Math.PI - sh - el2; A.roll.rotation.y = roll;
      A.fingers.forEach((f, i) => { f.position.x = (i ? 1 : -1) * grip; });
      A.glow.opacity = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.2));
      r.render(scene, cam);
      follow(A.shoulder, tShoulder.current); follow(A.wrist, tWrist.current);
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, on = true;
    const t0 = performance.now() - (detail ? 4200 : 0);
    const loop = (now: number) => { pose((now - t0) / 1000); raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !on) { on = true; raf = requestAnimationFrame(loop); }
      else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); }
    });
    io.observe(el);
    if (reduce) pose(0); else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      scene.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map?.dispose(); m.dispose(); }); } });
      pm.dispose(); r.dispose(); r.domElement.remove();
    };
  }, [detail]);

  return (
    <div ref={host} className={`pointer-events-none absolute inset-0 ${detail ? "" : "animate-[rise_1.2s_.2s_var(--ease-expo)_both]"}`}>
      {!detail && <>
      <span ref={tShoulder} aria-hidden="true" className="absolute left-[-99%] size-[clamp(78px,8vw,136px)] -translate-x-1/2 -translate-y-1/2 animate-[hud-in_.9s_1.2s_var(--ease-expo)_both] max-[759px]:hidden">{corners}</span>
      <span ref={tWrist} aria-hidden="true" className="absolute left-[-99%] h-[clamp(40px,3.6vw,62px)] w-[clamp(84px,8.6vw,146px)] -translate-x-1/2 -translate-y-1/2 animate-[hud-in_.9s_1.5s_var(--ease-expo)_both]">{corners}</span>
      </>}
    </div>
  );
}
