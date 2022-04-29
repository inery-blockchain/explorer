module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
  trailingSlash: true,
  assetPrefix: "",
  /* i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'fr', 'nl-NL'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    domains: [
      {
        // Note: subdomains must be included in the domain value to be matched
        // e.g. www.example.com should be used if that is the expected hostname
        domain: 'explorer.inery.io',
        defaultLocale: 'en-US',
      },
      {
        domain: 'explorer.inery.io',
        defaultLocale: 'nl-NL',
        // specify other locales that should be redirected
        // to this domain
        // locales: ['nl-BE'],
      },
      {
        domain: 'explorer.inery.io',
        defaultLocale: 'fr',
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        // http: true,
      },
    ],
  }, */
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/blocks": { page: "/blocks" },
      "/accounts": { page: "/accounts" },
      "/transactions": { page: "/transactions" },
      "/blocks/block_info": { page: "/blocks/block_info" },
      "/accounts/account_info": { page: "/accounts/account_info" }
    }
  }
}
