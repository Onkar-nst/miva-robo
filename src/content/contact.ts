// Shared by the contact form and the /api/contact route, so both agree on the field names.
export type ContactField = { name: string; required?: boolean; type?: string; half?: boolean; area?: boolean };

export const contactFields: ContactField[] = [
  { name: "First Name", required: true },
  { name: "Email Address", required: true, type: "email", half: true },
  { name: "Phone Number", type: "tel", half: true },
  { name: "What is the scope of your project /query", required: true, area: true },
  { name: "Any specific technical requirements?" },
  { name: "What is your budget range? (in INR)", half: true },
  { name: "What is your timeline for implementation?", half: true },
];
