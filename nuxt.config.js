
//contentfulのモジュール及び設定ファイルの読み込み

// ここから追加
const config = require('./.contentful.json')
const contentful = require('contentful')
// ここまで追加

// Nuxt.jsには、そのように静的ページを生成する機能はあるのですが、
// 特別な設定を行わないままだと、各ページのルーティングを書き出すことまではしてくれず、
// その結果、個別ページ、カテゴリページ、タグページなどの動的ページへの直接アクセス（貼られたリンクをクリックしてアクセスする場合など）
// ができないという問題が生じる。そこで、動的ページへのルーティングを全て書き出してもらうための、追加的な設定をnuxt.config.jsに記述して
// おく必要があります。


//nuxt.jsのモジュール、コンテンツ群を静的ページに変換するための設定。（Netlifyというhosthingサービスに追加するため）
const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN
})


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || 'otetsu_portfolio',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  //contentfulで使用する環境変数の追加。configはページTOPで読み込んだconfigファイルのこと。
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    //fontowesomeをプロジェクト全体で使えるようにする設定
    '@fortawesome/fontawesome-svg-core/styles.css' // ここを追加
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //fontowesomeをプロジェクト全体で使えるようにする設定
    { src: '~plugins/font-awesome', ssr: false } // ここを追加
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // ここから追加
    '@nuxtjs/markdownit',
    'nuxt-fontawesome'
    // ここまで追加
  
  ],

  markdownit: { 
    html: true,
    injected: true,
    linkify: true,
    breaks: false
  },
  // ここまで追加

  // ここから追加
  fontawesome: {
    component: 'fa'
  },

  //nuxt.jsのモジュール、コンテンツ群を静的ページに変換するための設定。
  //nuxt.jsでは通常静的ルーティングはbuild時にそのまま変換してくれるが、
  //category/:idのような動的ルーティングまでは変換してルーティングとして出力してくれない。
  //そのため以下のようにして、動的ルーティングもbuild時に出力してやる。
  // 参考：https://www.dkrk-blog.net/vue-nuxt/nuxt-generate-routes
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          'content_type': 'work'
        }),
        client.getEntries({
          'content_type': 'category'
        }),
        client.getEntries({
          'content_type': 'tag'
        })
      ]).then(([works,categories,tags]) => {
        return [
          ...works.items.map(work => `work/${work.fields.slug}`),
          ...categories.items.map(category => `category/${category.fields.slug}`),
          ...tags.items.map(tag => `tag/${tag.sys.id}`)
        ]
      })
    }
  },
  // ここまで追加


  // Build Configuration: https://go.nuxtjs.dev/config-build
  //babelがWARNINGを吐き出しまくったので、それを吐き出さないようにbabelの設定ファイルを有効にしてその中に出さないようにする定義を追加。
  //以下はその設定ファイルを有効にする定義。
  build: {
    babel: {
      babelrc: true
    },
  }

  

}
