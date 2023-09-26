export enum Errors {
	CurrentNetworkIsNotDevnet,
	WalletNotFound,
	WordDefinitionIsEmpty
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
				: e === Errors.WordDefinitionIsEmpty
				? 'Definition is empty.'
				: 'An unknown error is happened.';

		alert(msg);
	});
}
