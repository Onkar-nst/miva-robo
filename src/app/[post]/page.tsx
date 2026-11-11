import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, prose } from "@/components/LegalPage";
import PostCard from "@/components/PostCard";
import { circ, fullImg, Lines, pager } from "@/components/ui";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ post: p.slug }));

type Props = { params: Promise<{ post: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await params;
  const p = posts.find((x) => x.slug === post);
  return { title: p && `${p.title} – MIVA Robotics`, alternates: { canonical: `/${post}/` } };
}

// Share links with the networks' own marks (filled glyphs on a 24px grid).
const share = (url: string, title: string) => [
  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, d: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.56-.14-2.86-.14C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4z" },
  { label: "X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, d: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.46 21H2.39l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.18h1.7L7.4 4.73H5.58z" },
  { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, d: "M12.02 2C6.5 2 2.02 6.47 2.02 11.99c0 4.23 2.63 7.85 6.35 9.3-.09-.79-.17-2 .03-2.87.18-.78 1.17-4.96 1.17-4.96s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.26.64 1.26 1.41 0 .86-.54 2.14-.83 3.33-.24.99.5 1.8 1.48 1.8 1.77 0 3.14-1.87 3.14-4.57 0-2.38-1.72-4.06-4.17-4.06-2.84 0-4.51 2.14-4.51 4.33 0 .86.33 1.79.74 2.29.08.1.09.19.07.29l-.28 1.14c-.04.19-.14.23-.33.14-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.96-.52-2.3-1.15l-.62 2.37c-.23.87-.84 1.96-1.25 2.62.94.29 1.92.45 2.96.45 5.51 0 9.99-4.47 9.99-9.99C22 6.47 17.53 2 12.02 2z" },
  { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, d: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56z" },
];

export default async function Post({ params }: Props) {
  const { post } = await params;
  const i = posts.findIndex((x) => x.slug === post);
  if (i < 0) notFound();
  const p = posts[i];
  // Posts are listed newest first, so the previous article is the older one.
  const prev = posts[i + 1], next = posts[i - 1];
  const url = `${site.url}/${p.slug}/`;
  return (
    <article>
      <section className="pb-[clamp(31px,3.9vw,57px)] pt-[clamp(112px,11.7vw,156px)]">
        <div className="wrap max-w-[1240px]">
          <p className="meta">Published in: <Link href="/category/blogs/" className="text-accent-text">Blogs</Link></p>
          <Lines as="h1" className="h-lg" lines={[p.title]} />
          <p className="meta mt-[22px]">Author <Link href="/author/aman-vasa/" className="text-ink">{p.author}</Link></p>
          <p className="meta"><time dateTime={p.iso}>{p.date}</time></p>
        </div>
      </section>
      <div className={fullImg}><Image src={p.image} alt="" fill priority sizes="100vw" data-parallax="8" /></div>
      <section className="section-y light">
        <div className="wrap">
          <div className={prose}><Blocks blocks={p.body} /></div>
          <div className="mx-auto mt-14 flex max-w-[740px] flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
            <span className="eyebrow">Share On</span>
            <div className="flex gap-2.5">
              {share(url, p.title).map((s) => (
                <a key={s.label} className={circ} href={s.href} target="_blank" rel="nofollow noopener noreferrer" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <nav className={`light ${pager}`} aria-label="Articles">
        {prev ? <Link href={`/${prev.slug}/`}><span className="eyebrow">Previous Article</span><b>{prev.title}</b></Link> : <span />}
        {next ? <Link href={`/${next.slug}/`}><span className="eyebrow">Next Article</span><b>{next.title}</b></Link> : <span />}
      </nav>
      <section className="section-y light">
        <div className="wrap">
          <div className="mb-[clamp(36px,4vw,56px)]"><Lines className="h-md" lines={["You may also like"]} /></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-5 gap-y-11">{posts.filter((x) => x.slug !== p.slug).map((x) => <PostCard key={x.slug} post={x} />)}</div>
        </div>
      </section>
    </article>
  );
}
