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
</script>

<div class="border-t border-gray-100 bg-white">
	<!-- Input form -->
	<form onsubmit={handleSubmit} class="p-6 max-w-5xl mx-auto">
		<div class="flex items-end gap-3">
			<div class="flex-1 relative">
				<textarea
					bind:this={textareaEl}
					bind:value={inputValue}
					onkeydown={handleKeydown}
					oninput={autoResize}
					placeholder="Ask a question..."
					rows="1"
					disabled={chatStore.isLoading}
					class="w-full resize-none rounded-lg border border-gray-200
						bg-gray-50/50 px-4 py-3
						text-sm text-gray-900
						placeholder-gray-400
						focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white
						disabled:opacity-50 disabled:cursor-not-allowed
						transition-all duration-200"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={!inputValue.trim() || chatStore.isLoading}
				class="flex-shrink-0 px-4 h-11 rounded-lg
					bg-indigo-600
					text-white font-medium
					hover:bg-indigo-700
					focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
					disabled:opacity-50 disabled:cursor-not-allowed
					transition-all duration-200
					flex items-center justify-center gap-2 shadow-sm"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>
		</div>
	</form>
</div>
