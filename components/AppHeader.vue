<template>
  <header role="banner" class="header">
    <div class="top-bar">
      <div class="top-bar__branding">
        <nuxt-link exact to="/">
          <svg class="soussune__logo" width="200" height="24.1" x="0px" y="0px" viewBox="0 0 400 48.2" style="enable-background:new 0 0 400 48.2;">
            <style type="text/css">
              .st0{enable-background:new;}
              .st1{fill:#EDE18D;}
              .st2{fill:#F3C08A;}
              .st3{fill:#F3ADAD;}
              .st4{fill:#D9B4E5;}
              .st5{fill:#AEC2F4;}
              .st6{fill:#B6E6F2;}
              .st7{fill:#AED9BB;}
              .st8{fill:#C9DB89;}
            </style>
            <g class="st0">
              <path class="st1" d="M7.5,46c-3.7-1.4-6.3-3.8-6.3-7.6c0-0.7,0.1-1.5,0.3-2.3c0.9-3.2,4-5.2,9-5.6c3-0.2,4.7,0.2,4.7-1.3
                c0-2.8-7.7-0.8-11.8-5.7C1.1,20.9,0,18,0,15.1C0,11.7,1.5,8.4,4,6c3.4-3.4,9-5.5,17.8-5.5c8.9,0.1,15,2.1,18.8,5.2
                c2.3,2,3.3,4.4,3.3,6.5c0,0.5,0,1.1-0.1,1.5c-0.6,2.8-2.4,4.9-7.3,4.9c-1.1,0-2.2-0.2-3.2-0.2c-1.2,0-1.9,0.2-1.9,1.4
                c0,2.6,5,2.1,9.5,6.4c2.3,2.2,3.4,5.3,3.4,8.4c0,2.8-0.8,5.5-2.5,7.6c-3.1,3.9-7.3,5.3-14.1,5.8c-1.9,0.2-3.8,0.2-5.7,0.2
                C16.8,48.2,12,47.6,7.5,46z"/>
            </g>
            <g class="st0">
              <path class="st2" d="M48.2,25.7c0-13,5.4-25.3,23.4-25.3c17.5,0,23.1,13.5,23.1,26.3c0,15.1-10.4,20.2-23.1,20.2
                C58.7,46.9,48.2,41.6,48.2,25.7z M79.5,24.6c0-4.4-3.7-8.1-8.1-8.1c-4.5,0-8.2,3.7-8.2,8.1c0,4.5,3.7,8.2,8.2,8.2
                C75.8,32.9,79.5,29.2,79.5,24.6z"/>
            </g>
            <g class="st0">
              <path class="st3" d="M104.1,37.7c-3.3-4.8-4.4-10-4.4-15.1c0-4.8,0.9-9.3,2.2-13.4c1.4-4.7,5-6.8,8.9-6.8c2.9,0,7,1.5,7.9,4.8
                c0.3,1.1,0.4,2,0.4,2.9c0,1.6-0.3,2.9-0.3,4.1c0,1.2,0.2,2.2,1.3,3.5c0.9,1.1,2.2,1.6,3.5,1.6c1.5,0,2.9-0.6,3.9-1.9
                c2.2-2.8,1.1-5.9,1.9-8.2c1.5-4.8,4.8-5.7,7.3-5.7c5.2,0,7.5,2.8,8.5,5.3c1.2,2.9,1.7,6.5,1.7,10.4c0,7.1-1.7,14.7-3.8,18.6
                c-3.8,7-11.5,9.1-18.9,9.1C114.3,46.7,108.4,44,104.1,37.7z"/>
            </g>
            <g class="st0">
              <path class="st4" d="M159.3,46c-3.7-1.4-6.3-3.8-6.3-7.6c0-0.7,0.1-1.5,0.3-2.3c0.9-3.2,4-5.2,9-5.6c3-0.2,4.7,0.2,4.7-1.3
                c0-2.8-7.7-0.8-11.8-5.7c-2.2-2.5-3.3-5.5-3.3-8.4c0-3.4,1.5-6.7,4-9.1c3.4-3.4,9-5.5,17.8-5.5c8.9,0.1,15,2.1,18.8,5.2
                c2.3,2,3.3,4.4,3.3,6.5c0,0.5,0,1.1-0.1,1.5c-0.6,2.8-2.4,4.9-7.3,4.9c-1.1,0-2.2-0.2-3.2-0.2c-1.2,0-1.9,0.2-1.9,1.4
                c0,2.6,5,2.1,9.5,6.4c2.3,2.2,3.4,5.3,3.4,8.4c0,2.8-0.8,5.5-2.5,7.6c-3.1,3.9-7.3,5.3-14.1,5.8c-1.9,0.2-3.8,0.2-5.7,0.2
                C168.6,48.2,163.7,47.6,159.3,46z"/>
            </g>
            <g class="st0">
              <path class="st5" d="M207.5,46c-3.7-1.4-6.3-3.8-6.3-7.6c0-0.7,0.1-1.5,0.3-2.3c0.9-3.2,4-5.2,9-5.6c3-0.2,4.7,0.2,4.7-1.3
                c0-2.8-7.7-0.8-11.8-5.7c-2.2-2.5-3.3-5.5-3.3-8.4c0-3.4,1.5-6.7,4-9.1c3.4-3.4,9-5.5,17.8-5.5c8.9,0.1,15,2.1,18.8,5.2
                c2.3,2,3.3,4.4,3.3,6.5c0,0.5,0,1.1-0.1,1.5c-0.6,2.8-2.4,4.9-7.3,4.9c-1.1,0-2.2-0.2-3.2-0.2c-1.2,0-1.9,0.2-1.9,1.4
                c0,2.6,5,2.1,9.5,6.4c2.3,2.2,3.4,5.3,3.4,8.4c0,2.8-0.8,5.5-2.5,7.6c-3.1,3.9-7.3,5.3-14.1,5.8c-1.9,0.2-3.8,0.2-5.7,0.2
                C216.8,48.2,211.9,47.6,207.5,46z"/>
            </g>
            <g class="st0">
              <path class="st6" d="M253.6,37.7c-3.3-4.8-4.4-10-4.4-15.1c0-4.8,0.9-9.3,2.2-13.4c1.4-4.7,5-6.8,8.9-6.8c2.9,0,7,1.5,7.9,4.8
                c0.3,1.1,0.4,2,0.4,2.9c0,1.6-0.3,2.9-0.3,4.1c0,1.2,0.2,2.2,1.3,3.5c0.9,1.1,2.2,1.6,3.5,1.6c1.5,0,2.9-0.6,3.9-1.9
                c2.2-2.8,1.1-5.9,1.9-8.2c1.5-4.8,4.8-5.7,7.3-5.7c5.2,0,7.5,2.8,8.5,5.3c1.2,2.9,1.7,6.5,1.7,10.4c0,7.1-1.7,14.7-3.8,18.6
                c-3.8,7-11.5,9.1-18.9,9.1C263.8,46.7,258,44,253.6,37.7z"/>
            </g>
            <g class="st0">
              <path class="st7" d="M331.5,44c-1.1-1.7-1.6-5.8-4.8-5.8c-3.4,0-3.1,3.1-4.2,4.9c-1.7,2.2-4.3,3.6-7.6,3.6c-0.9,0-2-0.1-3.2-0.4
                c-4.1-1.2-6.4-3.8-8-8.2c-1.3-3.5-2-10.5-2-17c0-4.7,0.4-9.3,1.3-12.4c1.3-5.1,5.1-7.3,9.6-7.3c4.9,0,8,3.1,8.7,7.5
                c2.8-3.8,7.6-5.6,12.3-5.6c1.3,0,2.4,0.1,3.6,0.3c6.5,1.3,9.3,6.5,10.7,10.4c1.2,3.6,1.7,7,1.7,10.1c0,4.7-1.1,8.8-2.1,12.5
                c-1.2,4.2-2.9,8.5-7.5,9.9c-0.8,0.2-1.7,0.3-2.4,0.3C334.7,46.7,332.4,45.5,331.5,44z"/>
            </g>
            <g class="st0">
              <path class="st8" d="M373.5,47.7c-5.2-0.7-11.1-2.4-15.5-8.5c-3.2-4.4-4.8-10.3-4.8-15.7c0-2.7,0.4-5.4,1.2-7.8
                C358.1,4.7,366,0,376.8,0c8.8,0,14.5,3.7,18.5,8.5c3.2,3.8,4.7,9.3,4.7,13.9c0,3.7-1,7-2.8,8.4c-2.4,1.9-6.6,1.9-7.6,1.9
                c4.4,0.5,6.7,2.4,6.7,6.4c0,0.5,0,1-0.1,1.5c-0.7,5.7-7.2,7.6-14.8,7.6C378.7,48.2,376.2,48,373.5,47.7z M386.7,18.8
                c0-3.4-3.9-6.2-8.8-6.2c-4.9,0-8.8,2.7-8.8,6.2c0,3.5,3.9,6.3,8.8,6.3C382.7,25.1,386.7,22.4,386.7,18.8z"/>
            </g>
          </svg>
        </nuxt-link>
      </div>
      <div class="top-bar__search">
        <section class="top-bar-search">
          <div class="top-bar-search__input-wrapper">
            <div class="search-input-wrapper">
              <div class="search-input">
                <span class="search-input__add-on search-input__add-on--before">
                  <svg class="search-icon search-icon--size-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  name=""
                  placeholder="検索"
                  class="search-input"
                  :value="$store.state.searchText"
                  v-ime-input="searchText"
                >
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="top-bar__list">
        <div class="top-bar__item top-bar__item--separated">
          <nuxt-link to="/episode">
            Episode
          </nuxt-link>
        </div>
        <div class="top-bar__item top-bar__item--separated">
          <nuxt-link to="/actors">
            Actors
          </nuxt-link>
        </div>
        <div class="top-bar__item top-bar__item--separated">
          <a href="https://medium.com/soussune" target="_blank">
            Blog
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" src="./AppHeader.ts">
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
    color: #ffffff;
    box-sizing: border-box;
    text-align: center;
    min-width: 6rem;

    a {
      text-decoration: none;
    }
  }
}

.search-input {
  color: #FFFFFF;
  background: #43467f;
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

  $placeholder-color: rgba(255, 255, 255, 0.4);
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: $placeholder-color;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: $placeholder-color;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: $placeholder-color;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: $placeholder-color;
  }

  &__add-on {
    color: #FFFFFF;
    opacity: 1;

    &--before {
      padding-right: 4px;
      height: 1.8rem;
      display: flex;
      align-items: center;
    }
  }

  &--search {
    -webkit-appearance: none;
    background-color: transparent;
    transition: transform 200ms ease, opacity 200ms ease, -webkit-transform 200ms ease;
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
