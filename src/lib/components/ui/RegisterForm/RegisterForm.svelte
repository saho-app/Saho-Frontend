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
					toast.success('Successfully created an account!');
					await applyAction(result);
					break;

				case 'failure':
					toast.error('There was a problem with creating account, please check your input data');
					await update();
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<form class="space-y-3" method="POST" action="?/register" use:enhance={onSubmit}>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Email</h3>
		<Input value={data?.form?.Email ?? ''} autocomplete="off" placeholder="johndoe@example.com" name="Email" />
		<div>
			{#if data?.errors?.fieldErrors?.Email}
				{#each data.errors.fieldErrors.Email as err}
					<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
				{/each}
			{/if}
		</div>
	</div>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Login</h3>
		<div>
			<Input name="Login" autocomplete="off" placeholder="JohnDoe" value={data?.form?.Login ?? ''} />
			<h4 class="px-0.5 text-xs text-gray-400">
				This name won't be displayed to other users and you will use it to login only
			</h4>
			<div>
				{#if data?.errors?.fieldErrors?.Login}
					{#each data.errors.fieldErrors.Login as err}
						<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Password</h3>
		<Input type="password" autocomplete="off" name="Password" placeholder="Minimum 8 characters, must contain a letter" value={data?.form?.Password ?? ''} />
		<div>
			{#if data?.errors?.fieldErrors?.Password}
				{#each data.errors.fieldErrors.Password as err}
					<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
				{/each}
			{/if}
		</div>
	</div>
	<div class="grid space-y-3">
		<h3 class="px-3.5 text-base">Confirm password</h3>
		<Input type="password" autocomplete="off" name="PasswordConfirm" placeholder="Repeat your password" value={data?.form?.PasswordConfirm ?? ''} />
		<div>
			{#if data?.errors?.fieldErrors?.PasswordConfirm}
				{#each data.errors.fieldErrors.PasswordConfirm as err}
					<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex justify-center">
		<Button class="w-full" type="submit" disabled={loading} formaction="?/register">Register</Button
		>
	</div>
</form>
