import colors from 'vuetify/es5/util/colors'
// import Vue from 'vue'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - good-lock',
    title: 'Good-lock',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
    // baseURL:
  //    baseURL:
  // },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },
  privateRuntimeConfig: {},
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    // fontawesome icons solid
    // 'assets/fontawesome/fontawesome.css',
    // 'assets/fontawesome/webfonts/solid.css',
    // SCSS file in the project
    '~/design/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/pure.js',
    // '~/plugins/vue-awesome-notifications.js',
    // { src: '~/plugins/axios.js', mode: 'client'}
    { src: '~/plugins/vue-awesome-notifications.js', mode: 'client'},
    { src: '~/plugins/v-tippy.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  fontawesome: {
    // import icons here and use it like this
    // <font-awesome-icon :icon="['fas', 'coffee']" />
    // list of icons can be found here https://fontawesome.com/icons?d=gallery&p=2&m=free
    icons: {
      solid: [
        'faCoffee',
        'faHome',
        'faUser',
        'faUserPlus',
        'faWifi',
        'faQuoteRight',
      ]
    },
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://www.npmjs.com/package/@nuxtjs/fontawesome
    // '@nuxtjs/fontawesome',
    '@nuxtjs/fontawesome'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          good: '#1a1a1a',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
