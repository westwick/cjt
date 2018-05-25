<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <div class="logo">CJT</div>
          <nav>
            <nuxt-link to="/tours">Tours</nuxt-link>
            <a href="#">Specials</a>
            <a href="#">Group Events</a>
            <a href="#">More Info</a>
          </nav>
        </div>
        <div class="header-right">
          <div class="contact">
            <a href="tel:1-805-564-1819"><span class="icon-phone"></span> (805) 564-1819</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
};
</script>

<style lang="sass">
  header
    background: #0D1521
    height: 80px
    line-height: 80px
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 99
    .header
      display: flex
      justify-content: space-between
      .header-left
        display: flex
      .header-right
        a
          color: #c8c8c8
          font-size: 14px
          span
            position: relative
            top: 2px
            font-size: 16px
            margin-right: 8px
    .logo
      margin-right: 120px
      display: inline-block
      color: #f44444
    nav 
      display: flex
      a
        padding: 0 32px
        color: #c8c8c8
        text-transform: uppercase
        font-weight: bold
        font-size: 14px
        &:hover
          color: #f44444
</style>