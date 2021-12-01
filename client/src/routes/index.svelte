<script>
	import { releases } from './../stores/otherstore';
	import FeedCard from './../lib/feedCard.svelte';
</script>

<svelte:head>
	<title>Other Supply</title>
</svelte:head>


  <section id="feed-content">
    <h2>r/VinylReleases/new</h2>
    <div class="feed-list">
      {#each $releases as record (record.id)}
      <FeedCard {record} />
      {/each}
    </div>
    <div class="feed-list">
      {#each $releases as record (record.id)}
      <FeedCard {record} />
      {/each}
    </div>
    <div class="feed-list">
      {#each $releases as record (record.id)}
      <FeedCard {record} />
      {/each}
    </div>
  </section>



<style>
  h2 {
		color: var(--colors-green);
    font-size: 1.25rem;
    margin: 0 0 .5rem;
	}
	
  section {
    grid-column: 1/3;
    overflow: auto;
	}
  
  div.feed-list {
    margin: 0 0 1rem;
    padding: 0 0 1rem;
    display: grid;
		grid-auto-flow: column;
		/* grid-template-columns: repeat(auto-fill, minmax(var(--grid-item-width), 1fr));;
    grid-auto-rows: minmax(min-content, max-content); */
		grid-gap: 2rem;
		overflow: auto;
		-ms-scroll-snap-type: x mandatory;
		scroll-snap-type: x mandatory;
  }

</style>
