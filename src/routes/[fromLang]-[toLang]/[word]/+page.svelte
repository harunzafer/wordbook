<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import TranslationTable from '$lib/components/TranslationTable.svelte';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.word} - Wordbook</title>
	<meta name="description" content="Translation for {data.word}" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Search Section -->
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-4">{m.word_lookup_title()}</h1>
		<SearchBox placeholder={m.search_placeholder()} />
	</div>

	<!-- Translation Results -->
	<div class="mt-8">
		<TranslationTable
			translations={data.translations}
			fromLang={data.fromLang}
			toLang={data.toLang}
		/>
	</div>
</div>
