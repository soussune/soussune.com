module.exports = {
  content: [
    [
      'episode',
      {
        permalink: '/episode/:slug',
        page: '/_content',
        generate: [ // for static build
          'get', 'getAll'
        ],
        isPost: false
      }
    ],
    [
      'actors',
      {
        permalink: '/actors/:slug',
        page: '/_actor',
        generate: [ // for static build
          'get', 'getAll'
        ],
        isPost: false
      }
    ]
  ]
}
