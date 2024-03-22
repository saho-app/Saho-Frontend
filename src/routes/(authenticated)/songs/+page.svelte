<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Plus } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import SongEntry from '$lib/components/ui/SongEntry/SongEntry.svelte';
	import * as Table from '$lib/components/ui/table';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import PageTitle from '$lib/components/ui/PageTitle/PageTitle.svelte';

	export let data: PageData;

	export let form: ActionData;

	let loading = false;

	let checked = true;

	const onSongCreate: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					toast.error('There was an problem with creating song, check your input and try again');
					await update();
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<PageTitle title="Library"/>

{#if data.user.Nickname != ""}
	<form
		class="container justify-items-center place-items-center"
		action="?/createSong"
		method="POST"
		use:enhance={onSongCreate}
	>
		<Input class="max-w-xs" type="text" name="Title" placeholder="Title" required />
		<input hidden value={checked} name="IsPrivate" />
		<Checkbox
			class="inline-flex"
			{checked}
			disabled={!data.user.IsArtist}
		/>
		<Label>Is private ?</Label>

		<Button
			formaction="?/createSong"
			disabled={loading}
			class="px-3.5 bg-blue-500 hover:bg-blue-400"
			type="submit"><Plus class="h-4 w-4" /></Button
		>
	</form>

	<Table.Root class="w-[780px]">
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[600px] p-0">Title</Table.Head>
				<Table.Head class="w-[90px] justify-items-center items-center grid p-0"
					><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
						><path
							d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg></Table.Head
				>
				<Table.Head class="p-0" />
				<Table.Head class="p-0" />
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.songs as song}
				<SongEntry user={data.user} {song} />
			{/each}
		</Table.Body>
	</Table.Root>
{/if}
