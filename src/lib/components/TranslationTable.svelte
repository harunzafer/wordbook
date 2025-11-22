<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import type { Language } from '$lib/types/language';

	interface Translation {
		word: string;
		translation: string;
		description: string;
		example: string;
		type: string;
	}

	interface TranslationData {
		word: string;
		translations: Translation[];
	}

	interface Props {
		translations: TranslationData | null;
		fromLang: Language;
		toLang: Language;
		showEmptyMessage?: boolean;
	}

	let { translations = null, fromLang, toLang, showEmptyMessage = true }: Props = $props();

	// Map language codes to translated language names
	function getLanguageName(lang: Language): string {
		const langNames: Record<Language, () => string> = {
			en: m.lang_en,
			fr: m.lang_fr,
			de: m.lang_de,
			it: m.lang_it,
			pl: m.lang_pl,
			pt: m.lang_pt,
			es: m.lang_es,
			tr: m.lang_tr
		};
		return langNames[lang]?.() ?? lang;
	}

	const fromLangName = $derived(getLanguageName(fromLang));
	const toLangName = $derived(getLanguageName(toLang));

	function isEmpty(obj: TranslationData | null): boolean {
		return !obj || (Array.isArray(obj.translations) && obj.translations.length === 0);
	}
</script>

{#if !isEmpty(translations)}
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
					{#each translations?.translations ?? [] as translation, i (i)}
						<tr class="border-t">
							<td class="text-left px-3">
								{translations?.word}
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
{:else if showEmptyMessage}
	<div class="alert alert-info alert-soft">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-current"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>{m.no_translations_found()}</span>
	</div>
{/if}
