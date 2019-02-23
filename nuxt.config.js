var glob = require('glob');
var path = require('path');

// Enhance Nuxt's generate process by gathering all content files from Netifly CMS
// automatically and match it to the path of your Nuxt routes.
// The Nuxt routes are generate by Nuxt automatically based on the pages folder.
var dynamicRoutes = getDynamicPaths({
  '/blog': 'blog/posts/*.json',
  '/tours': 'tours/*.json',
  '/group-events': 'events/*.json',
  '/boat-charters': 'boat-charters/*.json'
});


module.exports = {
  mode: 'universal',
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/bulma',
    '@nuxtjs/pwa',
    // '@nuxtjs/proxy'
  ],
  // proxy: {
  //   '/.netlify': {
  //     target: 'http://localhost:9000',
  //     pathRewrite: {'^/.netlify/functions': ''},
  //   },
  // },
  // manifest for PWA
  manifest: {
    short_name: 'Captain Jack\'s Tours',
    name: 'Captain Jack\'s Santa Barbara Tours and Events'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Captain Jack\'s Santa Barbara Tours',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [

    ]
  },
  css: [
    { src: '~layouts/main.sass', lang: 'sass' }
    // Load a Node.js module directly (here it's a Sass file)
    // 'bulma',
    // CSS file in the project
    // '@/assets/css/main.css',
    // SCSS file in the project
    // '@/assets/css/main.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#26abe1' },
  /*
  ** Route config for pre-rendering
  */
  generate: {
    routes: dynamicRoutes,
    fallback: '404.html'
  },
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],
  router: {
    middleware: ['redirects']
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.json')}`);
    })
  );
}
