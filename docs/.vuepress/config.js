module.exports = {
  title: 'ChoDragon9 | DragonJs',
  base: '/dragonjs/',
  themeConfig: {
    nav: [
      {
        text: 'Vue 2',
        items: [
          {text: '2017.09 파트별 구현', link: '/src/vue2-part/'},
          {text: '2019.08 컴포넌트 구현', link: '/src/vue2-component/'},
        ]
      },
      {
        text: 'Moment.js',
        link: '/src/momentjs/'
      },
      {
        text: 'Immer.js',
        link: '/src/immerjs/'
      },
      {
        text: 'Axios',
        link: '/src/axios/'
      },
      {
        text: 'Presentation',
        items: [
          {text: '설계', link: '/src/presentation/design/'},
          {text: '작은 기능 만들기', link: '/src/presentation/todo/'},
        ]
      },
    ]
  },
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: '' // yX6dHIw5DyDCd9iNbZSo2w8VjnED68OLdw6zu_Rm554
      }
    ]
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-135042351-5'
      }
    ],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html',
      },
    ],
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          transpileOnly: true,
        },
      },
    ]
  ]
}
