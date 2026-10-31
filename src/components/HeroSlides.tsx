// Luminous stage the robot stands on; Robot.tsx finds it through data-robot-stage on the hero.
export default function HeroSlides() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(ellipse_52%_72%_at_77%_58%,#e3ecf3_0%,rgba(243,246,248,.7)_45%,transparent_75%),linear-gradient(180deg,#ffffff,var(--bg))]">
      <div className="absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_60%_70%_at_77%_60%,#000,transparent)]" />
    </div>
  );
}
