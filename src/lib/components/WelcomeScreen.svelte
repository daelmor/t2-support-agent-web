<script lang="ts">
	import logo from '$lib/assets/logo.png';

	const prompts = [
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />`,
			text: 'What is a ticketing system'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
			text: 'Help me understand session state'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />`,
			text: 'How do I make an interactive chart?'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />`,
			text: 'How do I customize my app?'
		}
	];
</script>

<div class="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
	<!-- Logo -->
	<div class="mb-8 relative">
		<div class="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
		<img src={logo} alt="T2 Support" class="h-16 w-16 relative z-10 mx-auto" />
	</div>

	<!-- Title -->
	<h2 class="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
		Streamlit AI assistant
	</h2>
	<p class="text-lg text-gray-600 max-w-xl mb-12">
		Ask a question to get started
	</p>

	<!-- Prompt suggestions -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mb-6">
		{#each prompts as prompt}
			<button
				type="button"
				class="prompt-card group"
			>
				<svg class="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{@html prompt.icon}
				</svg>
				<span class="text-sm text-gray-700 group-hover:text-gray-900 text-left">{prompt.text}</span>
			</button>
		{/each}
	</div>

	<!-- Legal disclaimer -->
	<button
		type="button"
		class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 mt-4"
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		Legal disclaimer
	</button>
</div>
