<script lang="ts">
	import { goto } from '$app/navigation';
	import AutoComplete from '$lib/components/AutoComplete.svelte';
	import { LANGUAGE_NAMES } from '$lib/types/language';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const fromLangName = $derived(LANGUAGE_NAMES[data.fromLang]);
	const toLangName = $derived(LANGUAGE_NAMES[data.toLang]);

	function handleWordSearch(word: string, lang: string) {
		if (word && word.trim()) {
			// Determine the other language (not the suggestion's language)
			const otherLang = lang === data.fromLang ? data.toLang : data.fromLang;
			// Navigate to: fromLang-toLang/word
			goto(`/${lang}-${otherLang}/${word.toLowerCase()}`);
		}
	}

	function isEmpty(obj: any): boolean {
		return !obj || (Array.isArray(obj.translations) && obj.translations.length === 0);
	}
</script>

<svelte:head>
	<title>{data.word} - Wordbook</title>
	<meta name="description" content="Translation for {data.word}" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Search Section -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-4">Word Lookup</h1>
		<AutoComplete
			placeholder="Search for a word..."
			fromLang={data.fromLang}
			toLang={data.toLang}
			onsubmit={handleWordSearch}
		/>
	</div>

	<!-- Translation Results -->
	<div class="mt-8">
		{#if !isEmpty(data.translations)}
			<div class="mb-8">
				<h2 class="text-2xl font-bold mb-4">{fromLangName} → {toLangName}</h2>

				<div class="overflow-x-auto">
					<table class="table">
						<thead>
							<tr>
								<th class="text-left">{fromLangName}</th>
								<th class="text-right">{toLangName}</th>
							</tr>
						</thead>
						<tbody>
							{#each data.translations?.translations ?? [] as translation, i (i)}
								<tr class="border-t">
									<td class="text-left px-3">
										{data.translations?.word}
										<span class="badge badge-sm badge-outline ml-2">{translation.type}</span>
									</td>
									<td class="text-right px-3">{translation.translation}</td>
								</tr>
								<tr>
									<td colspan="2" class="px-3">
										<p class="mb-1 text-sm">{translation.description}</p>
										<p class="italic text-sm opacity-70">{translation.example}</p>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{:else}
			<div class="alert alert-info">
				<span>No translations found.</span>
			</div>
		{/if}
	</div>
</div>
