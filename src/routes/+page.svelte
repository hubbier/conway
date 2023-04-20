<script context="module">
	/**
	 * Returns the number of neighbors for the cell identified by y and x.
	 * @param {number} y
	 * @param {number} x
	 * @param {boolean[][]} grid
	 * @returns {number}
	 */
	export function countNeighbors(y, x, grid) {
		const gridSize = grid.length;
		let neighborPositions = [
			[y - 1, x - 1],
			[y - 1, x],
			[y - 1, x + 1],
			[y, x - 1],
			[y, x + 1],
			[y + 1, x - 1],
			[y + 1, x],
			[y + 1, x + 1]
		];
		let neighborCount = 0;
		for (const [y_, x_] of neighborPositions) {
			if (y_ < 0 || y_ >= gridSize || x_ < 0 || x_ >= gridSize) continue;
			if (grid[y_][x_]) neighborCount++;
		}
		return neighborCount;
	}

	/**
	 * Return an empty square two-dimensional array of the specified size.
	 * @param {number} size
	 * @returns {boolean[][]}
	 */
	export function emptyGrid(size) {
		return new Array(size).fill(false).map(() => new Array(size).fill(false));
	}

	/**
	 * Return true if the cell should live next generation and false if it should die.
	 * @param {boolean} cell
	 * @param {number} neighborCount
	 * @returns {boolean}
	 */
	export function cellPrognosis(cell, neighborCount) {
		if (!cell && neighborCount === 3) return true;
		if (cell && neighborCount !== 2 && neighborCount !== 3) return false;
		return cell;
	}

	/**
	 * Return a new two-dimensional array representing the next generation.
	 * @param {boolean[][]} grid
	 * @returns {boolean[][]}
	 */
	export function nextGeneration(grid) {
		const nextGrid = emptyGrid(grid.length);
		for (let y = 0; y < grid.length; y++) {
			const row = grid[y];
			for (let x = 0; x < row.length; x++) {
				const cell = row[x];
				const neighborCount = countNeighbors(y, x, grid);
				nextGrid[y][x] = cellPrognosis(cell, neighborCount);
			}
		}
		return nextGrid;
	}
</script>

<script>
	import Button from './Button.svelte';
	import ButtonStartStop from './ButtonStartStop.svelte';
	import InputNumber from './InputNumber.svelte';

	let gridSize = 30;
	let lifeSpan = 500;
	$: grid = emptyGrid(gridSize);
	$: neighbors = new Array(gridSize).fill(Array(gridSize));
	// $: console.log(`gridSize: ${gridSize}`);
	// $: console.log(`typeof gridSize: ${typeof gridSize}`);
	// $: console.log(`grid: ${grid}`);
	let running = false;

	/**
	 * Toggle the value of the cell identified by y and x.
	 * @param {number} y
	 * @param {number} x
	 */
	function toggleCell(y, x) {
		grid[y][x] = !grid[y][x];
		grid = grid;
	}

	/**
	 * @type {string | number | NodeJS.Timeout | undefined}
	 */
	let interval;
	$: {
		clearInterval(interval);
		interval = setInterval(() => {
			if (!running) return;
			grid = nextGeneration(grid);
		}, lifeSpan);
	}

	/**
	 * Remove all live cells.
	 */
	function clearGrid() {
		grid = emptyGrid(gridSize);
	}
</script>

<div class="p-10">
	<h1 class="text-3xl font-bold underline">Conway's Game of Life</h1>

	<div class="flex pt-10">
		<div class="flex flex-col gap-4 p-4">
			<h2 class="text-xl font-bold">Settings</h2>
			<InputNumber bind:value={gridSize} label="Grid Size" />
			<InputNumber bind:value={lifeSpan} label="Speed" />
			<ButtonStartStop on:click={() => (running = !running)} {running} />
			<Button on:click={clearGrid}>Clear</Button>
		</div>
		<div class="grid gap-px w-full bg-slate-200" style="--grid-size: {gridSize}">
			{#each grid as row, y}
				{#each row as cell, x}
					<div
						class="aspect-square bg-white"
						class:alive={cell}
						on:mousedown={() => toggleCell(y, x)}
						on:mouseenter={(e) => {
							if ((e.buttons & 1) === 1) toggleCell(y, x);
						}}
						on:keyup={() => toggleCell(y, x)}
						on:dragstart|preventDefault
					/>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: rgb(243 244 246);
	}
	.grid {
		grid-template-columns: repeat(var(--grid-size), minmax(0, 1fr));
		grid-template-rows: repeat(var(--grid-size), minmax(0, 1fr));
		user-drag: none;
	}
	.alive {
		background-color: darkslategray;
	}
</style>
