import LegalPage from "@/components/LegalPage";
import blocks from "@/content/generated/privacy-policy.json";

export const metadata = { title: "Privacy Policy – MIVA Robotics", alternates: { canonical: "/privacy-policy/" } };

export default function Page() {
  return <LegalPage title="Privacy Policy" updated="Last Updated: March 16, 2026" blocks={blocks} />;
}
