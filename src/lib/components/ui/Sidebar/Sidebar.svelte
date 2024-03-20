<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { User } from '$lib';

	let className: string | null | undefined;
	export { className as class };
	export let user: User;

	$: url = $page.url.pathname;

	let loading = false;

	const logoutHandle: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Successfully logged out');
					await applyAction(result);
					break;
				default:
					toast.error('There was a problem with logging out, please try again');
					await update();
			}
			loading = false;
		};
	};
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4">
		<div class="grid lg:grid-rows-2 px-8 py-2 content-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 500 500"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="mr-2 h-24 w-24"
			>
				<g
					transform="matrix(1.7766557051 0 0 1.7766557051 250 250.2115344078)"
					id="a8M2g5RqhvQ-qFDP191sA"
				>
					<g style="">
						<g
							transform="matrix(3.6116311867 0 0 3.6116311867 -45.6085731068 60.6985603931)"
							id="7r-it1_fqYt1EV_szBnw0"
						>
							<path
								style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
								transform=" translate(-21.58103, -21.58103)"
								d="M 21.58103 0 C 33.493759999999995 0 43.16206 9.6683 43.16206 21.58103 C 43.16206 33.493759999999995 33.493759999999995 43.16206 21.58103 43.16206 C 9.668299999999999 43.16206 0 33.493759999999995 0 21.58103 C 0 9.668299999999999 9.6683 0 21.58103 0 z M 10.88794 35.67526 C 10.88794 36.96676 11.496 38.182880000000004 12.5292 38.95778 C 13.178799999999999 39.44498 13.96889 39.70834 14.78088 39.70834 C 15.68189 39.70834 16.5566 39.40467 17.26378 38.84637 L 17.32092 38.80126 C 18.19557 38.110749999999996 18.77607 37.11446 18.945520000000002 36.01305 L 19.260820000000002 33.9636 C 19.383730000000003 33.16467 20.071160000000003 32.57492 20.87948 32.57492 L 21.58175 32.57492 C 22.02327 32.57492 22.46177 32.50212 22.87961 32.35944 L 26.08285 31.26565 C 27.12465 30.90991 28.07546 30.3294 28.867910000000002 29.565260000000002 L 30.121180000000003 28.35675 C 30.936360000000004 27.570680000000003 31.541410000000003 26.592730000000003 31.880940000000002 25.512390000000003 L 32.491710000000005 23.569020000000002 C 32.707040000000006 22.88388 32.816590000000005 22.169900000000002 32.816590000000005 21.45172 L 32.816590000000005 20.69406 C 32.81561000000001 19.40196 32.565990000000006 18.12212 32.081340000000004 16.92435 L 32.075750000000006 16.91072 C 31.316050000000008 15.060500000000001 30.019820000000006 13.48009 28.354010000000006 12.373030000000002 L 27.664670000000005 11.916320000000002 L 27.214680000000005 11.708320000000002 C 25.328830000000004 10.836610000000002 23.301850000000005 10.310400000000001 21.230120000000007 10.154700000000002 C 20.077370000000005 10.068070000000002 18.921010000000006 10.266210000000001 17.862860000000005 10.731670000000001 L 17.847800000000007 10.738290000000001 C 16.733950000000007 11.228250000000001 15.677490000000006 11.83946 14.697530000000008 12.56084 L 13.529930000000007 13.42036 L 12.875520000000007 14.229000000000001 C 11.789660000000007 15.570770000000001 11.027500000000007 17.144640000000003 10.648170000000007 18.82855 L 10.392300000000008 19.96439 C 10.361170000000008 20.102590000000003 10.345460000000008 20.243820000000003 10.345460000000008 20.38549 L 10.345460000000008 20.494960000000003 C 10.345460000000008 22.796360000000004 10.846090000000007 25.070210000000003 11.812640000000009 27.158810000000003 L 12.859440000000008 29.33293 C 13.263890000000009 30.17294 13.112630000000008 31.17494 12.478240000000008 31.858140000000002 C 12.036770000000008 32.33357 11.665350000000009 32.869530000000005 11.375200000000008 33.449830000000006 C 11.054770000000008 34.09069000000001 10.887950000000009 34.797360000000005 10.887950000000009 35.513870000000004 z"
								stroke-linecap="round"
							/>
						</g>
						<g
							transform="matrix(0 3.6116311867 -3.6116311867 0 0 -93.1271117086)"
							id="wFy8WUkj8kSIG31bKgYF8"
						>
							<path
								style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
								transform=" translate(3.31e-7, 0.0000132719)"
								d="M -9.1107 -32.15876 C -9.6363 -31.38024 -9.94526 -30.47587 -10.00586 -29.53849 L -12.60025 10.588060000000002 L -12.60025 10.588060000000002 C -12.62367 10.950260000000002 -12.42416 11.290210000000002 -12.096520000000002 11.446390000000003 C -11.768880000000001 11.602570000000004 -11.379160000000002 11.543480000000002 -11.112540000000001 11.297210000000003 L -10.27673 10.525200000000003 L -10.27673 10.525200000000003 C -8.79466 9.156270000000003 -7.15714 7.9658900000000035 -5.397730000000001 6.978460000000004 L -4.253900000000002 6.336510000000004 L -4.253900000000002 6.336510000000004 C -3.1399000000000017 5.711300000000004 -1.8839000000000015 5.382940000000004 -0.6064500000000015 5.382940000000004 L -0.3623500000000015 5.382940000000004 L -0.3623500000000015 5.382940000000004 C 0.18320999999999854 5.382940000000004 0.7234199999999984 5.490610000000004 1.2272899999999984 5.699790000000004 L 1.6631299999999984 5.880720000000004 L 1.6631299999999984 5.880720000000004 C 2.3079299999999985 6.148400000000004 2.7281999999999984 6.777910000000004 2.7281999999999984 7.476060000000004 L 2.7281999999999984 15.929560000000004 L 2.1805699999999986 25.283850000000005 L 2.1805699999999986 25.283850000000005 C 2.0563999999999987 27.404760000000003 2.3016399999999986 29.531130000000005 2.9053299999999984 31.568100000000005 L 2.9053299999999984 31.568100000000005 L 2.9053299999999984 31.568100000000005 C 3.1315099999999982 32.33129 3.5944099999999986 33.002840000000006 4.227169999999998 33.48577 L 4.318179999999998 33.55523 L 4.318179999999998 33.55523 C 5.100669999999998 34.15244 6.115109999999998 34.35485 7.066879999999998 34.103660000000005 L 8.599959999999998 33.69905000000001 L 8.599959999999998 33.69905000000001 C 10.068329999999998 33.31152000000001 11.153999999999998 32.07077000000001 11.343209999999997 30.563950000000006 L 12.078519999999997 24.707890000000006 L 12.592339999999998 9.141590000000006 L 12.592339999999998 9.141590000000006 C 12.653989999999999 7.2739000000000065 12.42354 5.408030000000005 11.909329999999999 3.6114600000000063 L 11.87811 3.5024000000000064 L 11.87811 3.5024000000000064 C 11.316419999999999 1.5399400000000063 10.442459999999999 -0.31930999999999354 9.28979 -2.0039799999999937 L 9.28834 -2.0060899999999937 L 9.28834 -2.0060899999999937 C 8.82554 -2.682489999999994 8.16551 -3.199789999999994 7.39812 -3.487559999999994 L 7.39812 -3.487559999999994 L 7.39812 -3.487559999999994 C 6.18154 -3.943779999999994 4.8928199999999995 -4.177469999999994 3.5935099999999998 -4.177469999999994 L 0.4640299999999997 -4.177469999999994 L -0.8292700000000002 -4.177469999999994 L -0.8652900000000002 -4.177469999999994 L -0.8652900000000002 -4.177469999999994 C -1.0472900000000003 -4.177469999999994 -1.2210500000000002 -4.253329999999994 -1.3447800000000003 -4.386809999999994 C -1.4685000000000004 -4.520289999999994 -1.5309900000000003 -4.699289999999994 -1.5172100000000004 -4.880769999999995 L 0.3073199999999996 -28.906349999999996 L 0.3073199999999996 -28.906349999999996 C 0.4073599999999996 -30.223629999999996 -0.03910000000000041 -31.524019999999997 -0.9271700000000005 -32.50205999999999 L -1.5706100000000005 -33.21068999999999 L -4.18939 -34.01297999999999 L -4.18939 -34.01297999999999 C -4.94448 -34.24430999999999 -5.747330000000001 -34.271719999999995 -6.51644 -34.09243999999999 L -6.51644 -34.09243999999999 L -6.51644 -34.09243999999999 C -7.49962 -33.86325999999999 -8.35985 -33.27095999999999 -8.92473 -32.43425999999999 z"
								stroke-linecap="round"
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Discover</h2>
			<div class="space-y-1">
				<a href="/">
					<Button
						variant="ghost"
						class={`w-full justify-start ${url === '/' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
						Browse
					</Button>
				</a>
			</div>
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">Your Library</h2>
			<div class="space-y-1">
				{#if user.IsArtist}
					<a href="/albums">
						<Button
							disabled={loading}
							variant="ghost"
							class={`w-full justify-start ${url === '/albums' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="mr-2 h-4 w-4"
							>
								<path d="m16 6 4 14" />
								<path d="M12 6v14" />
								<path d="M8 8v12" />
								<path d="M4 4v16" />
							</svg>
							Albums
						</Button>
					</a>
				{/if}
				<a href="/playlists">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/playlists' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<path d="M21 15V6" />
							<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
							<path d="M12 12H3" />
							<path d="M16 6H3" />
							<path d="M12 18H3" />
						</svg>
						Playlists
					</Button>
				</a>
				<a href="/songs"
					><Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/songs' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<circle cx="8" cy="18" r="4" />
							<path d="M12 18V2l7 4" />
						</svg>
						Songs
					</Button>
				</a>
			</div>
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">You Liked</h2>
			<div class="space-y-1">
				<a href="/liked/albums">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/liked/albums' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<path d="m16 6 4 14" />
							<path d="M12 6v14" />
							<path d="M8 8v12" />
							<path d="M4 4v16" />
						</svg>
						Albums
					</Button>
				</a>
				<a href="/liked/playlists">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/liked/playlists' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<path d="M21 15V6" />
							<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
							<path d="M12 12H3" />
							<path d="M16 6H3" />
							<path d="M12 18H3" />
						</svg>
						Playlists
					</Button>
				</a>
				<a href="/liked/songs">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/liked/songs' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<circle cx="8" cy="18" r="4" />
							<path d="M12 18V2l7 4" />
						</svg>
						Songs
					</Button>
				</a>
				<a href="/liked/artists">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/liked/artists' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
							<circle cx="17" cy="7" r="5" />
						</svg>
						Artists
					</Button>
				</a>
			</div>
		</div>
		<div class="py-2">
			<h2 class="relative px-7 text-lg font-semibold tracking-tight">Settings</h2>
			<div class="space-y-1 p-2">
				<a href="/account">
					<Button
						variant="ghost"
						disabled={loading}
						class={`w-full justify-start ${url === '/account' ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<circle class="cls-1" cx="12" cy="7.25" r="5.73" /><path
								class="cls-1"
								d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
							/>
						</svg>
						Account
					</Button>
				</a>
				<form method="POST" action="/logout" use:enhance={logoutHandle}>
					<Button type="submit" variant="ghost" disabled={loading} class="w-full justify-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2 h-4 w-4"
						>
							<path
								id="Stroke 1"
								d="M21.791 12.1208H9.75"
								stroke="#130F26"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								id="Stroke 3"
								d="M18.8643 9.20483L21.7923 12.1208L18.8643 15.0368"
								stroke="#130F26"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								id="Stroke 4"
								d="M16.3597 7.63C16.0297 4.05 14.6897 2.75 9.35974 2.75C2.25874 2.75 2.25874 5.06 2.25874 12C2.25874 18.94 2.25874 21.25 9.35974 21.25C14.6897 21.25 16.0297 19.95 16.3597 16.37"
								stroke="#130F26"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Logout
					</Button>
				</form>
			</div>
		</div>
	</div>
</div>
