<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	function goBack() {
		window.history.back();
	}

	function goHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Error - Wordbook</title>
</svelte:head>

<div class="container mx-auto px-4 py-16 max-w-2xl text-center">
	<div class="alert alert-error mb-8">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<div>
			<h3 class="font-bold">Error {$page.status}</h3>
			<p class="text-sm">{$page.error?.message || 'An unexpected error occurred'}</p>
		</div>
	</div>

	<div class="flex gap-4 justify-center">
		<button class="btn btn-primary" onclick={goBack}>Go Back</button>
		<button class="btn btn-outline" onclick={goHome}>Go Home</button>
	</div>
</div>
