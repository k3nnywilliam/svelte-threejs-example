<script>
	import { onMount, onDestroy, beforeUpdate } from "svelte";
	import { init, onReload, onRelease } from "./Scene.svelte";
	let container;
	let progress;

	beforeUpdate(() => {
		onReload();
	});

	onMount(() => {
		init(container, progress);
	});

	onDestroy(() => {
		onRelease();
	});
</script>

<main>
	<div id="info">Demo</div>
	<div bind:this={progress} id="progress"></div>
	<div bind:this={container} id="container" />
</main>

<style>
	main {
		text-align: center;
		max-width: 100%;
		width: 100%;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	#info {
		position: absolute;
		top: 10px;
		width: 100%;
		text-align: center;
		z-index: 100;
		display: block;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
