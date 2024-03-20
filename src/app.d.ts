// See https://kit.svelte.dev/docs/types#app

import type { Auth } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			Auth: Auth;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
