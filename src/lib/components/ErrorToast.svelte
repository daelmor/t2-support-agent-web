<script lang="ts">
	import { chatStore } from '$lib/stores/chat.svelte';

	function dismiss() {
		chatStore.clearError();
	}
</script>

{#if chatStore.error}
	<div class="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 animate-slide-up">
		<div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-lg">
			<div class="flex items-start gap-3">
				<div class="flex-shrink-0">
					<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<div class="flex-1">
					<h4 class="text-sm font-medium text-red-800 dark:text-red-200">Something went wrong</h4>
					<p class="mt-1 text-sm text-red-600 dark:text-red-300">{chatStore.error}</p>
				</div>
				<button
					onclick={dismiss}
					aria-label="Dismiss error"
					class="flex-shrink-0 text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}
