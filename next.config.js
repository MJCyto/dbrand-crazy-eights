/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sets lang attribute so the browser doesn't assume the site is in the default language for the browser.
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
