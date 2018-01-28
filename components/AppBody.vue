<template>
  <section class="body">
    <div class="before"></div>
    <div class="after"></div>
    <div class="main">
      <nuxt :key="$route.path" />
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

.body {
  background: $clr-white;
  display: grid;
  grid-template-areas: 'before before before' 'left main right' 'after after after';
  grid-template-columns: 1fr minmax(200px, 960px) 1fr;

  $roundHeight: 40px;
  $roundPadding: 200px;

  .before,
  .after {
    content: '';
    height: $roundHeight;
    display: block;
    background-image: url(~/assets/svg/round-edge.svg);
    background-color: $clr-main;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% $roundHeight;
    width: 100%;
    padding-top: $roundPadding;

    @include mq() {
      // background-image: none;
    }
  }
  .before {
    grid-area: before;
  }
  .after {
    grid-area: after;
    transform: rotate(180deg);
  }
  .main {
    grid-area: main;

    min-height: 100vh;

    width: 100%;
    padding: 3.8rem 16px 0;
    margin: -$roundPadding 0;
    z-index: 0;

    @include mq() {
      padding: 3.8rem 0 0;
    }
  }
}
</style>
