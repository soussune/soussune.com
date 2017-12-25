<template>
  <section class="page-container">
    <div>
      <h2 class="home-slogan">
        <nuxt-link to="/actors">
          actors
        </nuxt-link>
      </h2>
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
</script>
<style lang="scss" scoped>
.page-container
{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home-slogan
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.home-links
{
  padding-top: 15px;
}
</style>
