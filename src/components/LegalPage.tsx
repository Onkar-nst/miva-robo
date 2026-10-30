import { Fragment, createElement } from "react";
import type { Block } from "@/content/posts";
import { Lines } from "./ui";

export function Blocks({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let list: Block[] = [];
  const flush = (key: number) => {
    if (list.length) out.push(<ul key={`u${key}`}>{list.map((l) => <li key={l.x}>{l.x}</li>)}</ul>);
    list = [];
  };
  blocks.forEach((b, i) => {
    if (b.t === "li") { list.push(b); return; }
    flush(i);
    out.push(<Fragment key={i}>{createElement(b.t, null, b.x)}</Fragment>);
  });
  flush(blocks.length);
  return <>{out}</>;
}

export default function LegalPage({ title, updated, blocks }: { title: string; updated: string; blocks: Block[] }) {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Lines as="h1" className="h-lg metal" lines={[title]} />
          <p className="meta" style={{ marginTop: 20 }}>{updated}</p>
        </div>
      </section>
      <section className="section light">
        <div className="wrap"><div className="prose"><Blocks blocks={blocks} /></div></div>
      </section>
    </>
  );
}
