<script lang="ts">
	import type { Message } from '$lib/types';
	import ticketLoading from '$lib/assets/ticket_loading.gif';

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
	<div
		class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium
			{message.role === 'user'
			? 'bg-gray-400'
			: 'bg-indigo-600'}"
	>
		{#if message.role === 'user'}
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
		{:else}
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
			</svg>
		{/if}
	</div>

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
