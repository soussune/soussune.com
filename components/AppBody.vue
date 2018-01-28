<template>
  <section class="body">
    <div class="before"></div>
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
  grid-template-areas: 'before before before' 'left main right';
  grid-template-columns: 1fr minmax(200px, 960px) 1fr;

  $roundHeight: 40px;
  $roundPadding: 200px;

  .before {
    content: '';
    height: $roundHeight;
    display: block;
    background-image: url(~/assets/svg/round-edge.svg);
    background-color: $clr-bg;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100% $roundHeight;
    width: 100%;
    padding-top: $roundPadding;
  }
  .before {
    grid-area: before;
  }
  .main {
    grid-area: main;

    width: 100%;
    padding: 0 1rem;
    margin: -$roundPadding 0 4rem;
    z-index: 0;

    @include mq() {
      padding: 0 0.5rem;
    }
  }
}
</style>
