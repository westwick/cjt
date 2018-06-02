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
  },
}
</script>

<style lang="sass">
  @import './icon.css'
  @import './hamburger.css'
</style>
