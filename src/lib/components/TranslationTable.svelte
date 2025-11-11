<script lang="ts">
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
		toFirstLangTranslations?: TranslationData | null;
		fromFirstLangTranslations?: TranslationData | null;
		firstLang?: string;
		secondLang?: string;
	}

	let {
		toFirstLangTranslations = null,
		fromFirstLangTranslations = null,
		firstLang = 'English',
		secondLang = 'French'
	}: Props = $props();

	function isEmpty(obj: any): boolean {
		return !obj || (Array.isArray(obj.translations) && obj.translations.length === 0);
	}
</script>

{#if !isEmpty(toFirstLangTranslations)}
	<div class="mb-8">
		<h2 class="text-2xl font-bold mb-4">{firstLang} → {secondLang}</h2>

		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th class="text-left">{firstLang}</th>
						<th class="text-right">{secondLang}</th>
					</tr>
				</thead>
				<tbody>
					{#each toFirstLangTranslations?.translations ?? [] as translation}
						<tr class="border-t">
							<td class="text-left px-3">
								{toFirstLangTranslations?.word}
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
{/if}

{#if !isEmpty(fromFirstLangTranslations)}
	<div class="mb-8">
		<h2 class="text-2xl font-bold mb-4">{secondLang} → {firstLang}</h2>

		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th class="text-left">{secondLang}</th>
						<th class="text-right">{firstLang}</th>
					</tr>
				</thead>
				<tbody>
					{#each fromFirstLangTranslations?.translations ?? [] as translation}
						<tr class="border-t">
							<td class="text-left px-3">
								{fromFirstLangTranslations?.word}
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
{/if}

{#if isEmpty(toFirstLangTranslations) && isEmpty(fromFirstLangTranslations)}
	<div class="alert alert-info">
		<span>No translations found.</span>
	</div>
{/if}
