<script lang="ts">
	import { base } from '$app/paths';
	import { contract } from '$lib/stores/contract';
	import { wallet } from '$lib/stores/wallet';
</script>

<nav
	class="flex min-w-fit flex-col justify-between px-3 py-1 min-h-[calc(100vh-16rem)] bg-green-200 border border-green-300 rounded-lg">
	<div class="flex flex-col">
		<h2 class="text-lg font-bold select-none">Words In The Dictionary</h2>
		<div class="flex flex-col underline font-medium text-green-600">
			{#if $contract?.words}
				{#each $contract.words as [word]}
					<a href="{base}/word/{word}">{word}</a>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex flex-col">
		{#if $wallet.isConnected}
			<a href="{base}/add-new-word" class="underline font-medium">Add New Word</a>
			<a href="{base}/your-profile" class="underline font-medium">Your Profile</a>
		{/if}
	</div>
</nav>
