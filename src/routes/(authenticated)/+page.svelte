<script lang="ts">
	import PageTitle from '$lib/components/ui/PageTitle/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle />

{#if data.user.Nickname != ''}
	<h1 class="text-4xl text-indigo-800 fs-48 font-bold">Homepage of Saho App</h1>
{/if}
