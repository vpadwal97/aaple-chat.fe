import type { Metadata } from "next";

import { SEO } from "./config";

// =========================
// DEFAULT SEO
// =========================
export const defaultMetadata: Metadata =
  {
    metadataBase: new URL(
      SEO.url
    ),

    title: SEO.title,

    description:
      SEO.description,

    keywords:
      SEO.keywords,

    authors: [
      {
        name: SEO.creator,
      },
    ],

    creator:
      SEO.creator,

    openGraph: {
      type: "website",

      url: SEO.url,

      siteName:
        SEO.siteName,

      title: SEO.title,

      description:
        SEO.description,

      images: [
        {
          url: SEO.ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title: SEO.title,

      description:
        SEO.description,

      images: [
        SEO.ogImage,
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };