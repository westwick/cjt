<template>
  <figure @click="$emit('click', $event)" class="omg-img">
    <img v-if="!done" :src="previewImgPath" :alt="alt" class="preview" />
    <img v-if="started" 
           class="omg-preload" 
           :src="fullImgPath" 
           crossorigin="anonymous"
           @load="imgLoaded()"
           @error="imgError()"
      />
    <transition name="reveal" v-on:after-enter="imgDone()">
      <img v-if="loaded" class="loaded" :class="{ 'complete': done }" :src="fullImgPath" :alt="done ? alt : ''" crossorigin="anonymous" @error="imgError()" />
    </transition>
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
          this.started = true;
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
      this.loaded = true;
    },
    imgDone() {
      this.done = true;
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
  img.preview
    // filter: blur(10px)
    // transform: scale(1.01)
  img.loaded
    position: absolute
    top: 0
    left: 0
    will-change: opacity
  img.loaded.complete
    position: relative
</style>