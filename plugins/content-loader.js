import ContentLoader from '~/helpers/ContentLoader'

export default ({ app }, inject) => {
  inject('contentLoader', new ContentLoader(app))
}
