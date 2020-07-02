<style lang="scss" scope>
  @import './styles/post.module.scss';
</style>

<script>
import {Post} from '../util';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}

console.log(Post.getPosts())
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Hello mf world!!!!
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    
  </div>
</template>

