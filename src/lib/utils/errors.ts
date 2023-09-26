export enum Errors {
	CurrentNetworkIsNotDevnet,
	WalletNotFound
}

export function errorHandler(e: Event) {
	console.log(e);
}

export function unhandledRejectionHandler(event: PromiseRejectionEvent) {
	event.preventDefault();
	event.promise.catch((e) => {
		const msg =
			e === Errors.CurrentNetworkIsNotDevnet
				? 'The current network is not set to devnet.'
				: e === Errors.WalletNotFound
				? 'Petra Wallet is not found.'
				: 'An unknown error is happened.';

		alert(msg);
	});
}
