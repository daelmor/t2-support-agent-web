<script lang="ts">
	import { chatStore } from '$lib/stores/chat.svelte';

	let inputValue = $state('');
	let textareaEl: HTMLTextAreaElement;

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (inputValue.trim() && !chatStore.isLoading) {
			chatStore.sendMessage(inputValue);
			inputValue = '';
			// Reset textarea height
			if (textareaEl) {
				textareaEl.style.height = 'auto';
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	}

	function autoResize() {
		if (textareaEl) {
			textareaEl.style.height = 'auto';
			textareaEl.style.height = Math.min(textareaEl.scrollHeight, 200) + 'px';
		}
	}

	const suggestions = [
		'Look up order 1001',
		'What events do we have?',
		'Show me event 887, function 1',
		'Help me with a refund'
	];

	function useSuggestion(suggestion: string) {
		inputValue = suggestion;
		textareaEl?.focus();
	}
</script>

<div class="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
	<!-- Suggestions (show when no messages) -->
	{#if chatStore.messages.length === 0}
		<div class="px-4 pt-4 pb-2">
			<p class="text-xs text-slate-500 dark:text-slate-400 mb-2">Try asking:</p>
			<div class="flex flex-wrap gap-2">
				{#each suggestions as suggestion}
					<button
						type="button"
						onclick={() => useSuggestion(suggestion)}
						class="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300
							hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400
							transition-colors duration-200"
					>
						{suggestion}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Input form -->
	<form onsubmit={handleSubmit} class="p-4">
		<div class="flex items-end gap-3">
			<div class="flex-1 relative">
				<textarea
					bind:this={textareaEl}
					bind:value={inputValue}
					onkeydown={handleKeydown}
					oninput={autoResize}
					placeholder="Type your message..."
					rows="1"
					disabled={chatStore.isLoading}
					class="w-full resize-none rounded-xl border border-slate-300 dark:border-slate-600
						bg-slate-50 dark:bg-slate-900 px-4 py-3 pr-12
						text-sm text-slate-900 dark:text-slate-100
						placeholder-slate-400 dark:placeholder-slate-500
						focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
						disabled:opacity-50 disabled:cursor-not-allowed
						transition-all duration-200"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={!inputValue.trim() || chatStore.isLoading}
				class="flex-shrink-0 w-11 h-11 rounded-xl
					bg-gradient-to-br from-primary-500 to-primary-600
					text-white shadow-lg shadow-primary-500/25
					hover:from-primary-600 hover:to-primary-700
					focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
					transition-all duration-200
					flex items-center justify-center"
			>
				{#if chatStore.isLoading}
					<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
					</svg>
				{/if}
			</button>
		</div>
	</form>
</div>
