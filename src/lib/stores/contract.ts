import { Network, Provider } from 'aptos';
import { readable, writable } from 'svelte/store';
import { wallet } from './wallet';

interface ContractStore {
	is_loading: boolean;
	words: Map<string, Array<Definitions>>;
	authorProfiles: Map<string, AuthorProfile>;
}

export interface Definitions {
	author_addr: string;
	content: string;
}

interface AuthorProfile {
	biography: string;
	picture: string;
}

const createContractStore = () => {
	const { set, update, subscribe } = writable<ContractStore>({
		is_loading: true,
		authorProfiles: new Map(),
		words: new Map()
	});

	const MODULE_ADDR = '0xa584955f037c08173d6cfae3d042bcc710f88b3581f55cbe2f42b51cf70e5c6d';
	const provider = new Provider(Network.DEVNET);

	async function loadDataFromChain() {
		const resource = await provider.getAccountResource(
			MODULE_ADDR,
			`${MODULE_ADDR}::dictionary::Dictionary`
		);

		const dataFromChain = resource.data as Resource;

		const authors: Map<string, AuthorProfile> = new Map();
		dataFromChain.author_profiles.forEach(({ addr, biography, picture }) =>
			authors.set(addr, { biography, picture })
		);

		const words: Map<string, Array<Definitions>> = new Map();
		dataFromChain.definitions.forEach(({ word, author_addr, content }) => {
			const entry = { author_addr, content };
			const entries = words.get(word);
			entries ? entries.push(entry) : words.set(word, [entry]);
		});

		set({
			is_loading: false,
			authorProfiles: authors,
			words
		});
	}

	async function addDefinition(word: string, definition: string, author_addr: string) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${MODULE_ADDR}::dictionary::add_definition`,
			arguments: [word, definition],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			if (!oldState.words.has(word)) oldState.words.set(word, []);

			const entries = oldState.words.get(word);

			entries?.push({
				author_addr,
				content: definition
			});

			return {
				...oldState
			};
		});
	}

	async function updateProfile(
		current_biography: string,
		current_picture: string,
		new_biography: string,
		new_picture: string,
		author_addr: string
	) {
		const hash = await wallet.signAndSubmitTransaction({
			type: 'entry_function_payload',
			function: `${MODULE_ADDR}::dictionary::update_profile`,
			arguments: [current_biography, current_picture, new_biography, new_picture],
			type_arguments: []
		});

		await provider.waitForTransaction(hash);

		update((oldState) => {
			oldState.authorProfiles.set(author_addr, {
				biography: new_biography,
				picture: new_picture
			});

			return oldState;
		});
	}

	return {
		subscribe,
		loadDataFromChain,
		addDefinition,
		updateProfile
	};
};

export const contract = createContractStore();

interface Resource {
	definitions: Array<{
		word: string;
		content: string;
		author_addr: string;
	}>;
	author_profiles: Array<{
		addr: string;
		biography: string;
		picture: string;
	}>;
}
