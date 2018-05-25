<template>
  <div>
    <app-header />
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';

export default {
  components: {
    AppHeader
  },
}
</script>

<style lang="sass">
  @import './icon.css'
  a
    transition: all .3s ease-in-out
  body 
    font-family: 'Karla', sans-serif
    padding-top: 80px
    background: #f8f8f8
  button, .button, input 
    font-family: 'Karla', sans-serif 
  .button:focus:not(:active), .button.is-focused:not(:active)
    outline: 0
    box-shadow: none
  html
    font-size: 16px
    word-spacing: 1px
    -ms-text-size-adjust: 100%
    -webkit-text-size-adjust: 100%
    -moz-osx-font-smoothing: grayscale
    -webkit-font-smoothing: antialiased
    box-sizing: border-box

  *, *:before, *:after
    box-sizing: border-box
    margin: 0

  .card
    border: none
    border-radius: 5px
    box-shadow: 0 0 8px rgba(0,0,0,.1)
    
    .treasure
      position: absolute
      top: -16px
      left: -16px
      width: 64px
      height: 64px
      border-radius: 50%
      background: #FDC132
      border: 1px solid #fff
    .img-main
      width: 100%
      height: auto
      border-radius: 5px 5px 0 0
    .card-content
      padding: 16px
      display: flex
      align-items: center
      flex-direction: column
      justify-content: center
    h2
      width: 100%
      font-size: 20px
      font-weight: bold
    h3
      width: 100%
      color: darken(#eb2e19, 5%)
      font-weight: bold
      font-size: 14px
    p
      width: 100%
      margin-top: 16px
      font-size: 14px
    .button
      margin-top: 16px
</style>
