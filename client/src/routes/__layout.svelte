<script>
	import Header from './../lib/header.svelte';

	import { ApolloClient, InMemoryCache } from '@apollo/client/core';

	import { setClient } from 'svelte-apollo';

	export const client = new ApolloClient({
		uri: 'http://localhost:3001/graphql',
		cache: new InMemoryCache()
	});

	setClient(client);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		type="text/css"
		href="https://cloud.typography.com/6637836/7151992/css/fonts.css"
	/>
</svelte:head>

<main>
	<Header />
	<slot />
</main>

<style>
	@import './../css/global.css';
</style>
