<script>
	/**
	 * @type {number}
	 */
	export let value;
	/**
	 * @type {string}
	 */
	export let label;
	/**
	 * @type {string=}
	 */
	export let placeholder = undefined;
</script>

<label>
	{label}
	<input
		type="number"
		{placeholder}
		class="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
		bind:value
	/>
</label>
