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
    ]
  ]
}
