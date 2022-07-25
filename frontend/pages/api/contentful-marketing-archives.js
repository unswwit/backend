import { createClient } from "contentful";

const useContentfulMarketingArchives = () => {
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN,
    host: process.env.NEXT_PUBLIC_CONTENTFUL_API_HOST,
  });

  // Gets podcast episodes using Contentful API
  const getMarketingArchives = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "marketing_archives",
        select: "fields",
      });
      const sanitizeEntries = entries.items.map((item) => {
        const id = item.fields.id;
        const label = item.fields.label;
        const date = item.fields.date;
        const imgUrl = item.fields.img.fields.file.url;
        const category = item.fields.category;
        const link = item.fields.link;
        const year = Number(item.fields.year);

        if (!/^https?:/.test(imgUrl)) {
            // Relative URL/path
            imgUrl = 'https:' + imgUrl;
        }
        
        return {
          id,
          label,
          date,
          imgUrl,
          category,
          link,
          year,
        };
      });

      return sanitizeEntries;
    } catch (error) {
      console.log(`Error fetching marketing_archive: ${error}`);
    }
  };
  return { getMarketingArchives };
};

export default useContentfulMarketingArchives;