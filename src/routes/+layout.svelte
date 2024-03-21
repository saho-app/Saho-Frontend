<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
</script>

<ModeWatcher track={false} defaultMode="light" />
<Toaster position="top-right" richColors />
<slot />
