import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import ServicePage from "@/components/ServicePage";
import { products, services } from "@/content/products";

export const dynamicParams = false;
export const generateStaticParams = () => [...products, ...services].map(({ slug }) => ({ slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = [...products, ...services].find((x) => x.slug === slug);
  return { title: item?.title, alternates: { canonical: `/portfolio/${slug}/` } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = products.find((x) => x.slug === slug);
  if (product) return <ProductPage p={product} />;
  const service = services.find((x) => x.slug === slug);
  if (service) return <ServicePage s={service} />;
  notFound();
}
