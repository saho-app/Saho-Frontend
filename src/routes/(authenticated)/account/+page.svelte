<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label';
	import { CheckCircle2, LucideEdit, X } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import FileDrop from '$lib/components/ui/FileDrop/FileDrop.svelte';
	import { FileWrapper } from '$lib';
	import { enhance } from '$app/forms';
	import { type SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	let avatarURL: string;
	let isEditing = false;
	let avatarDialogOpened = false;

	let inputWrapper = new FileWrapper();

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

	const onAvatarUpload: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'error':
				case 'failure':
					toast.error('There was a problem with avatar uploading. Please try again');
					await update();
					break;
				case 'success':
					toast.success('Successfully changed avatar');
					if (inputWrapper.input && inputWrapper.input.files) {
						avatarURL = URL.createObjectURL(inputWrapper.input.files[0]);
					}
					avatarDialogOpened = false;	
					break;
				default:
					await update();
			}
		};
	};
</script>

<div class="space-x-20">
	<div class="flex row items-start h-80 space-x-5 border-b-2">
		<div class="relative mr-60 mt-10">
			<Dialog.Root bind:open={avatarDialogOpened}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Edit Avatar</Dialog.Title>
					</Dialog.Header>
					<form
						method="POST"
						enctype="multipart/form-data"
						action="?/uploadAvatar"
						use:enhance={onAvatarUpload}
					>
						<FileDrop exportInput={inputWrapper} allowedTypes={['image/jpeg', 'image/png']} />
						<input bind:this={inputWrapper.input} hidden name="picture" type="file" />
						<Dialog.Footer>
							<Button on:click={() => {}} class="bg-green-500 hover:bg-green-400" type="submit"
								><CheckCircle2 /></Button
							>
							<Button on:click={() => (avatarDialogOpened = false)}><X /></Button>
						</Dialog.Footer>
					</form>
				</Dialog.Content>
				<Avatar.Root class="h-60 w-60 absolute inset-0 border-4 border-pink-600">
					<Avatar.Image class="" src={avatarURL}></Avatar.Image>
					<Avatar.Fallback class="">Loading ...</Avatar.Fallback>
				</Avatar.Root>
				<Dialog.Trigger>
					<Button
						variant="outline"
						class="bg-gray-20 absolute inset-0 opacity-0 rounded-full h-60 w-60 hover:opacity-100 border-4 border-pink-600 hover:bg-opacity-90 hover:bg-gray-200"
					>
						<LucideEdit class="size-5" />
					</Button>
				</Dialog.Trigger>
			</Dialog.Root>
		</div>
		<Label class="text-8xl self-center">{data.user?.Nickname}</Label>
	</div>

	<div class="">
		<form method="POST" action="?/updateProfile">
			<Label>Nickname</Label>
			<Input value={data.user.Nickname ?? ''} />
		</form>
		{#if !data.user.IsArtist}
			<h3>You are not artist. Want to change it ? Click the button</h3>
			<form method="POST" action="?/becomeArtist">
				<Button type="submit" class="bg-pink-600">Become an artist!</Button>
			</form>
		{/if}
	</div>
</div>
