<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ChatMessage from '$lib/components/ChatMessage.svelte';
	import ChatInput from '$lib/components/ChatInput.svelte';
	import WelcomeScreen from '$lib/components/WelcomeScreen.svelte';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { chatStore } from '$lib/stores/chat.svelte';

	let messagesContainer: HTMLDivElement;

	// Auto-scroll to bottom when new messages arrive
	$effect(() => {
		if (chatStore.messages.length > 0 && messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	});
</script>

<div class="flex flex-col h-screen">
	<Header />

	<!-- Messages area -->
	<div
		bind:this={messagesContainer}
		class="flex-1 overflow-y-auto"
	>
		{#if chatStore.messages.length === 0}
			<WelcomeScreen />
		{:else}
			<div class="p-6 space-y-6 max-w-5xl mx-auto">
				{#each chatStore.messages as message (message.id)}
					<ChatMessage {message} />
				{/each}
			</div>
		{/if}
	</div>

	<!-- Input area -->
	<ChatInput />

	<!-- Error toast -->
	<ErrorToast />
</div>
