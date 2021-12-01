<script>
  export let record;
</script>

<style>
  article {
    background: var(--colors-light-gray);
    border-radius: 2px;
    scroll-snap-align: start;
    position: relative;
    width: var(--grid-item-width);
    min-width: var(--grid-item-min-width);
    max-width: var(--grid-item-max-width);
    height: calc(var(--grid-item-width) / 2.66666667);
    min-height: calc(var(--grid-item-min-width) / 2.66666667);
    max-height: calc(var(--grid-item-max-width) / 2.66666667);
  }
  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
  }
  .cover {
    flex: .75;
    background-image: linear-gradient(-45deg, var(--colors-green), var(--colors-light-gray));
    background-size: contain;
    background-position: center;
  }
  .info {
    position: relative;
    flex: 1.25;
    align-items: flex-end;
    display: flex;
  }
  p {
    margin: .5rem;
    font-size: .9375rem;
  }
  span.flair {
    position: absolute;
    text-transform: lowercase;
    top: 8px;
    right: -4px;
    background: var(--colors-mint);
    color: white;
    font-size: .875rem;
    padding: .25rem .325rem;
    border-radius: 2px;
    font-weight: 600;
  }
</style>

<article>
  <a rel="external" target="_blank" href="http://reddit.com{record.link}">
    {#if record.thumbnail}
      <div class="cover" style="background-image: url({record.thumbnail})"></div>
      {:else}
      <div class="cover"></div>
    {/if}
    <div class="info">
      <span class="flair">{ record.flair }</span>
      <p>
        { record.title }
      </p>
    </div>
  </a>
</article>