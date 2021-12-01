<script>
  import Nav from "./nav.svelte";
</script>

<header>
  <Nav></Nav>
  <h1><a href="/">Other Supply</a></h1>
</header>

<style>	

  header {
    grid-area: header;
  }

  h1 {
    color: var(--colors-black);
    letter-spacing: -1.5px;
    text-align: center;
  }
</style>