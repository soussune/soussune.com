module.exports = {
  content: {
    permalink: '/episode/:slug',
    page: '/_content',
    generate: [ // for static build
      'get', 'getAll'
    ],
    isPost: false
  }
}
