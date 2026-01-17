<script lang="ts">
	import { chatStore } from '$lib/stores/chat.svelte';
	import { themeStore } from '$lib/stores/theme.svelte';

	let showMenu = $state(false);

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function handleNewChat() {
		chatStore.newConversation();
		showMenu = false;
	}

	function handleClearHistory() {
		if (confirm('Are you sure you want to clear your chat history?')) {
			chatStore.clearHistory();
		}
		showMenu = false;
	}
</script>

<header class="glass border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
	<div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
		<!-- Logo -->
		<div class="flex items-center gap-3">
			<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
				<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
			</div>
			<div>
				<h1 class="font-semibold text-slate-900 dark:text-white">T2 Support</h1>
				<p class="text-xs text-slate-500 dark:text-slate-400">AI Assistant</p>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex items-center gap-2">
			<!-- Theme toggle -->
			<button
				onclick={() => themeStore.toggle()}
				class="w-9 h-9 rounded-lg flex items-center justify-center
					text-slate-500 dark:text-slate-400
					hover:bg-slate-100 dark:hover:bg-slate-700
					transition-colors duration-200"
				title={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if themeStore.isDark}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				{/if}
			</button>

			<!-- New chat button -->
			<button
				onclick={handleNewChat}
				class="h-9 px-3 rounded-lg flex items-center gap-2
					text-sm font-medium text-slate-600 dark:text-slate-300
					hover:bg-slate-100 dark:hover:bg-slate-700
					transition-colors duration-200"
				title="Start new conversation"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<span class="hidden sm:inline">New Chat</span>
			</button>

			<!-- Menu button -->
			<div class="relative">
				<button
					onclick={toggleMenu}
					aria-label="Open menu"
					class="w-9 h-9 rounded-lg flex items-center justify-center
						text-slate-500 dark:text-slate-400
						hover:bg-slate-100 dark:hover:bg-slate-700
						transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
					</svg>
				</button>

				{#if showMenu}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="fixed inset-0 z-40"
						onclick={() => (showMenu = false)}
					></div>
					<div class="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 animate-fade-in">
						<button
							onclick={handleClearHistory}
							class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							Clear History
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
