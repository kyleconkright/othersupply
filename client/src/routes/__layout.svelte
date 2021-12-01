<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6637836/7151992/css/fonts.css" />
</svelte:head>

<script>
  import Header from "./../lib/header.svelte";
</script>

<style>
  @import './../css/global.css';
</style>

<main>
  <Header />
  <slot></slot>
</main>

