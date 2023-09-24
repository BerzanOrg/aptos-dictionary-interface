<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex flex-col px-3 py-1 bg-green-200 border border-green-300 rounded-lg w-full">
	<h1>{$page.error?.message}</h1>
</main>
