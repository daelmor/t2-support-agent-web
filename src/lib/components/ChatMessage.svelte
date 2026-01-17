<script lang="ts">
	import type { Message } from '$lib/types';

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
	class="flex gap-3 animate-slide-up {message.role === 'user' ? 'flex-row-reverse' : ''}"
>
	<!-- Avatar -->
	<div
		class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
			{message.role === 'user'
			? 'bg-gradient-to-br from-primary-500 to-primary-600'
			: 'bg-gradient-to-br from-accent-500 to-accent-600'}"
	>
		{#if message.role === 'user'}
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
		{:else}
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		{/if}
	</div>

	<!-- Message bubble -->
	<div class="flex-1 max-w-[85%] {message.role === 'user' ? 'flex flex-col items-end' : ''}">
		<div
			class="inline-block px-4 py-3 rounded-2xl shadow-sm
				{message.role === 'user'
				? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-tr-md'
				: 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-md border border-slate-200 dark:border-slate-700'}"
		>
			{#if message.isStreaming}
				<div class="flex items-center gap-1 py-1">
					<span class="typing-dot w-2 h-2 bg-current rounded-full opacity-60"></span>
					<span class="typing-dot w-2 h-2 bg-current rounded-full opacity-60"></span>
					<span class="typing-dot w-2 h-2 bg-current rounded-full opacity-60"></span>
				</div>
			{:else}
				<div class="message-content text-sm leading-relaxed whitespace-pre-wrap">
					{@html formatContent(message.content)}
				</div>
			{/if}
		</div>
		<span class="text-xs text-slate-400 dark:text-slate-500 mt-1 px-1">
			{formatTime(message.timestamp)}
		</span>
	</div>
</div>
