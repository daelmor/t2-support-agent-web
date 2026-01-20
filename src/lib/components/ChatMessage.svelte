<script lang="ts">
	import type { Message } from '$lib/types';
	import ticketLoading from '$lib/assets/ticket_loading.gif';
	import chatbotAvatar from '$lib/assets/chatbot.png';
	import { authStore } from '$lib/stores/auth.svelte';

	interface Props {
		message: Message;
	}

	let { message }: Props = $props();

	function formatContent(content: string): string {
		// Convert markdown-style formatting to HTML
		return content
			// Bold text
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			// Bullet points
			.replace(/^- (.*)$/gm, '<li>$1</li>')
			// Numbered lists
			.replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
			// Line breaks
			.replace(/\n\n/g, '</p><p>')
			.replace(/\n/g, '<br>');
	}

	function formatTime(date: Date): string {
		return new Intl.DateTimeFormat('en', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		}).format(date);
	}
</script>

<div
	class="flex gap-4 animate-slide-up {message.role === 'user' ? 'flex-row-reverse' : ''}"
>
	<!-- Avatar -->
	{#if message.role === 'user'}
		{#if authStore.user?.picture}
			<img
				src={authStore.user.picture}
				alt={authStore.user.name || 'User'}
				class="flex-shrink-0 w-10 h-10 rounded-full object-cover"
			/>
		{:else}
			<div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-gray-400">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			</div>
		{/if}
	{:else}
		<img
			src={chatbotAvatar}
			alt="AI Assistant"
			class="flex-shrink-0 w-10 h-10 rounded-full object-cover"
		/>
	{/if}

	<!-- Message content -->
	<div class="flex-1 max-w-[80%]">
		<div class="mb-1">
			<span class="text-sm font-medium text-gray-700">
				{message.role === 'user' ? 'You' : 'AI Assistant'}
			</span>
		</div>
		<div class="message-bubble {message.role === 'user' ? 'message-user' : 'message-assistant'}">
			{#if message.isStreaming}
				<img src={ticketLoading} alt="Loading..." class="h-6 w-auto" />
			{:else}
				<div class="message-content text-sm leading-relaxed">
					{@html formatContent(message.content)}
				</div>
			{/if}
		</div>
	</div>
</div>
