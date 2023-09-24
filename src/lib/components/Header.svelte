<script lang="ts">
	import { wallet } from '$lib/stores/wallet';
</script>

<header
	class="sticky top-0 z-30 flex justify-between items-center h-16 bg-green-300/50 border-b border-green-300 backdrop-blur-sm px-6 select-none">
	<a href="/" class="text-2xl font-bold">Aptos Dictionary</a>
	<button
		class="font-bold bg-green-400/60 hover:bg-green-500/60 border border-green-500 px-4 py-1 rounded-full duration-150"
		on:click={$wallet.isConnected ? wallet.disconnect : wallet.connect}>
		{#if $wallet.isConnected}
			Disconnect
		{:else}
			Connect
		{/if}
	</button>
</header>
