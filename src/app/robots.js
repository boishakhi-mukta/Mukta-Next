export const dynamic = "force-static";

// Update the URL below to your actual deployed domain
const BASE_URL = "https://boishakhimukta.netlify.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
