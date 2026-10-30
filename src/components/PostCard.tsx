import Image from "next/image";
import Link from "next/link";
import type { posts } from "@/content/posts";
import { ArrowR, circ, circHover, frame, tag } from "./ui";

// The byline only appears on the home page cards, matching mivarobotics.ai.
export default function PostCard({ post, byline }: { post: (typeof posts)[number]; byline?: boolean }) {
  return (
    <Link href={`/${post.slug}/`} className="group block" data-reveal>
      <div className={`${frame} mb-[18px] aspect-video group-hover:[&_img]:scale-[1.04]`}>
        <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
        <span className={tag}>Blogs</span>
      </div>
      <p className="meta"><time dateTime={post.iso}>{post.date}</time></p>
      <div className="flex items-start justify-between gap-5">
        <div>
          <h3 className="max-w-[30ch] text-base font-semibold leading-[1.35] transition-colors duration-300 group-hover:text-accent">{post.title}</h3>
          {byline && <p className="mt-2 text-[13px] text-muted">Posted by {post.author}</p>}
        </div>
        <span className={`${circ} ${circHover}`} aria-hidden="true"><ArrowR /></span>
      </div>
    </Link>
  );
}
