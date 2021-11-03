<svelte:head>
  <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/6637836/7151992/css/fonts.css" />
</svelte:head>

<script>
  import Nav from "./../components/nav.svelte";
</script>

<style>
  @import './../css/global.css';
</style>

<main>
  <Nav />
  <slot></slot>
</main>

