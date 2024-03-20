<script lang="ts">
	import RegisterForm from '$lib/components/ui/RegisterForm/RegisterForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { ActionData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs';
	import LoginForm from '$lib/components/ui/LoginForm/LoginForm.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';

	export let form: ActionData;
	export let data: PageData;

	onMount(() => {
		if (data.message) {
			toast.info(data.message);
		}
	})
</script>

<div
	class="container relative hidden h-[900px] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute h-full inset-0 bg-cover"
			style="
				background-image:
					url(/guitar.png);"
		/>
		<div class="relative z-20 flex items-center text-xl font-medium">
			<Label class="text-gray-900 font-bold text-4xl">Saho App</Label>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<Tabs.Root value="login" class="w-[400px] h-full place-content-between space-y-20">
				<div class="container">
					<Tabs.List class="grid w-full grid-cols-2">
						<Tabs.Trigger value="register">Sign Up</Tabs.Trigger>
						<Tabs.Trigger value="login">Sign In</Tabs.Trigger>
					</Tabs.List>
				</div>
				<div class="container">
					<Tabs.Content value="register">
						<div class="flex flex-col space-y-2 text-center">
							<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
						</div>
						<RegisterForm data={form} />
						<p class="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{' '}
							<a href="/terms" class="underline underline-offset-4 hover:text-primary">
								Terms of Service
							</a>{' '}
							and{' '}
							<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
								Privacy Policy
							</a>
							.
						</p>
					</Tabs.Content>
					<Tabs.Content value="login">
						<div class="flex flex-col space-y-2 text-center">
							<h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
						</div>
						<LoginForm data={form} />
					</Tabs.Content>
				</div>
			</Tabs.Root>
		</div>
	</div>
</div>
