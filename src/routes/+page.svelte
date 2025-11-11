<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AutoComplete from '$lib/components/AutoComplete.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { preferences } from '$lib/stores/preferences.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let showTooltip = $state(false);

	onMount(() => {
		// Show tooltip for first-time users
		if (preferences.isFirstVisit()) {
			showTooltip = true;
			// Mark as visited now that we've shown the tooltip
			preferences.markVisited();
			// Auto-hide after 10 seconds
			setTimeout(() => {
				showTooltip = false;
			}, 10000);
		}
	});

	function handleSearch(word: string, lang: string) {
		if (word && word.trim()) {
			// Determine the other language (not the suggestion's language)
			const otherLang = lang === 'en' ? preferences.language : 'en';
			// Navigate to: fromLang-toLang/word
			goto(`/${lang}-${otherLang}/${word.toLowerCase()}`);
		}
	}

	function hideTooltip() {
		showTooltip = false;
	}
</script>

<svelte:head>
	<title>{m.site_title()}</title>
	<meta
		name="description"
		content={m.site_description()}
	/>
</svelte:head>

<div class="hero min-h-[60vh] pb-96">
	<div class="hero-content text-center">
		<div class="max-w-md w-full">
			<h1 class="text-5xl font-bold">{m.home_welcome()}</h1>
			<p class="py-6">
				{m.home_description()}
			</p>

			<div class="w-full relative">
				<AutoComplete
					placeholder={m.search_placeholder()}
					fromLang="en"
					toLang={preferences.language}
					onsubmit={handleSearch}
				>
					{#snippet languageSelector()}
						<LanguageSelector
							bind:value={preferences.language}
							onchange={hideTooltip}
							compact={true}
						/>
					{/snippet}
				</AutoComplete>

				{#if showTooltip}
					<div
						class="absolute -top-16 right-16 bg-primary text-primary-content px-4 py-2 rounded-lg shadow-lg z-2 whitespace-nowrap opacity-90"
						role="tooltip"
					>
						<div class="flex items-center gap-2">
							<span>👆 {m.tooltip_select_language()}</span>
							<button
								type="button"
								class="btn btn-ghost btn-xs btn-circle"
								onclick={hideTooltip}
								aria-label="Close tooltip"
							>
								✕
							</button>
						</div>
						<div
							class="absolute top-full right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary opacity-90"
						></div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<div class="grid gap-6 md:grid-cols-3">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_definitions_title()}</h2>
			<p>{m.feature_definitions_description()}</p>
		</div>
	</div>

	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_examples_title()}</h2>
			<p>{m.feature_examples_description()}</p>
		</div>
	</div>

	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{m.feature_languages_title()}</h2>
			<p>{m.feature_languages_description()}</p>
		</div>
	</div>
</div>
