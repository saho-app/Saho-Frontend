<script lang="ts">
	import { type Selected } from 'bits-ui';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../users/$types';
	import { Edit, Plus, Trash } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
	export let form: ActionData;
	export let selected: Selected<any>;
</script>

<Select.Root bind:selected>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select an owner" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Users</Select.Label>
			{#each data.users as user}
				<Select.Item value={user.id} label={user.nickname}>
					{user.nickname}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="OwnerID" required />
</Select.Root>
<form
	class="container justify-items-center place-items-center"
	action="?/createSong"
	method="POST"
	use:enhance
>
	<input type="hidden" name="OwnerId" value={selected?.value ?? -1} />
	<Input class="max-w-xs inline-flex" type="text" name="Title" placeholder="Title" required />

	<Button formaction="?/createPlaylist" class="px-3.5 bg-blue-500 hover:bg-blue-400" type="submit"
		><Plus class="h-4 w-4" /></Button
	>
	{#if form?.missing}
		<p class="text-red-500 text-md font-bold">This field is required</p>
	{/if}
</form>

<aside>
	{#each data.playlists as { id, title }}
		<h4 class="text-indigo-400 font-bold">{title}</h4>

		<div class="container self-end justify-items-around">
			<a href="/playlists/{id}/edit" class="inline-flex"><Edit class="h-4 w-4" /></a>
			<form method="POST" class="inline-flex" action="?/deletePlaylist" use:enhance>
				<input type="hidden" name="id" value={id} />
				<Button formaction="?/deletePlaylist" type="submit" class="px-3.5">
					<Trash class="h-4 w-4" />
				</Button>
			</form>
		</div>
	{/each}
</aside>
