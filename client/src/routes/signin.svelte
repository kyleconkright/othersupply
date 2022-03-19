<script lang="ts">
	import { onMount } from 'svelte';
	// import { records as apiRecords } from '$lib/api/records';
	import { signin } from '$lib/api/auth';

	let records = [];

  async function signIn(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    return await signin(data);
  }

</script>

<form on:submit|preventDefault={signIn}>
	<div>
		<label for="username">Username</label>
		<input type="text" id="username" name="username" value="" />
	</div>
	<div>
		<label for="password">Password</label>
		<input type="password" id="password" name="password" value="" />
	</div>
	<button type="submit">Submit</button>
</form>

<!-- {#each records as record}
	{record.title}
{/each} -->
