import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/LegalPage";
import { Lines } from "@/components/ui";
import { posts } from "@/content/posts";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ post: p.slug }));

type Props = { params: Promise<{ post: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await params;
  const p = posts.find((x) => x.slug === post);
  return { title: p && `${p.title} – MIVA Robotics`, alternates: { canonical: `/${post}/` } };
}

export default async function Post({ params }: Props) {
  const { post } = await params;
  const p = posts.find((x) => x.slug === post);
  if (!p) notFound();
  return (
    <article>
      <section className="page-hero">
        <div className="wrap" style={{ maxWidth: 1240 }}>
          <p className="meta">Published in: <Link href="/category/blogs/" style={{ color: "var(--accent-2)" }}>Blogs</Link></p>
          <Lines as="h1" className="h-lg metal" lines={[p.title]} />
          <p className="meta" style={{ marginTop: 22 }}>Author <Link href="/author/aman-vasa/" style={{ color: "var(--ink)" }}>{p.author}</Link> · Published on: <time dateTime={p.iso}>{p.date}</time></p>
        </div>
      </section>
      <div className="fullimg"><Image src={p.image} alt="" fill priority sizes="100vw" data-parallax="8" /></div>
      <section className="section"><div className="wrap"><div className="prose"><Blocks blocks={p.body} /></div></div></section>
    </article>
  );
}
