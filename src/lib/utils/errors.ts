export enum Errors {
	CurrentNetworkIsNotDevnet,
	WalletNotFound,
	WordDefinitionIsEmpty,
	WordAlreadyExists
}

function alertError(e: any) {
	switch (e) {
		case Errors.CurrentNetworkIsNotDevnet:
			alert('The current network is not set to devnet.');
			break;
		case Errors.WalletNotFound:
			alert('Petra Wallet is not found.');
			break;
		case Errors.WordDefinitionIsEmpty:
			alert('Definition is empty.');
			break;
		case Errors.WordAlreadyExists:
			alert('This word already exists in the dictionary.');
			break;
		default:
			alert('An unknown error is happened.');
	}
}

export function errorHandler(e: Event) {
	e.preventDefault();

	alertError((e as any).error);
}

export function unhandledRejectionHandler(event: PromiseRejectionEvent) {
	event.preventDefault();

	event.promise.catch(alertError);
}
