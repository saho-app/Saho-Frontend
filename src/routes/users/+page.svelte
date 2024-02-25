<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import Button from '$lib/components/ui/button/button.svelte';
    import Input from '$lib/components/ui/input/input.svelte';
    import { Trash, Plus, Edit } from 'lucide-svelte';
	import { enhance } from '$app/forms';
    
    export let data: PageData;
    export let form: ActionData;
</script>

<form class="container justify-items-center place-items-center" action="?/createUser" method="POST" use:enhance>
    <Input class="max-w-xs inline-flex" type="text" name="nickname" placeholder="Nickname" required/>
    {#if form?.missing}
        <p class="text-red-500 text-md font-bold">This field is required</p>
    {/if}
    <Button class="px-3.5 bg-blue-500 hover:bg-blue-400" type="submit"><Plus class="h-4 w-4"/></Button>
</form>

<aside>
    {#each data.users as {id, nickname}}
    <div class="container self-end justify-items-around inline-flex w-xs">
    <h4 class="text-indigo-400 font-bold">{nickname}</h4>
    <Button href="/users/{id}/edit" class="px-3.5 bg-yellow-500 hover:bg-yellow-400"><Edit class="h-4 w-4"/></Button>
        <form method="POST" class="" action="?/editUser" use:enhance>
            <input type="hidden" name="id" value={id}/>
            <Button formaction="?/deleteUser" type="submit" class="px-3.5">
                <Trash class="h-4 w-4" />
            </Button>
        </form>
        </div>
    {/each}
</aside>