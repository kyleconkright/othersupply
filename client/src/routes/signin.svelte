<script>
import { onMount } from 'svelte';

  import { records as apiRecords } from '$lib/api/records';

  let records = [];

  onMount(async () => {
    records = await apiRecords();
  }) 
</script>
<!-- 
<form on:submit|preventDefault="{submit}">
  <input type="text" placeholder="hello">
</form> -->

{#each records as record}
 {record.title}
{/each}