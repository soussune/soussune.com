module.exports = {
  content: [
    [
      'episode',
      {
        page: '_episode',
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
        page: '_actor',
        permalink: '/actors/:slug',
        generate: [
          // for static build
          'get',
          'getAll'
        ],
        isPost: false
      }
    ]
  ]
}
