<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label';
	import { CheckCircle2, LucideEdit, Pen, X } from 'lucide-svelte';
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
	import { Trash } from 'radix-icons-svelte';
	import PageTitle from '$lib/components/ui/PageTitle/PageTitle.svelte';
	import NicknameEditForm from '$lib/components/ui/NicknameEditForm/NicknameEditForm.svelte';
	import type { ActionData } from '../$types';

	export let data: PageData;
	export let form: ActionData;
	let avatarURL: string;
	let nicknameEditing = false;
	let showNickPen = false;
	let avatarDialogOpened = false;
	let loading = false;

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
				case 'failure':
					toast.error('There was a problem with avatar uploading. Please try again');
					break;
				case 'success':
					toast.success('Successfully changed avatar');
					avatarDialogOpened = false;
					if (inputWrapper.input && inputWrapper.input.files) {
						avatarURL = URL.createObjectURL(inputWrapper.input.files[0]);
					}
					break;
			}
			await update();
		};
	};

	const onBecomeArtist:SubmitFunction = () => {
		loading = true;
		return async (event) => {
			switch (event.result.type) {
				case 'failure':
					toast.error(`An error occured. Code: ${event.result.status}`);
					break;
				case 'success':
					toast.success("Successfully updated account status");
					break;
			}
			await event.update();
			loading = false;
		}
	}
</script>

<PageTitle title="Account" />

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
							<Button class="bg-green-500 hover:bg-green-400" type="submit"
								><CheckCircle2 size={24} /></Button
							>
							<Button type="submit" formaction="?/deleteAvatar"><Trash size={24} /></Button>
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
						class="bg-gray-200 absolute inset-0 opacity-0 rounded-full h-60 w-60 hover:opacity-100 border-4 border-pink-600 hover:bg-opacity-80 hover:bg-gray-300"
					>
						<div
							class="rounded-full bg-white size-10 bg-opacity-80 flex items-center justify-center"
						>
							<LucideEdit class="size-5" />
						</div>
					</Button>
				</Dialog.Trigger>
			</Dialog.Root>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="self-center flex items-center p-5 rounded-3xl cursor-pointer {showNickPen
				? 'bg-gray-200'
				: ''}"
			on:mouseover={() => (showNickPen = true)}
			on:mouseleave={() => (showNickPen = false)}
			on:click={() => (nicknameEditing = true)}
		>
			<Label class="text-8xl self-center cursor-pointer">{data.user?.Nickname}</Label>
			<Dialog.Root bind:open={nicknameEditing}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Edit your nickname</Dialog.Title>
					</Dialog.Header>
					
					<NicknameEditForm username={data.user.Nickname} onClick={() => (nicknameEditing = false)} form={form}/>
				</Dialog.Content>
			</Dialog.Root>
			<div class="{showNickPen ? '' : 'opacity-0'} rounded-full p-3 ml-10 items-center self-center">
				<Pen size={48} fill="gray" />
			</div>
		</div>
	</div>

	<div class="">
		{#if !data.user.IsArtist}
			<h3>You are not artist. Want to change it ? Click the button</h3>
			<form method="POST" action="?/becomeArtist" use:enhance={onBecomeArtist}>
				<Button type="submit" disabled={loading} class="bg-pink-600">Become an artist!</Button>
			</form>
		{/if}
	</div>
</div>
