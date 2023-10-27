<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<script>
	// @ts-nocheck

	let data = [];

	let apiURL = 'http://localhost:8080/api/books/all';
	let apiFindURL = 'http://localhost:8080/api/books/find?';
	let apiFindFuzzyURL = 'http://localhost:8080/api/books/find/fuzzy?';


	async function getAllBooks() {
		if (data.length !== 0) {
			data = [];
		} else {
			const response = await fetch(apiURL);
			data = await response.json();
		}
	}

	function toggleBook(id) {
		let doc = document.getElementById(id).getAttribute('class');
		if (doc === '') {
			document.getElementById(id).setAttribute('class', 'hidden');
		} else {
			document.getElementById(id).setAttribute('class', '');
		}
	}

	let selectedParams = null;
	function prepareParams(param) {
		if (selectedParams === param) {
			selectedParams = null;
		} else {
			selectedParams = param;
		}
		console.log(selectedParams);
	}

	async function searchBook(param, value) {
		let url = '';
		console.log('Searching %s', param);
		if (param !== null) {
			url = apiFindURL + param + '=' + value;
		} else {
			url = apiFindFuzzyURL + 'q=' + value;
		}
		const response = await fetch(url);
		data = await response.json();
		if (!data) {
			data = [''];
		}
	}

	let selectedValue = null;

	function searchBookWrapper() {
		searchBook(selectedParams, selectedValue);
	}
</script>

<div style="font-family: 'JetBrains Mono', monospace;">
	<div class="bg-gradient-to-b from-base to-crust">
		<header>
			<form>
				<div class="flex">
					<label
						for="search-dropdown"
						class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>seanden522@gmail.com</label
					>
					<button
						id="dropdown-button"
						data-dropdown-toggle="dropdown"
						class="bg-surface0 bg-transparent flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-text border border-base rounded-l-lg hover:bg-surface0/80 focus:ring-4 focus:outline-none focus:ring-base/80"
						type="button"
						>{selectedParams
							? selectedParams.toString().charAt(0).toUpperCase() +
							  selectedParams.toString().slice(1)
							: 'All attributes'}<svg
							class="w-2.5 h-2.5 ml-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 4 4 4-4"
							/>
						</svg></button
					>
					<div
						id="dropdown"
						class="z-10 hidden bg-surface0 bg-transparent divide-y divide-gray-100 rounded-lg shadow-2xl w-44"
					>
						<ul class="py-2 text-sm text-text" aria-labelledby="dropdown-button">
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 hover:bg-surface0/80"
									on:click={() => prepareParams('title')}>Title</button
								>
							</li>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 hover:bg-surface0/80"
									on:click={() => prepareParams('author')}>Author</button
								>
							</li>
							<li>
								<button
									type="button"
									class="inline-flex w-full px-4 py-2 hover:bg-surface0/80"
									on:click={() => prepareParams('text')}>Text</button
								>
							</li>
						</ul>
					</div>
					<div class="relative w-full">
						<input
							type="search"
							id="search-dropdown"
							class="block p-2.5 w-full z-20 text-sm text-text placeholder-subtext0 bg-surface0 bg-transparent rounded-r-lg border-base border-l-2 border focus:ring-pink focus:border-pink"
							placeholder="Search books by {selectedParams ? selectedParams : ''}..."
							required
							bind:value={selectedValue}
						/>
						<button
							type="submit"
							class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-crust bg-pink rounded-r-lg border border-pink hover:bg-pink/80 focus:ring-4 focus:outline-none focus:ring-pink"
							on:click={() => searchBookWrapper()}
						>
							<svg
								class="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
							<span class="sr-only">Search</span>
						</button>
					</div>
				</div>
			</form>
		</header>

		<main class="h-screen flex flex-col justify-center items-center p-6 text-text">
			<div class="text-center">
				<h1>Welcome to the <b>New Imperial Library</b> 📚</h1>
				<p>Find documentation by using the search bar 🔎 at the top of the page</p>
				<p>Or press <b><button on:click={getAllBooks}>here</button></b> to get all documentation</p>
				<p><br /><br /></p>
			</div>

			<div
				class="overflow-hidden touch-auto focus:overflow-scroll hover:overflow-scroll scroll shadow-2xl"
				style="width: 75%;"
				id="data-section"
			>
				{#each data as item, count}
					<div id="accordion-collapse-{count}" data-accordion="collapse">
						<h2 id="accordion-collapse-heading-{count}">
							<button
								type="button"
								class="flex items-center justify-between w-full p-5 font-medium text-center text-text border border-b-0 border-base rounded-t-xl focus:ring-4 focus:ring-base/80 hover:bg-surface0/80"
								data-accordion-target="#accordion-collapse-body-{count}"
								aria-expanded="true"
								aria-controls="accordion-collapse-body-{count}"
								on:click={() => toggleBook('accordion-collapse-body-' + count)}
							>
								<span>{item.title} - {item.author}</span>
								<svg
									data-accordion-icon
									class="w-3 h-3 rotate-180 shrink-0"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 10 6"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5 5 1 1 5"
									/>
								</svg>
							</button>
						</h2>
						<div
							id="accordion-collapse-body-{count}"
							class="hidden"
							aria-labelledby="accordion-collapse-heading-{count}"
						>
							<div class="p-5 border border-b-0 border-base bg-crust">
								{item.text}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</main>
		<footer class="w-full bg-pink text-center p-1 font-normal text-crust">
			Built By: seanpden
		</footer>

		<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
	</div>
</div>
