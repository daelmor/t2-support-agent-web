<script lang="ts">
	import { chatStore } from '$lib/stores/chat.svelte';
	import { authStore } from '$lib/stores/auth.svelte';
	import logo from '$lib/assets/logo.png';

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

<header class="glass-modern border-b border-white/60 sticky top-0 z-50 shadow-sm">
	<div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
		<!-- Logo -->
		<div class="flex items-center gap-4">
			<img src={logo} alt="T2 Support Logo" class="h-10 w-10 object-contain" />
			<div>
				<h1 class="font-bold text-xl text-gray-800">T2 Support</h1>
				<p class="text-sm text-gray-500">AI Assistant</p>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex items-center gap-3">
			<!-- Auth button -->
			{#if authStore.isLoading}
				<div class="w-10 h-10 flex items-center justify-center">
					<svg class="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			{:else if authStore.isAuthenticated}
				<div class="flex items-center gap-3">
					{#if authStore.user?.picture}
						<img
							src={authStore.user.picture}
							alt={authStore.user.name || 'User'}
							class="w-9 h-9 rounded-full border-2 border-indigo-200"
						/>
					{/if}
					<span class="text-sm font-medium text-gray-700 hidden sm:inline">
						{authStore.user?.name || 'User'}
					</span>
				</div>
			{/if}

			<!-- New chat button -->
			<button
				onclick={handleNewChat}
				class="btn-primary"
				title="Start new conversation"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				<span class="hidden sm:inline">New Chat</span>
			</button>

			<!-- Menu button -->
			<div class="relative">
				<button
					onclick={toggleMenu}
					aria-label="Open menu"
					class="w-10 h-10 rounded-lg flex items-center justify-center
						text-gray-600 hover:bg-white/70
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
					<div class="absolute right-0 mt-2 w-48 py-1 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-fade-in">
						<button
							onclick={handleClearHistory}
							class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
							Clear History
						</button>
						{#if authStore.isAuthenticated}
							<button
								onclick={() => authStore.logout()}
								class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Sign Out
							</button>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
