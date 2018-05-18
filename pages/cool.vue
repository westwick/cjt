<template>
  <section class="container">
    <h1>cool</h1>
    <p>{{ title }}</p>
  </section>
</template>

<script>
export default {
  async asyncData({ params }) {
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let post = await import('~/content/pages/cool.json');
    return post;
  }
};
</script>