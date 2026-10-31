import { Fragment, createElement } from "react";
import type { Block } from "@/content/posts";
import { Lines } from "./ui";

// Long-form text (legal pages and blog articles).
export const prose = "mx-auto max-w-[740px] [&>*+*]:mt-[1.2em] [&_h3]:mt-[2em] [&_h3]:text-[clamp(24px,2.4vw,32px)] [&_:is(h3,h4)]:font-semibold [&_:is(h3,h4)]:leading-[1.2] [&_:is(h3,h4)]:tracking-[-.025em] [&_h4]:mt-[2em] [&_h4]:text-[22px] [&_h5]:mb-0 [&_h5]:mt-[1.6em] [&_h5]:text-base [&_h5]:font-semibold [&_:is(p,li)]:text-[17px] [&_:is(p,li)]:leading-[1.75] [&_:is(p,li)]:text-soft [&_ul_li]:relative [&_ul_li]:mt-[.5em] [&_ul_li]:pl-[22px] [&_ul_li]:before:absolute [&_ul_li]:before:left-0.5 [&_ul_li]:before:top-[.72em] [&_ul_li]:before:h-0.5 [&_ul_li]:before:w-2.5 [&_ul_li]:before:bg-accent [&_ul_li]:before:content-['']";

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
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]">
        <div className="wrap">
          <Lines as="h1" className="h-lg" lines={[title]} />
          <p className="meta mt-5">{updated}</p>
        </div>
      </section>
      <section className="section-y light">
        <div className="wrap"><div className={prose}><Blocks blocks={blocks} /></div></div>
      </section>
    </>
  );
}
