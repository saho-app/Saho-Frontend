<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { type SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let data: ActionData;
	let loading = false;

	const onSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Successfully logged in!');
					await applyAction(result);
					break;

				case 'failure':
					toast.error('There was a problem with authentication, please check your input data');
					await update();
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<form class="space-y-3" method="POST" action="?/login" use:enhance={onSubmit}>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Login</h3>
		<Input name="Login" autocomplete="off" placeholder="JohnDoe" value={data?.form?.Login ?? ''} />
		<div>
			{#if data?.errors?.fieldErrors?.Login}
				{#each data.errors.fieldErrors.Login as err}
					<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
				{/each}
			{/if}
		</div>
	</div>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Password</h3>
		<Input type="password" name="Password" autocomplete="off" placeholder="********" value={data?.form?.Password ?? ''} />
		<div>
			{#if data?.errors?.fieldErrors?.Password}
				{#each data.errors.fieldErrors.Password as err}
					<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex place-content-center w-full">
		<Button
			class="disabled:cursor-not-allowed w-full"
			type="submit"
			disabled={loading}
			formaction="?/login">Login</Button
		>
	</div>
</form>
