<template>
  <div class="container error-page">
    <div class="missing" v-if="error.statusCode === 404">404</div>
    <div class="missing" v-else>Error</div>
    <h1 >Arrrr, matey!</h1>
    <p v-if="error.statusCode === 404">We couldn't find the page you're looking for.</p>
    <p v-else>Something went wrong.</p>
    <p>Why not check out some of our <nuxt-link to="/tours/">fun Santa Barbara tours</nuxt-link> instead?</p>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>