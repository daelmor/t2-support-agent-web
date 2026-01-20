<script lang="ts">
	import logo from '$lib/assets/logo.png';
</script>

<div class="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
	<!-- Logo -->
	<div class="mb-8 relative">
		<div class="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
		<img src={logo} alt="Event Flow" class="h-16 w-16 relative z-10 mx-auto" />
	</div>

	<!-- Title -->
	<h2 class="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
		Event Flow
	</h2>
	<p class="text-lg text-gray-600 max-w-xl">
		¿Qué quieres hacer hoy?
	</p>
</div>
