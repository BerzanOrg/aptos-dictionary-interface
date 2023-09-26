<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract';
	import { wallet } from '$lib/stores/wallet';
	import { Errors } from '$lib/utils/errors';

	function addNewWordHandler() {
		let newWord = prompt('Word to add:');

		if (!newWord) return;
		if ($contract.definitions.has(newWord)) throw Errors.WordAlreadyExists;

		// replace spaces with hyphen
		newWord = newWord
			.toLowerCase()
			.split(' ')
			.map((s) => s.trim())
			.filter((s) => s)
			.join('-');

		// redirect user to the new word's page
		goto(`${base}/word/${newWord}`);
	}
</script>

<nav
	class="flex min-w-fit flex-col justify-between px-3 pt-1 pb-5 min-h-[calc(100vh-16rem)] bg-green-200 border border-green-300 rounded-lg">
	<div class="flex flex-col">
		<h2 class="text-lg font-bold select-none">Words In The Dictionary</h2>
		<div class="flex flex-col gap-0.5 underline font-medium text-green-700">
			{#if $contract?.definitions}
				{#each $contract.definitions as [word]}
					<a href="{base}/word/{word}">{word}</a>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-1">
		{#if $wallet.isConnected}
			<button on:click={addNewWordHandler} class="underline font-medium">Add New Word</button>
			<a href="{base}/your-profile" class="underline font-medium text-center">Your Profile</a>
		{/if}
	</div>
</nav>
