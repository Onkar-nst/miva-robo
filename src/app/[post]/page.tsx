import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/LegalPage";
import PostCard from "@/components/PostCard";
import { Lines } from "@/components/ui";
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

const share = (url: string, title: string) => [
  { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, d: "M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" },
  { label: "X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, d: "M4 4l16 16M20 4L4 20" },
  { label: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, d: "M12 3a9 9 0 00-3.3 17.4c0-.8 0-1.8.2-2.6l1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.5 3.2-5.4 0-2.2-1.5-3.9-4.3-3.9-3.1 0-5 2.3-5 4.9 0 .9.3 1.5.7 2" },
  { label: "Linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, d: "M5 9v11M5 5v.01M10 20v-6a3 3 0 016 0v6M10 9v11" },
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
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 1240 }}>
          <p className="meta">Published in: <Link href="/category/blogs/" style={{ color: "var(--accent)" }}>Blogs</Link></p>
          <Lines as="h1" className="h-lg" lines={[p.title]} />
          <p className="meta" style={{ marginTop: 22 }}>Author <Link href="/author/aman-vasa/" style={{ color: "var(--ink)" }}>{p.author}</Link></p>
          <p className="meta"><time dateTime={p.iso}>{p.date}</time></p>
        </div>
      </section>
      <div className="fullimg"><Image src={p.image} alt="" fill priority sizes="100vw" data-parallax="8" /></div>
      <section className="section light">
        <div className="wrap">
          <div className="prose"><Blocks blocks={p.body} /></div>
          <div className="prose share">
            <span className="eyebrow">Share On</span>
            <div>
              {share(url, p.title).map((s) => (
                <a key={s.label} className="circ" href={s.href} target="_blank" rel="nofollow noopener noreferrer" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <nav className="pager light" aria-label="Articles">
        {prev ? <Link href={`/${prev.slug}/`}><span className="eyebrow">Previous Article</span><b>{prev.title}</b></Link> : <span />}
        {next ? <Link href={`/${next.slug}/`}><span className="eyebrow">Next Article</span><b>{next.title}</b></Link> : <span />}
      </nav>
      <section className="section light">
        <div className="wrap">
          <div className="split-head"><Lines className="h-md" lines={["You may also like"]} /></div>
          <div className="posts">{posts.filter((x) => x.slug !== p.slug).map((x) => <PostCard key={x.slug} post={x} />)}</div>
        </div>
      </section>
    </article>
  );
}
