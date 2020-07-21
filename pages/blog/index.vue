<template>
  <section class="wrappa">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-8-desktop">
          <div class="blogs-container">
            <div v-for="blog in blogs" :key="blog.date" class="blog-post-link">
              <h2><router-link :to="blog._path">{{blog.title}}</router-link></h2>
              <p class="posted-on">Posted on {{ getDate(blog.date) }}</p>
              <p>{{ blog.body.substring(0,340) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as moment from 'moment-mini';

export default {
  methods: {
    getDate(date) {
      return moment(date).format('MMMM D, YYYY');
    }
  },
  asyncData() {
    // Using webpacks context to gather all files from a folder
    const blogsContext = require.context('~/content/blog/posts/', false, /\.json$/);

    const blogs = blogsContext.keys().map(key => ({
      ...blogsContext(key),
      _path: `/blog/${key.replace('.json', '').replace('./', '')}`
    }));

    blogs.sort((a, b) => {
      if (a.date < b.date)
        return 1;
      if (a.date > b.date)
        return -1;
      return 0;
    })

    return { blogs };
  }
};
</script>

<style lang="sass">
.wrappa
  padding-top: 1px
.blogs-container
  padding: 24px 16px 80px
.blog-post-link
  border-bottom: 1px solid #e8e8e8
  &:last-child
    border-bottom: none
  h2
    margin-top: 24px
    font-size: 32px
    a
      color: #311110
      &:hover
        text-decoration: underline
  .posted-on
    color: #9d9d9d
    margin-bottom: 24px
  p
    margin-bottom: 16px

</style>
