<template>
  <figure @click="$emit('click', $event)" class="omg-img">
    <img v-if="!done" :src="previewImgPath" :alt="alt" class="preview" />
    <img v-if="started" 
           class="omg-full" 
           :src="fullImgPath" 
           crossorigin="anonymous"
           :class="{ 'omg-preload': !done && !loaded, 'complete': done, 'loaded': loaded }"
           :alt="done ? alt : ''"
           @transitionend="imgDone()"
           @load="imgLoaded()"
           @error="imgError()"
      />
  </figure>
</template>

<script>
import axios from 'axios'

export default {
  props: ['src', 'alt'],
  data() {
    return {
      started: false,
      loaded: false,
      done: false,
      observer: null
    }
  },
  computed: {
    previewImgPath() {
      const src = this.src;
      const url = src.substring(src.indexOf('.com/')+5, src.length - 1);
      return require(`~/assets/generated/${url}.svg`);
    },
    fullImgPath() {
      return this.src + '-/scale_crop/440x272/-/enhance/50/';
    }
  },
  mounted() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0];
        if (image.isIntersecting) {
          this.observer.disconnect();
          setTimeout(() => {
            this.started = true;
          }, 50);
        }
      }, {});
      this.observer.observe(this.$el);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    imgLoaded() {
      setTimeout(() => {
        this.loaded = true;
      }, 50)
    },
    imgDone() {
      // console.log('transition end?')
      setTimeout(() => {
        this.done = true;
      }, 2000)
    },
    imgError() {
      this.started = false;
      this.loaded = false;
      this.done = false;
    }
  }
};
</script>

<style lang="sass">
.omg-preload
  position: absolute
  opacity: 0
.omg-img
  position: relative
  display: block
  overflow: hidden
  width: 100%
  border-radius: 6px 6px 0 0
  img
    width: 100%
    height: auto
    border: 0
    display: block
    &.omg-full
      will-change: opacity
      opacity: 0
      transition: opacity .95s ease-in-out
      &.loaded
        position: absolute
        top: 0
        left: 0
        opacity: 1
      &.complete
        position: relative
</style>