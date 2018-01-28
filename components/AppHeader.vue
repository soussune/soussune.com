<template>
  <header role="banner" class="top-bar" :class="{scrolled: scrollY > 0}">
    <nav class="top-bar__branding">
      <nuxt-link exact to="/" @click.native="scrollToTop">
        <AppLogo />
      </nuxt-link>
    </nav>
    <div class="top-bar__search">
      <section class="top-bar-search">
        <div class="top-bar-search__input-wrapper">
          <div
            class="search-input-wrapper"
            :class="{ focused: focused }"
          >
            <label class="search-input">
              <span
                class="search-input__add-on search-input__add-on--before"
              >
                <icon name="search" class="search-icon"></icon>
              </span>
              <input
                type="search"
                name="search"
                placeholder="検索"
                autocomplete="off"
                class="search-input-field"
                :value="$store.state.searchText"
                @input="updateInput"
                @focus="onFocus"
                @blur="onBlur"
              >
            </label>
          </div>
        </div>
      </section>
    </div>
    <nav class="top-bar__nav" :class="{isMenuOpen}" @click="closeMenu">
      <ul class="top-bar__nav-list">
        <li>
          <nuxt-link to="/episode" @click.native="scrollToTop">
            エピソード
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/actors" @click.native="scrollToTop">
            出演者
          </nuxt-link>
        </li>
        <li>
          <a href="https://medium.com/soussune" target="_blank">
            ブログ
          </a>
        </li>
      </ul>
    </nav>
    <div class="top-bar__menu"><button @click="toggleMenu"><icon name="bars" scale="1.5"></icon></button></div>
  </header>
</template>

<script lang="ts">
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  methods: {
    onScroll() {
      this.scrollY = window.scrollY
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    closeMenu() {
      this.isMenuOpen = false
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    updateInput(e) {
      this.$store.commit('searchText', e.target.value)
    },
    onBlur() {
      this.onEdit = false
    },
    onFocus() {
      this.onEdit = true
    }
  },
  data() {
    return {
      scrollY: 0,
      isMenuOpen: false,
      onEdit: false
    }
  },
  computed: {
    focused() {
      return this.onEdit || this.$store.state.searchText !== ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  directives: {
    imeInput: {
      bind(el, binding, vnode) {
        let onComposition = false
        el.addEventListener('compositionstart', () => {
          onComposition = true
        })
        el.addEventListener('compositionend', (e) => {
          onComposition = false
          binding.value = e.target.value
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
        el.addEventListener('input', (e) => {
          if (onComposition) return
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

.top-bar {
  position: fixed;
  z-index: 502;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  display: grid;
  background: $clr-main;
  height: $header-height;
  width: 100%;
  grid-template-columns: minmax(8rem, 15rem) 1fr minmax(10rem, 20rem);
  grid-template-rows: 1fr;
  grid-template-areas: 'logo search nav';
  align-items: center;
  grid-gap: 1rem;
  padding: 0 1rem;

  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);

  &.scrolled {
    background: $clr-main-d;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 30px 0 rgba(0, 0, 0, 0.2);
  }

  @include mq() {
    grid-template-areas: 'logo search menu';
    grid-template-rows: 1fr;
    grid-template-columns: 1.5rem 1fr 1.5rem;
  }

  &__branding {
    grid-area: logo;
    justify-self: center;
    margin-top: 0.4rem;
    @include mq() {
      width: 23px;
      overflow: hidden;
    }
  }

  &__search {
    grid-area: search;
  }

  &__nav {
    grid-area: nav;

    @include mq() {
      position: absolute;
      top: 0;
      width: 100%;
      display: none;

      &.isMenuOpen {
        display: block;
      }
      &-list {
        padding: 1rem;
        background: $clr-main-d;
      }
      &:after {
        content: '';
        background: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: block;
      }
    }

    &-list {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-gap: 1rem;
      justify-items: center;

      @include mq() {
        grid-template-columns: 1fr;
        justify-items: auto;
        a {
          // background: #999;
          display: block;
          text-align: center;
        }
      }

      a {
        color: $clr-white-ll;
        text-decoration: none;
        $line-color: $clr-white-ll;
        @import '~assets/css/_hoverline.scss';
      }
    }
  }

  &__menu {
    grid-area: menu;
    display: none;
    justify-self: center;

    @include mq() {
      display: block;
    }

    button {
      background: transparent;
      border: none;
      color: $clr-white-ll;
    }
  }
}

.search-input {
  color: $clr-white-ll;
  background-color: $clr-main-ll;
  border-radius: 3px;
  box-shadow: none;
  height: 2.2rem;
  line-height: 2.2rem;
  margin: 0;
  border: none;
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  min-width: 75px;
  vertical-align: baseline;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 0.92rem;
  align-self: center;
  flex: 1;
  outline: none;
  transition: background-color 200ms ease, border-color 200ms ease;

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: $clr-white-ll;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: $clr-white-ll;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: $clr-white-ll;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: $clr-white-ll;
  }

  &__add-on {
    color: $clr-white-ll;
    opacity: 1;

    &--before {
      height: 1.8rem;
      display: flex;
      align-items: center;
    }

    .focused & {
      color: $clr-black-l;
    }
  }

  &--search {
    -webkit-appearance: none;
    background-color: transparent;
    transition: transform 200ms ease, opacity 200ms ease, -webkit-transform 200ms ease;
  }

  .focused & {
    background-color: $clr-white;
    color: $clr-black-l;
    box-shadow: none;
    transition: background-color 200ms ease, border-color 200ms ease;

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: $clr-black-l;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: $clr-black-l;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: $clr-black-l;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: $clr-black-l;
    }
  }
}

.search-input-field {
  color: $clr-white-ll;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  height: 2.2rem;
  line-height: 2.2rem;
  margin: 0;
  border: none;
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  min-width: 75px;
  vertical-align: baseline;
  padding: 5px 10px;
  box-sizing: border-box;
  font-size: 0.92rem;
  align-self: center;
  flex: 1;
  outline: none;
  -webkit-appearance: none;

  .focused & {
    color: $clr-black;
  }
}

.search-icon {
  position: relative;
  top: -2px;
}
</style>
