/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bp-projectbooth.com",
  generateRobotsTxt: false, // Kita sudah membuat manual
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude: ["/admin/*", "/server-sitemap.xml"],
  alternateRefs: [
    {
      href: "https://bp-projectbooth.com",
      hreflang: "id",
    },
  ],
  transform: async (config, path) => {
    // Kustomisasi prioritas berdasarkan path
    let priority = 0.7;
    let changefreq = "monthly";

    // Halaman utama
    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    }

    // Halaman about-us
    if (path === "/about-us") {
      priority = 0.8;
      changefreq = "monthly";
    }

    // Halaman services
    if (path === "/services") {
      priority = 0.9;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
