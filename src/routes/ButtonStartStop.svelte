<script>
	export let running = false;
	$: bgColor = running ? '#db1818' : '#6A64F1';
</script>

<button
	on:click
	style="--bg-color: {bgColor}"
	class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
>
	{running ? 'Stop' : 'Start'}
</button>

<style>
	button {
		background-color: var(--bg-color);
	}
</style>
