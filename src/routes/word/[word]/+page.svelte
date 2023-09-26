<script lang="ts">
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract.js';
	import { wallet } from '$lib/stores/wallet.js';
	import { Errors } from '$lib/utils/errors';
	import { autoRowsHandler, disableNewlineHandler } from '$lib/utils/textarea.js';

	export let data;

	/** Definitions for the word of the current page.*/
	$: definitions = $contract?.definitions.get(data.word);

	/** Binded value for definiton written in textarea. */
	let definition: string = '';

	/** Requests user to make a transaction to add a new definition for the word of the current page. */
	async function addDefinition() {
		if (definition === '' || !$wallet.address) throw Errors.WordDefinitionIsEmpty;

		await contract.addDefinition(data.word, definition, $wallet.address);

		definition = '';
	}
</script>

<main
	class="flex flex-col px-4 pt-2 pb-16 gap-6 bg-green-200 border border-green-300 rounded-lg w-full">
	<a href="{base}/word/{data.word}">
		<h1 class="text-4xl font-bold underline text-green-600">
			{data.word}
		</h1>
	</a>
	<div class="flex flex-col gap-5">
		{#if definitions}
			{#each definitions as definition}
				<div
					class="flex flex-col bg-green-300 border border-green-400 px-3 pt-1 pb-2 gap-2 rounded-lg">
					<p class="font-semibold">{definition.content}</p>
					<div class="flex justify-end gap-3">
						<div
							class="flex flex-col items-end text-green-600 font-['Inconsolata',mono-space] text-sm font-medium">
							<a href="{base}/author/{definition.author_addr}" class="underline">
								{definition.author_addr}</a>
							<p>{definition.datetime}</p>
						</div>
						<img
							src={$contract?.authorProfiles.get(definition.author_addr)?.picture ||
								`${base}/default_profile_picture.png`}
							alt="profile photo of author {definition.author_addr}"
							class="h-11 w-11 rounded-full border border-green-500" />
					</div>
				</div>
			{/each}
		{:else}
			<p>There is no entry</p>
		{/if}

		<div
			class="flex bg-green-100 border border-green-400 px-3 pt-1.5 pb-3 gap-3 rounded-lg items-end {!$wallet.isConnected &&
				'cursor-not-allowed'}">
			<textarea
				disabled={!$wallet.isConnected}
				rows="4"
				maxlength="1024"
				placeholder={$wallet.isConnected
					? `Write your own definition for ${data.word}...`
					: `You must connect your wallet before adding your own definition for ${data.word}...`}
				bind:value={definition}
				on:keydown={disableNewlineHandler}
				on:input={autoRowsHandler}
				class="w-full bg-green-100 text-green-700 outline-none resize-none placeholder:text-green-700/50 disabled:cursor-not-allowed" />
			<button
				disabled={!$wallet.isConnected}
				on:click={addDefinition}
				class="font-bold bg-green-300 px-3 border text-green-700 border-green-500 py-1 rounded-full hover:bg-green-400/80 disabled:hover:bg-green-300 duration-15 disabled:cursor-not-allowed">
				Add
			</button>
		</div>
	</div>
</main>
