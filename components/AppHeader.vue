<template>
  <header role="banner" class="header">
    <div class="top-bar">
      <div class="top-bar__branding">
        <nuxt-link exact to="/">
          <AppLogo />
        </nuxt-link>
      </div>
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
                  <svg class="search-icon search-icon--size-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path>
                  </svg>
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
      <div class="top-bar__list">
        <div class="top-bar__item">
          <nuxt-link to="/episode">
            エピソード
          </nuxt-link>
        </div>
        <div class="top-bar__item">
          <nuxt-link to="/actors">
            出演者
          </nuxt-link>
        </div>
        <div class="top-bar__item">
          <a href="https://medium.com/soussune" target="_blank">
            ブログ
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  methods: {
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
      onEdit: false
    }
  },
  computed: {
    focused() {
      return this.onEdit || this.$store.state.searchText !== ''
    }
  },
  directives: {
    imeInput: {
      bind(el, binding, vnode) {
        let onComposition = false
        el.addEventListener('compositionstart', () => {
          onComposition = true
        })
        el.addEventListener('compositionend', e => {
          onComposition = false
          binding.value = e.target.value
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
        el.addEventListener('input', e => {
          if (onComposition) return
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 502;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  height: 3.8rem;
}

.top-bar {
  display: grid;
  background: #1c2260;
  height: 3.8rem;
  width: 100vw;
  grid-template-columns: 14.8rem 1fr;
  grid-template-areas: 'logo search list';

  &__branding {
    grid-area: logo;
    align-self: center;
    width: 14.8rem;
    min-width: 14.8rem;
    padding-right: 0.8rem;
    padding-left: 1.6rem;

    a {
      display: flex;
    }
  }

  &__search {
    grid-area: search;
    align-self: center;
    padding-right: 0.8rem;
    padding-left: 0.8rem;
  }

  &__list {
    grid-area: list;
    align-self: center;
    justify-self: end;
    display: flex;
  }

  &__item {
    box-sizing: border-box;
    text-align: center;
    min-width: 6rem;

    a {
      color: #FFFFFF;
      text-decoration: none;
      font-weight: 600;
    }
  }
}

.search-input {
  color: #FFFFFF;
  background-color: #43467f;
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

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #FFFFFF;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #FFFFFF;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #FFFFFF;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #FFFFFF;
  }

  &__add-on {
    color: #FFFFFF;
    opacity: 1;

    &--before {
      height: 1.8rem;
      display: flex;
      align-items: center;
    }

    .focused & {
      color: #637381;
    }
  }

  &--search {
    -webkit-appearance: none;
    background-color: transparent;
    transition: transform 200ms ease, opacity 200ms ease, -webkit-transform 200ms ease;
  }

  .focused & {
    background-color: #f9fafb;
    color: #637381;
    box-shadow: none;
    transition: background-color 200ms ease, border-color 200ms ease;

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #637381;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #637381;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #637381;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #637381;
    }
  }
}

.search-input-field {
  color: #FFFFFF;
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
    color: #212b35;
  }
}

.search-icon {
  position: relative;
  width: 20px;
  height: 20px;
  top: -1px;
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  align-self: center;
  white-space: nowrap;
}
</style>
