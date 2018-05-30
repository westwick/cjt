<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <div class="logo"><nuxt-link to="/"><img src="~/assets/cjlogowhite.png" /></nuxt-link></div>
          <nav>
            <nuxt-link to="/tours">Tours</nuxt-link>
            <a href="#">Specials</a>
            <a href="#">Group Events</a>
            <a href="#" class="more-info">More Info <i class="fas fa-sort-down"></i></a>
          </nav>
        </div>
        <div class="header-right">
          <div class="contact">
            <a href="tel:1-805-564-1819"><span class="icon-phone"></span> (805) 564-1819</a>
          </div>
        </div>
      </div>
      <div class="subheader">
        <p>Call us <a href="tel:1-805-564-1819"><span class="icon-phone"></span> (805) 564-1819</a></p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
};
</script>

<style>

</style>