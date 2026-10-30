import LegalPage from "@/components/LegalPage";
import blocks from "@/content/generated/terms-conditions.json";

export const metadata = { title: "Terms & Conditions – MIVA Robotics", alternates: { canonical: "/terms-conditions/" } };

export default function Page() {
  return <LegalPage title="Terms & Conditions" updated="Last Updated: March 16, 2026" blocks={blocks} />;
}
