<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import LeftNavbar from '$lib/components/LeftNavbar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { wallet } from '$lib/stores/wallet';
	import { Errors } from '$lib/utils/errors';

	onMount(wallet.onMountCallback);
</script>

<Header />
<div class="flex max-w-6xl mx-auto p-4 gap-4">
	<LeftNavbar />
	<slot />
</div>
<Footer />

<svelte:window
	on:error={(e) => {
		console.log(e);
	}}
	on:unhandledrejection={async (e) => {
		e.preventDefault();
		e.promise.catch((e) => {
			const msg =
				e === Errors.CurrentNetworkIsNotDevnet
					? 'The current network is not set to devnet.'
					: e === Errors.WalletNotFound
					? 'Petra Wallet is not found.'
					: 'An unknown error is happened.';

			alert(msg);
		});
	}} />
