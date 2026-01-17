<script lang="ts">
	import '../app.css';
	import { themeStore } from '$lib/stores/theme.svelte';

	let { children } = $props();

	// Initialize theme on mount
	$effect(() => {
		themeStore.init();
	});
</script>

<svelte:head>
	<title>T2 Support - AI Assistant</title>
	<meta name="description" content="AI-powered support assistant for TodoTicket" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
	{@render children()}
</div>
