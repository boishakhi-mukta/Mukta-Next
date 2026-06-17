export const dynamic = "force-static";

// Update the URL below to your actual deployed domain
const BASE_URL = "https://boishakhi.netlify.app";

export default function sitemap() {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
