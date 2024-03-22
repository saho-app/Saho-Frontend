<script lang="ts">
	import type { LayoutData } from '../$types';
	import Sidebar from '$lib/components/ui/Sidebar/Sidebar.svelte';

	export let data: LayoutData;
</script>

<div class="hidden md:block">
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-12">
				<Sidebar class={undefined} user={data.user} />
				<div class="col-span-11 lg:border-l">
					<div class="h-full px-4 py-6 lg:px-8">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
