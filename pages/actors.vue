<template>
  <section class="page-container">
    <h1 class="title">
      <nuxt-link to="/actors" aria-label="actors">
        出演者
      </nuxt-link>
    </h1>
    <nuxt-child/>
  </section>
</template>

<script>
</script>
<style lang="scss" scoped>
@import '~assets/css/_vars.scss';

.page-container {
  text-align: center;
  width: 100%;
}

.title {
  color: $clr-white;
  text-align: center;
  margin-top: 3rem;

  a {
    $line-color: $clr-white-ll;
    @import '~assets/css/_hoverline.scss';
    color: $clr-white-ll;
    text-decoration: none;
  }
}
</style>
