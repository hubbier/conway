<script>
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		document.title = "Conway's Game of Life";
	});
</script>

<slot />
