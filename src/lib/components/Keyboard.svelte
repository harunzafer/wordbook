<script lang="ts">
	import KeyboardIcon from 'lucide-svelte/icons/keyboard';
	import type { Language } from '$lib/types/language';

	interface Props {
		lang: Language;
		oncharacterclick?: (character: string) => void;
	}

	let { lang, oncharacterclick }: Props = $props();

	let isOpen = $state(false);

	function toggleKeyboard() {
		isOpen = !isOpen;
	}

	function handleCharacterClick(character: string) {
		if (oncharacterclick) {
			oncharacterclick(character);
		}
	}

	interface KeyboardLayout {
		id: number;
		code: Language;
		keys: string[];
	}

	const layouts: KeyboardLayout[] = [
		{
			id: 1,
			code: 'de',
			keys: ['ä', 'ö', 'ü', 'ß']
		},
		{
			id: 2,
			code: 'es',
			keys: ['ñ', 'á', 'é', 'í', 'ó', 'ú']
		},
		{
			id: 3,
			code: 'fr',
			keys: ['é', 'è', 'ê', 'à', 'ô', 'û', 'ç']
		},
		{
			id: 4,
			code: 'it',
			keys: ['à', 'è', 'é', 'ì', 'ò', 'ù']
		},
		{
			id: 5,
			code: 'pl',
			keys: ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż']
		},
		{
			id: 6,
			code: 'pt',
			keys: ['á', 'â', 'ã', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú']
		},
		{
			id: 7,
			code: 'tr',
			keys: ['ç', 'ı', 'ğ', 'ö', 'ş', 'ü']
		}
	];

	const layoutsDict = $derived(
		layouts.reduce(
			(dict, layout) => {
				dict[layout.code] = layout;
				return dict;
			},
			{} as Record<Language, KeyboardLayout>
		)
	);

	const currentLayout = $derived(layoutsDict[lang]);
	const hasLayout = $derived(!!currentLayout);
</script>

{#if hasLayout}
	<div class="relative">
		<!-- Keyboard Toggle Button -->
		<button
			type="button"
			class="btn btn-sm btn-ghost btn-square"
			onclick={toggleKeyboard}
			aria-label="Special characters keyboard"
		>
			<KeyboardIcon size={18} />
		</button>

		<!-- Character Buttons -->
		{#if isOpen}
			<div
				role="menu"
				tabindex="-1"
				class="absolute top-full mt-2 right-0 z-50 bg-base-100 border border-base-300 rounded-box shadow-lg p-0 flex flex-wrap gap-1 max-w-xs"
			>
				{#each currentLayout.keys as key (key)}
					<button
						type="button"
						class="btn btn-sm btn-ghost min-w-8 px-1"
						onclick={() => handleCharacterClick(key)}
					>
						{key}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
