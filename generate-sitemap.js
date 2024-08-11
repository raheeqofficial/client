const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Define your site's URLs
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/products/category/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/subCat/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/flash-sale/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/popular-products/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/fashion/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/new/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/product/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/products/all', changefreq: 'daily', priority: 0.7 },
  { url: '/product/error', changefreq: 'daily', priority: 0.7 },
  { url: '/cart', changefreq: 'daily', priority: 0.7 },
  { url: '/signIn', changefreq: 'daily', priority: 0.7 },
  { url: '/signUp', changefreq: 'daily', priority: 0.7 },
  { url: '/my-list', changefreq: 'daily', priority: 0.7 },
  { url: '/checkout', changefreq: 'daily', priority: 0.7 },
  { url: '/orders', changefreq: 'daily', priority: 0.7 },
  { url: '/order/details/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/*', changefreq: 'daily', priority: 0.7 },
  { url: '/page-not-found', changefreq: 'daily', priority: 0.7 },
  { url: '/account-setting', changefreq: 'daily', priority: 0.7 },
  { url: '/account', changefreq: 'daily', priority: 0.7 },
  { url: '/search', changefreq: 'daily', priority: 0.7 },
  { url: '/success', changefreq: 'daily', priority: 0.7 },
  { url: '/become-seller', changefreq: 'daily', priority: 0.7 },
  { url: '/help-center', changefreq: 'daily', priority: 0.7 },
  { url: '/help-center/shipping-delivery', changefreq: 'daily', priority: 0.7 },
  { url: '/shops', changefreq: 'daily', priority: 0.7 },
  { url: '/shops/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/verify/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/terms-of-use/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/privacy-policy/:id', changefreq: 'daily', priority: 0.7 },
  { url: '/privacy-policy/:id', changefreq: 'daily', priority: 0.7 },
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://hibuyshopping.com' });

// Generate the sitemap
streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
  fs.writeFileSync('./public/sitemap.xml', data.toString())
);

console.log('Sitemap generated!');
