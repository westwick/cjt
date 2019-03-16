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
    // '@nuxtjs/axios',
    // '@nuxtjs/bulma',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '~/modules/imggen'
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
    { src: '~assets/styles/main.sass', lang: 'sass' }
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
    // analyze: true,
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {},
        // minSize: 50000,
        // maxSize: 200000
      }
    },
    extend(config, ctx) {
      // Excludes /assets/svg from url-loader
      // console.log('config', config.module.rules);
      config.module.rules.forEach(rule => {
        // console.log(rule)
        if (rule.use) {
          // console.log('*** Rule:')
          // console.log(rule)
          // console.log('*** use:')
          // console.log(rule.use)
        }
      })
      const urlLoader = config.module.rules.find((rule) => rule.use && rule.use[0].loader === 'url-loader')
      console.log(urlLoader);
      urlLoader.use[0].options.limit = 3000;
      // console.log(urlLoader);
      // urlLoader.exclude = /(assets\/svg)/
      // urlLoader.query.limit = 3000;
      


      // config.module.rules.push({
      //   test: /\.(jpe?g|svg)$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 3000, // 1kB
      //     name: 'img/[name].[hash:7].[ext]'
      //   }
      // });

      // run eslint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  workbox: {
    runtimeCaching: [{
      urlPattern: 'https://ucarecdn.com/.*',
      handler: 'staleWhileRevalidate',
      method: 'GET',
      strategyOptions: {
        cacheName: 'ucare-cdn-images',
        // cacheableResponse: { statuses: [0, 200] },
        // cacheExpiration: {
        //   maxEntries: 50,
        //   maxAgeSeconds: 3000
        // }
      }
    }]
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
