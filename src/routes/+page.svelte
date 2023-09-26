<script>
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract';

	$: getRandomWord = () => {
		const words = Array.from($contract.words.keys());
		if (words.length === 0) return '';
		const randomIndex = Math.floor(Math.random() * words.length);
		const randomWord = words[randomIndex];
		return randomWord;
	};
</script>

<main
	class="flex flex-col px-3 py-2 bg-green-200 border border-green-300 rounded-lg w-full gap-6 justify-center">
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-bold text-green-700 text-center">Welcome to Aptos Dictionary</h1>
		<p class="font-semibold text-center text-green-600">
			You are in the colloborative dictionary of Aptos. Anyone can be an author of this great
			dictionary.
		</p>
	</div>

	<div class="flex max-w-md self-center gap-8">
		<a
			href="{base}/word/{getRandomWord()}"
			class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150">
			Visit a Random Page
		</a>

		<a
			href="https://github.com/BerzanXYZ/aptos-dictionary-interface"
			class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150"
			target="_blank">
			Visit the Repository
		</a>
	</div>
</main>
