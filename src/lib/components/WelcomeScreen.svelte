<script lang="ts">
	const features = [
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />`,
			title: 'Order Lookup',
			description: 'Quickly find and review order details'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />`,
			title: 'Event Management',
			description: 'Browse events and functions'
		},
		{
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
			title: 'Fee Assignment',
			description: 'Manage surcharges and pricing'
		}
	];
</script>

<div class="flex-1 flex flex-col items-center justify-center p-8 text-center">
	<!-- Logo animation -->
	<div class="relative mb-8">
		<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/30 animate-pulse-slow">
			<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
			</svg>
		</div>
		<div class="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-xl -z-10"></div>
	</div>

	<!-- Title -->
	<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
		Welcome to <span class="gradient-text">T2 Support</span>
	</h2>
	<p class="text-slate-600 dark:text-slate-400 max-w-md mb-8">
		Your AI-powered assistant for TodoTicket support operations. Ask me anything about orders, events, or pricing.
	</p>

	<!-- Feature cards -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
		{#each features as feature}
			<div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
				<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mb-3 mx-auto">
					<svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{@html feature.icon}
					</svg>
				</div>
				<h3 class="font-medium text-slate-900 dark:text-white text-sm mb-1">{feature.title}</h3>
				<p class="text-xs text-slate-500 dark:text-slate-400">{feature.description}</p>
			</div>
		{/each}
	</div>

	<!-- Powered by -->
	<p class="mt-8 text-xs text-slate-400 dark:text-slate-500">
		Powered by Claude AI via Vertex AI
	</p>
</div>
