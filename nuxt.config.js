import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers
  head: {
    titleTemplate: '%s - chatbot',
    title: 'chatbot',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [],

  // Plugins
  plugins: ['~/plugins/chatbot.js'],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: ['@nuxtjs/vuetify'],

  // Runtime environment config for production safety
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    githubRedirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback',
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback'
  },

  // Modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Axios Config (dynamic)
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    credentials: true
  },

  // Chatbot API Middleware
  serverMiddleware: [
    { path: '/api/chat', handler: '~/server-middleware/chat.js' }
  ],

  // Auth config with dynamic redirect URIs
  auth: {
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: '/auth/callback',
      home: '/'
    },
    autoFetchUser: false,
    strategies: {
      google: {
        clientId: '705465934119-cl3nlapog869v8o9bhadosabmto8jdde.apps.googleusercontent.com',
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        responseType: 'token id_token',
        scope: ['openid', 'profile', 'email'],
        redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
        codeChallengeMethod: ''
      },
      github: {
        clientId: 'Ov23litHqkxnePB9LwU9',
        clientSecret: '842c730ca1f6bda70cc69d3c797ef94402146a74',
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://github.com/login/oauth/authorize',
          token: 'https://github.com/login/oauth/access_token',
          userInfo: 'https://api.github.com/user'
        },
        scope: ['read:user', 'user:email'],
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: '',
        redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback'
      }
    }
  },

  // Vuetify Config
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
          success: colors.green.accent3
        }
      }
    }
  },

  // Build config
  build: {}
}
