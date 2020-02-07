<template>
  <article class="article">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-8-desktop">
          <div class="blog-post">
            <h1 class="guides-header">Our Guides</h1>
            <div class="guide">
              <div class="guide-img">
                <img src="~/assets/images/guides/meredith.png" />
              </div>
              <div class="guide-details">
                <h2>Meredith Brace</h2>
                <p class="guide-title">Director of Adventures</p>
                <p class="guide-about">Meredith has been guiding for five years in her hometown of Santa Barbara.
  When not touring, she loves riding her electric bike and hiking the local
  mountains.</p>
              </div>
            </div>
            <div class="guide">
              <div class="guide-img">
                <img src="~/assets/images/guides/tanya.png" />
              </div>
              <div class="guide-details">
                <h2>Tanya Higginson</h2>
                <p class="guide-title">Adventure Designer</p>
                <p class="guide-about">Tanya has been guiding people around the beautiful town of Santa Barbara for
  the past four years. When not on a tour she can be found tango dancing or
  horsing around.</p>
              </div>
            </div>
            <div class="guide">
              <div class="guide-img">
                <img src="~/assets/images/guides/ayla.png" />
              </div>
              <div class="guide-details">
                <h2>Ayla Armstrong</h2>
                <p class="guide-title">Adventure Guide</p>
                <p class="guide-about">Ayla loves to give tours when she is not working as a teaching assistant at a local
  private school.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="sass">
  @import "~bulma/sass/utilities/_all.sass"

  h1.guides-header
    text-align: center
    margin-bottom: 16px
  .guide
    background: #f8f8f8
    border-radius: 4px
    padding: 16px
    margin-bottom: 16px
    display: flex
    flex-direction: column
    text-align: center
    margin-left: 16px
    margin-right: 16px
    +tablet
      flex-direction: row
      text-align: left
    +desktop
      margin-left: 0
      margin-right: 0
    &:last-child
      margin-bottom: 0
    .guide-img
      min-width: 200px
      max-width: 200px
      margin: 0 auto
      +tablet
        margin: 0 16px 0 0
    .guide-title
      color: #8a8a8a
      font-size: 18px
    .guide-about
      font-size: 15px
</style>
