<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { CheckCircle2, X } from 'lucide-svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let username: string | undefined;
	export let onClick = () => {};

	export let form: ActionData;

    let waiting = false;

    const onSubmit: SubmitFunction = () => {
        waiting = true;
        return async (event) => {
            switch (event.result.type) {
                case 'failure':
                    toast.error("Some error occured while trying to change your nickname. Please, check your input and try again");
                    break;
                case 'success':
                    toast.success("Successfully updated nickname");
                    onClick();
                    break;
            }
            await event.update();
            waiting = false;
        }
    }
</script>

<form method="POST" action="?/updateNickname" use:enhance={onSubmit}>
	<Input value={username ?? ''} name="Nickname" placeholder="1-50 numeric or alphabet characters" autocomplete="off"/>
	{#if form?.errors?.fieldErrors?.Nickname}
		{#each form.errors.fieldErrors.Nickname as err}
			<h3 class="px-3.5 text-sm text-red-600">{err}</h3>
		{/each}
	{/if}
	<Dialog.Footer class="mt-5">
		<Button class="bg-green-500 hover:bg-green-400" type="submit"><CheckCircle2 size={24} /></Button
		>
		<Button on:click={onClick}><X size={24} /></Button>
	</Dialog.Footer>
</form>
