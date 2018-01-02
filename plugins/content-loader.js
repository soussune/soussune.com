import ContentLoader from '~/helpers/ContentLoader.ts'

export default ({ app }, inject) => {
  inject('contentLoader', new ContentLoader(app))
}
