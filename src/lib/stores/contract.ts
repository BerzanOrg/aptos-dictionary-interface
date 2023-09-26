import { Network, Provider } from 'aptos';
import { readable, writable } from 'svelte/store';
import { wallet } from './wallet';

interface ContractStore {
	is_loading: boolean;
	words: Map<string, Array<Entry>>;
	authors: Map<string, Author>;
}

export interface Entry {
	author_addr: string;
	definition: string;
}

interface Author {
	biography: string;
	profile_picture: string;
}

const createContractStore = () => {
	const { set, update, subscribe } = writable<ContractStore>({
		is_loading: true,
		authors: new Map(),
		words: new Map()
	});
	const provider = new Provider(Network.DEVNET);
	const CONTRACT_ADDR = '0x79950c085acc1529fda18555cbc9510fddb882d0ed3475af97af1b067dea0275';

	async function loadDataFromChain() {
		const resource = await provider.getAccountResource(
			CONTRACT_ADDR,
			`${CONTRACT_ADDR}::main::Storage`
		);

		const dataFromChain = resource.data as Resource;

		const authors: Map<string, Author> = new Map();
		dataFromChain.authors.forEach(({ addr, biography, profile_picture }) =>
			authors.set(addr, { biography, profile_picture })
		);

		const words: Map<string, Array<Entry>> = new Map();
		dataFromChain.dictionary.forEach(({ word, author_addr, definition }) => {
			const entry = { author_addr, definition };
			const entries = words.get(word);
			entries ? entries.push(entry) : words.set(word, [entry]);
		});

		set({
			is_loading: false,
			authors,
			words
		});
	}

	async function addEntry(word: string, definition: string, author_addr: string) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${CONTRACT_ADDR}::main::add_entry`,
			arguments: [word, definition],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			const entries = oldState.words.get(word);

			entries?.push({
				author_addr,
				definition
			});

			return oldState;
		});
	}

	async function updateAuthor(
		old_biography: string,
		old_profile_picture: string,
		new_biography: string,
		new_profile_picture: string,
		author_addr: string
	) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${CONTRACT_ADDR}::main::update_author`,
			arguments: [old_biography, old_profile_picture, new_biography, new_profile_picture],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			oldState.authors.set(author_addr, {
				biography: new_biography,
				profile_picture: new_profile_picture
			});

			return oldState;
		});
	}

	return {
		subscribe,
		loadDataFromChain,
		addEntry,
		updateAuthor
	};
};

export const contract = createContractStore();

interface Resource {
	dictionary: Array<{
		word: string;
		definition: string;
		author_addr: string;
	}>;
	authors: Array<{
		addr: string;
		biography: string;
		profile_picture: string;
	}>;
}
