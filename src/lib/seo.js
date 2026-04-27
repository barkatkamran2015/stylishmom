export const SITE_URL = "https://www.thestylishmama.com";
export const SITE_NAME = "The Stylish Mama";
export const DEFAULT_IMAGE = `${SITE_URL}/logo2.png`;

export const pageSeo = {
  home: {
    title: "The Stylish Mama | Easy Recipes, Mom Life & Stylish Finds",
    description:
      "The Stylish Mama helps busy moms with easy family recipes, practical motherhood tips, beauty shortcuts, travel ideas, and budget-friendly product finds."
  },
  blog: {
    title: "Mom Life Blog | The Stylish Mama",
    description:
      "Honest motherhood stories, immigrant mom life, parenting reflections, family routines, and practical encouragement for busy moms."
  },
  productsreview: {
    title: "Product Reviews for Busy Moms | The Stylish Mama",
    description:
      "Budget-friendly product reviews, beauty favorites, travel essentials, and practical finds that help busy moms save time and feel put together."
  },
  food: {
    title: "Easy Family Recipes for Busy Moms | The Stylish Mama",
    description:
      "Browse easy family recipes, quick weeknight dinners, air fryer meals, comforting appetizers, and simple home cooking from The Stylish Mama."
  },
  drinks: {
    title: "Easy Drink Recipes & Mocktails | The Stylish Mama",
    description:
      "Refreshing drink recipes, mocktails, coffee drinks, syrups, and simple beverages for family days, weekends, and gatherings."
  },
  dessert: {
    title: "Easy Dessert Recipes for Families | The Stylish Mama",
    description:
      "Simple dessert recipes, no-bake treats, low-carb sweets, air fryer desserts, and family-friendly ideas from The Stylish Mama."
  }
};

export const stripHtml = (htmlContent = "") =>
  htmlContent
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

export const excerpt = (htmlContent = "", maxLength = 160) => {
  const text = stripHtml(htmlContent);
  return text.length > maxLength ? `${text.slice(0, maxLength - 3).trim()}...` : text;
};

export const absoluteUrl = (path = "") => {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const absoluteImage = (imageUrl) => {
  if (!imageUrl) return DEFAULT_IMAGE;
  return absoluteUrl(imageUrl);
};

export const postUrl = (section, slug) =>
  `${SITE_URL}/${section}/${encodeURIComponent(slug || "")}`;

export const fetchWithTimeout = (url, options = {}, timeoutMs = 8000) =>
  fetch(url, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs)
  });

export const collectionJsonLd = ({ section, seo, posts = [] }) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: seo.title,
  description: seo.description,
  url: `${SITE_URL}/${section}`,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_IMAGE
    }
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title || "Untitled",
        description: excerpt(post.content || post.contentHtml || "", 160),
        url: postUrl(section, post.slug),
        image: absoluteImage(post.imageUrl || post.thumbnailUrl),
        author: {
          "@type": "Person",
          name: post.author || SITE_NAME
        }
      }
    }))
  }
});
