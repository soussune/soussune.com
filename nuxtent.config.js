import externalLinks from 'markdown-it-link-attributes'

module.exports = {
  content: [
    [
      'episode',
      {
        page: '_id',
        permalink: '/episode/:slug',
        generate: [
          // for static build
          'get',
          'getAll'
        ],
        isPost: false
      }
    ],
    [
      'actors',
      {
        page: '_id',
        permalink: '/actors/:slug',
        generate: [
          // for static build
          'get',
          'getAll'
        ],
        isPost: false
      }
    ]
  ],
  parsers: {
    md: {
      plugins: [
        [
          externalLinks,
          {
            attrs: {
              target: '_blank',
              rel: 'noopener'
            }
          }
        ]
      ]
    }
  }
}
