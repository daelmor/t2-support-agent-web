<script lang="ts">
	import '../app.css';
	import { authStore } from '$lib/stores/auth.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();

	// Initialize auth on mount
	onMount(async () => {
		await authStore.init();

		// Redirect to login if not authenticated
		if (!authStore.isLoading && !authStore.isAuthenticated) {
			authStore.login();
		}
	});
</script>

<svelte:head>
	<title>T2 Support - AI Assistant</title>
	<meta name="description" content="AI-powered support assistant for TodoTicket" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/50">
	{@render children()}
</div>
