// Client-supplied values that are still pending. Fill these in and the UI updates everywhere.
export const pending = {
  gstin: "", // e.g. 27ABCDE1234F1Z5
};

export const site = {
  name: "MIVA Robotics",
  url: "https://mivarobotics.ai",
  title: "MIVA Robotics – Accessible, Adaptable, Affordable automation",
  phone: "+91-8055507204",
  email: "info@mivarobotics.ai",
  linkedin: "https://in.linkedin.com/company/miva-robotics",
  footerBlurb:
    "We help our clients improve productivity, safety, and efficiency through intelligent automation and robotics that is accessible, affordable, and adaptable.",
  instagram: { url: "https://www.instagram.com/miva_robotics/", handle: "@miva_robotics" },
  youtube: {
    url: "https://www.youtube.com/@MIVAROBOTICS",
    handle: "@MIVAROBOTICS",
    // Played in the tablet mockup on the home page.
    video: { id: "QQrv2Brm05Y", title: "MIVA ROBOTICS : Affordable, Accessible, Adaptable Automation for every scale" },
  },
};

export const productNav = [
  { label: "MIVA Axis", href: "/portfolio/miva-axis/", image: "/media/MIVA-AXIS-1.jpg" },
  { label: "MIVA Navis", href: "/portfolio/miva-navis/", image: "/media/MIVA-AMR-1.jpg" },
  { label: "MIVA Eagle", href: "/portfolio/miva-eagle/", image: "/media/MIVA-EAGLE-2.jpg" },
  { label: "MIVA Eye", href: "/portfolio/miva-eye/", image: "/media/MIVA-EYE-1.jpg" },
  { label: "MIVA OS", href: "/portfolio/miva-os/", image: "/media/MIVA-OS.png" },
  { label: "MIVA Assist", href: "/portfolio/miva-assist/", image: "/media/MIVA-ASSIST-1.jpg" },
];

export const serviceNav = [
  { label: "RaaS", href: "/portfolio/raas/", image: "/media/RaaS_Banner.jpg" },
  { label: "SaaS", href: "/portfolio/saas/", image: "/media/SaaS_Banner.jpg" },
  { label: "CaaS", href: "/portfolio/caas/", image: "/media/CaaS_Banner.jpg" },
];
