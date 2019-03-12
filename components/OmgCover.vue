<template>
  <div class="omg-cover-img" :style="previewBackgroundStyle">
    <img v-if="started" 
           class="omg-preload" 
           :class="{ 'omg-cover-loaded': loaded}" 
           :src="fullImgPath" 
           alt="cover photo"
           crossorigin="anonymous"
           @load="imgLoaded()"
           @error="imgError()"
    />
    <div class="omg-content"><slot></slot></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['preview', 'full'],
  data() {
    return {
      started: false,
      loaded: false,
      done: false,
    }
  },
  computed: {
    previewImgPath() {
      return this.preview
    },
    previewBackgroundStyle() {
      return {
        backgroundImage: `url(${this.previewImgPath})`,
      }
    },
    fullImgPath() {
      return this.full
    }
  },
  mounted() {
    setTimeout(() => {
      this.started = true;
    }, 200);
  },
  methods: {
    imgLoaded() {
      this.$nextTick(() => {
        this.loaded = true;
      });
    },
    imgError() {
      this.loaded = false;
      this.done = false;
    }
  }
};
</script>

<style lang="sass">
.omg-preload
  opacity: 0
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  object-fit: cover
  object-position: center
  z-index: 2
  will-change: opacity
  transition: opacity 1.67s ease-in-out
  &.omg-cover-loaded
    opacity: 1
.omg-cover-img
  position: relative
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  &:after
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: linear-gradient(to bottom, rgba(20, 20, 21, 0.59), rgba(20, 20, 19, 0.63))
    z-index: 3

.omg-content, .omg-content *
  z-index: 4
</style>