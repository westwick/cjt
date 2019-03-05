<template>
  <figure @click="$emit('click', $event)" class="omg-img">
    <img v-if="!done" :src="previewImgPath" :alt="alt" class="preview" />
    <transition name="reveal" v-on:after-enter="imgDone()">
      <img v-if="loaded" class="loaded" :class="{ 'complete': done }" :src="fullImgPath" :alt="alt" crossorigin="anonymous" />
    </transition>
  </figure>
</template>

<script>
import axios from 'axios'

export default {
  props: ['src', 'alt'],
  data() {
    return {
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
          this.loadImage();
        }
      }, {});
      this.observer.observe(this.$el);
    }
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    loadImage() {
      this.loaded = true;
      // const img = new Image();
      // img.onload = () => this.loaded = true;
      // img.src = this.fullImgPath;
    },
    imgDone() {
      this.done = true;
    }
  }
};
</script>

<style lang="sass">
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
    filter: blur(2vw)
    transform: scale(1.01)
  img.loaded
    position: absolute
    top: 0
    left: 0
    will-change: transform, opacity
  img.loaded.complete
    position: relative

.reveal-enter-active
  animation: reveal .67s

@keyframes reveal
  0%
    transform: scale(1.01)
    opacity: 0
  100%
    transform: scale(1)
    opacity: 1
</style>