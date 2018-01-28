<template>
  <section class="page-container">
    <div>
      <h1 class="title">
        出演者
      </h1>
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
</script>
<style lang="scss" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  color: $clr-white;
  text-align: center;
  margin-top: 3rem;
}
</style>
