<template>
  <div id="shell">
    <app-header />
      <section id="main">
        <nuxt/>
      </section>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';
import AppFooter from '~/components/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="sass">
  @import '~/assets/styles/icon.css'
  @import '~/assets/styles/loading.css'
  @import '~/assets/styles/hamburger.css'
  @import '~/assets/styles/checkbox.css'
</style>
