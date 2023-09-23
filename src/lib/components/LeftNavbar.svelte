<script lang="ts">
	import { walletStore } from '$lib/stores/walletStore';
	import { wordStore } from '$lib/stores/wordStore';
</script>

<nav
	class="flex min-w-fit flex-col justify-between px-3 py-1 min-h-[calc(100vh-16rem)] bg-green-200 border border-green-300 rounded-lg"
>
	<div class="flex flex-col">
		<h2 class="text-lg font-bold">Words In The Dictionary</h2>
		<div class="flex flex-col underline font-medium">
			{#each Object.entries($wordStore) as [word]}
				<a href="/word/{word}">{word}</a>
			{/each}
		</div>
	</div>
	<div class="flex flex-col">
		{#if $walletStore.isConnected}
			<a href="/add-new-word" class="underline font-medium">Add New Word</a>
			<a href="/your-profile" class="underline font-medium">Your Profile</a>
		{/if}
	</div>
</nav>
