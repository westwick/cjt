<template>
  <section class="header-container">
    <header class="cjt">
      <div class="container">
        <div class="header">
          <div class="header-left">
            <div class="logo">
              <nuxt-link to="/" class="logo-small"><img src="~/assets/images/cjface.png" @click="closeMenu()" alt="Captain Jack's Logo" /></nuxt-link>
              <nuxt-link to="/" class="logo-big"><img src="~/assets/images/cjlogowhite.png" alt="Captain Jack's Tours" /></nuxt-link>
            </div>
            <nav>
              <nuxt-link to="/tours/">Tours</nuxt-link>
              <nuxt-link to="/boat-charters/">Boat&nbsp;Charters</nuxt-link>
              <nuxt-link to="/group-events/">Group&nbsp;Events</nuxt-link>
              <nuxt-link to="/specials/">Specials</nuxt-link>
              <nuxt-link to="/guides/">Guides</nuxt-link>
            </nav>
          </div>
          <div class="header-logo-text">
            <img src="~/assets/images/cjtlogotextonly.png" alt="Captain Jack's Tours Logo" />
          </div>
          <div class="header-right">
            <div class="mobile-menu">
              <button class="hamburger hamburger--elastic" :class="{'is-active': isActive}" @click="toggleMenu()" aria-label="Menu Button">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div class="contact">
              <a href="tel:1-805-564-1819"><span class="icon-phone"></span> (805) 564-1819</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="subheader" :class="{'is-active': isActive}">
      <div class="mobile-menu-expanded" @click="closeMenu()">
        <nuxt-link to="/tours/">Tours</nuxt-link>
        <nuxt-link to="/boat-charters/">Boat Charters</nuxt-link>
        <nuxt-link to="/group-events/">Group Events</nuxt-link>
        <nuxt-link to="/specials/">Specials</nuxt-link>
        <nuxt-link to="/guides/">Guides</nuxt-link>
      </div>
      <p>Call us <a href="tel:1-805-564-1819"><span class="icon-phone"></span> (805) 564-1819</a></p>
    </div>
    <div class="covid-banner">
      COVID-19 Update: Only custom tours available during this time on a first come first served basis. Please call us for details.
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive
    },
    closeMenu() {
      this.isActive = false
    }
  }
};
</script>

<style scoped lang="sass">

</style>