<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { CheckCircle2, CircleEllipsis, Edit, Heart, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import * as Table from '../table';
	import type { Song, User } from '$lib';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let user: User | undefined;

	export let song: Song;

	let loading = false;
	let opened = false;

	let selected = false;

	const onDialogClose: SubmitFunction = () => {
		loading = true;
		return async ({ result, update, action }) => {
			switch (result.type) {
				case 'success':
					opened = false;
					toast.success(
						`Successfully ${action.search.includes('edit') ? 'edited' : 'deleted'} song`
					);
				default:
					await update();
			}
			loading = false;
		};
	};

	const onButtonClicked: SubmitFunction = () => {
		loading = true;
		return async ({ result, action, update }) => {
			switch (result.type) {
				case 'success':
					let word = action.search.includes('delete')
						? 'deleted'
						: action.search.includes('unlike')
							? 'unliked'
							: 'liked';

					toast.success(`Successfully ${word} song`);
					if (word.includes('liked')) {
						song.isLiked = !song.isLiked;
					}
					await update();
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<Table.Row>
	<!-- <div
		class="absolute inset-0 w-full"
		on:mouseenter={() => {
			selected = true;
		}}
		on:mouseleave={() => {
			selected = false;
		}}
	></div> -->
	<Table.Cell class="py-1 px-0"
		><div>
			<h1 class="text-base">{song.title}</h1>
			<h3 class="text-xs">{song.artistNickname}</h3>
		</div></Table.Cell
	>
	<Table.Cell class="py-1 px-0 text-center">Time here</Table.Cell>
	<Table.Cell class="py-1 px-0">
		<form method="POST" action="?/{song.isLiked ? 'un' : ''}likeSong" use:enhance={onButtonClicked}>
			<input hidden name="Id" bind:value={song.id} />
			<Button
				type="submit"
				class="py-0 px-0 rounded-full border-transparent h-8 w-8 hover:bg-gray-200 hover:border-gray-400 bg-transparent border"
			>
				{#if song.isLiked}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-heart-off"
						><line x1="2" y1="2" x2="22" y2="22" /><path
							d="M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"
						/><path
							d="M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"
						/></svg
					>
				{:else}
					<Heart color="black" />
				{/if}
			</Button>
		</form>
	</Table.Cell>
	<Table.Cell class="py-1 px-0">
		<Dialog.Root bind:open={opened}>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Edit song</Dialog.Title>
					<Dialog.Description>Make changes to your song</Dialog.Description>
				</Dialog.Header>
				<form class="space-y-2" method="POST" action="?/update" use:enhance={onDialogClose}>
					<input hidden name="Id" bind:value={song.id} />
					<div class="container content-between items-center justify-items-start">
						<Label class="text-base px-3.5">Title</Label>
						<Input
							name="Title"
							class="text-md max-w-sm align-center justify-items-start"
							value={song.title}
						/>
					</div>
					<div class="container inline-flex items-center">
						<Label class="px-3.5 text-base">Is private</Label>
						<Switch checked={song.isPrivate} disabled={!user?.IsArtist} />
						<input hidden name="IsPrivate" bind:value={song.isPrivate} />
					</div>
					<Dialog.Footer>
						<Button
							class="px-3.5 bg-green-500 hover:bg-green-400"
							disabled={loading}
							type="submit"
							formaction="?/editSong"
						>
							<CheckCircle2 class="" />
						</Button>
						<Button formaction="?/deleteSong" type="submit" disabled={loading} class="px-3.5">
							<Trash class="" />
						</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button
					class="rounded-full h-8 w-8 px-0 py-0 bg-transparent border border-transparent hover:bg-gray-200 hover:border-gray-400"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-ellipsis"
						><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
							cx="5"
							cy="12"
							r="1"
						/></svg
					></Button
				>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item class="p-0 lg:h-[36px]">
					<Button
						class="h-full w-full px-0 py-0 mx-0 my-0 bg-transparent border-none hover:bg-transparent justify-start"
						on:click={() => {
							opened = true;
						}}
					>
						<Edit color="black" size="18" class="mx-2" />
						<h4 style="color: black;">Edit</h4>
					</Button>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="p-0 lg:h-[36px]">
					<form
						method="POST"
						action="?/{song.isLiked ? 'un' : ''}likeSong"
						use:enhance={onButtonClicked}
						class="h-full w-full items-center"
					>
						<input hidden name="Id" value={song.id} />
						<Button
							type="submit"
							class="h-full w-full px-0 py-0 mx-0 my-0 bg-transparent border-none hover:bg-transparent justify-start"
						>
							{#if song.isLiked}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="black"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-heart-off mx-2"
									><line x1="2" y1="2" x2="22" y2="22" /><path
										d="M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35"
									/><path
										d="M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"
									/></svg
								>
							{:else}
								<Heart color="black" size="18" class="mx-2" />
							{/if}
							<h4 style="color: black;">{song.isLiked ? 'Unl' : 'L'}ike</h4>
						</Button>
					</form>
				</DropdownMenu.Item>
				<DropdownMenu.Item class="p-0 lg:h-[36px]">
					<form
						method="POST"
						action="?/deleteSong"
						use:enhance={onButtonClicked}
						class="h-full w-full items-center"
					>
						<input hidden name="Id" value={song.id} />
						<Button
							type="submit"
							class="h-full w-full px-0 py-0 mx-0 my-0 bg-transparent border-none hover:bg-transparent justify-start"
						>
							<Trash color="red" size="18" class="mx-2" />
							<h4 style="color: black;">Remove</h4>
						</Button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Table.Cell>
</Table.Row>
