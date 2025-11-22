<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import * as m from '$lib/paraglide/messages.js';

	function goBack() {
		window.history.back();
	}

	function goHome() {
		goto('/');
	}

	const is404 = $derived($page.status === 404);
	const is500 = $derived($page.status >= 500);

	const errorTitle = $derived(
		is404 ? m.error_page_not_found() : is500 ? m.error_server_error() : m.error_title()
	);

	const errorMessage = $derived(
		is404
			? m.error_page_not_found_message()
			: is500
				? m.error_server_error_message()
				: $page.error?.message || m.error_unexpected()
	);
</script>

<svelte:head>
	<title>{errorTitle} - Wordbook</title>
</svelte:head>

<div class="hero min-h-[60vh]">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-8xl font-bold text-error">{$page.status}</h1>
			<h2 class="text-3xl font-bold mt-4">{errorTitle}</h2>
			<p class="py-6 text-base-content/70">{errorMessage}</p>
			<div class="flex gap-4 justify-center">
				<button class="btn btn-primary" onclick={goBack}>{m.error_go_back()}</button>
				<button class="btn btn-outline" onclick={goHome}>{m.error_go_home()}</button>
			</div>
		</div>
	</div>
</div>
