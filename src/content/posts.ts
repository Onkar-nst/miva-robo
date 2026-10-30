import physical from "./generated/post-physical-ai-when-intelligence-moves-from-code-to-the-real-world.json";
import msme from "./generated/post-why-msmes-are-ready-for-automation-and-whats-been-holding-them-back.json";
import robotics from "./generated/post-ai-and-robotics-from-industrial-luxury-to-everyday-necessity.json";

export type Block = { t: string; x: string };

export const posts = [
  { slug: "ai-and-robotics-from-industrial-luxury-to-everyday-necessity", image: "/media/ai-robotics.jpg", blocks: robotics as Block[] },
  { slug: "why-msmes-are-ready-for-automation-and-whats-been-holding-them-back", image: "/media/msme-automation.jpg", blocks: msme as Block[] },
  { slug: "physical-ai-when-intelligence-moves-from-code-to-the-real-world", image: "/media/physical-ai.jpg", blocks: physical as Block[] },
].map((p) => ({
  ...p,
  title: p.blocks[0].x,
  body: p.blocks.slice(1),
  author: "Aman Vasa",
  date: "February 10, 2026",
  iso: "2026-02-10",
}));
