<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label';
	import { LucideEdit } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	export let data: PageData;
	let avatarURL: string;

	onMount(() => {
		const byteCharacters = atob(data.blob.data);

		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		const blob = new Blob([byteArray], { type: data.blob.mime });
		avatarURL = URL.createObjectURL(blob);
	});
</script>

<div class="space-x-20">
	<div class="flex row items-start h-80 space-x-5 border-b-2">
		<div class="relative mr-60 mt-10">
			<Avatar.Root class="h-60 w-60 absolute inset-0 border-4 border-pink-600">
				<Avatar.Image class="" src={avatarURL}></Avatar.Image>
				<Avatar.Fallback class="">Loading ...</Avatar.Fallback>
			</Avatar.Root>
			<Button
				variant="outline"
				class="bg-gray-20 absolute inset-0 opacity-0 rounded-full h-60 w-60 hover:opacity-100 border-4 border-pink-600 hover:bg-opacity-90 hover:bg-gray-200"
			>
				<LucideEdit class="size-5" />
			</Button>
		</div>
		<Label class="text-8xl self-center">{data.user?.Nickname}</Label>
	</div>

	<div class="">
		{#if !data.user.IsArtist}
			<h3>You are not artist. Want to change it ? Click the button</h3>
			<form method="POST" action="?/becomeArtist">
				<Button type="submit" class="bg-pink-600">Become an artist!</Button>
			</form>
		{/if}
	</div>
</div>
