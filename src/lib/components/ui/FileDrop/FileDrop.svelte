<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import type { FileWrapper } from '$lib';
	import type { EventHandler } from 'svelte/elements';
	import { toast } from 'svelte-sonner';

	let input: HTMLInputElement | undefined;
	let isFileOver = false;
	let isChosen = false;

	const onDragOver: EventHandler = (event) => {
		event.preventDefault();
		isFileOver = true;
	};

	const onDragLeave = () => {
		isFileOver = false;
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();
		if (!input || event.dataTransfer == null || event.dataTransfer.files == null) {
			return;
		}
		input.files = event.dataTransfer.files;
		onFileChosen();
	};

	const onClick = () => {
		input?.click();
	};

	const onFileChosen = () => {
		if (input && exportInput.input && input.files && allowedTypes.includes(input.files[0].type)) {
			exportInput.input.files = input?.files;
		} else {
			toast.error('Forbidden file type');
			onDragLeave();
			return;
		}
		isChosen = true;
	};

	export let exportInput: FileWrapper;
	export let allowedTypes: string[];
</script>

{#if !isChosen}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="outline-dashed {isFileOver
			? 'outline-sky-500 bg-sky-200'
			: ''} h-60 w-120 m-5 items-center flex justify-center cursor-pointer"
		on:dragover={onDragOver}
		on:dragleave={onDragLeave}
		on:drop={onDrop}
		on:click={onClick}
	>
		<div class="flex flex-col items-center">
			<Label class="{isFileOver ? 'text-lg font-bold' : ''} cursor-pointer"
				>Dr{isFileOver ? 'op' : 'ag'} file here{isFileOver ? '' : ' or click to upload'}</Label
			>
			<input
				hidden
				type="file"
				name="ImageFile"
				bind:this={input}
				accept={allowedTypes.join(', ')}
				on:change={onFileChosen}
			/>
		</div>
	</div>
{:else}
	<div class="h-60 w-120 m-5 flex justify-center items-center">
		<Label class="text-lg font-bold">File is uploaded</Label>
	</div>
{/if}
