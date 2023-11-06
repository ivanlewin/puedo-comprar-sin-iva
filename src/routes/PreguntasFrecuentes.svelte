<script>
	let faq = [];
</script>

<div class="w-full mt-4" data-orientation="vertical">
	<div data-state="open" data-orientation="vertical" class="border-b">
		<h3 data-orientation="vertical" data-state="open" class="flex">
			<button
				type="button"
				aria-expanded="true"
				data-state="open"
				data-orientation="vertical"
				id="radix-:r5s:"
				class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]>svg]:rotate-180 hover:underline-none"
			>
				Why does turning my device off and on again solve all issues?
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4 h-4 transition-transform duration-200 shrink-0"><path d="m6 9 6 6 6-6" /></svg
				></button
			>
		</h3>
		<div
			data-state="open"
			id="radix-:r5t:"
			role="region"
			aria-labelledby="radix-:r5s:"
			data-orientation="vertical"
			class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width); --radix-collapsible-content-height: 36px; --radix-collapsible-content-width: 500px;"
		>
			<div class="pt-0 pb-4">Because it clears the memory and starts the system from scratch.</div>
		</div>
	</div>
	<div data-state="closed" data-orientation="vertical" class="border-b">
		<h3 data-orientation="vertical" data-state="closed" class="flex">
			<button
				type="button"
				aria-expanded="false"
				data-state="closed"
				data-orientation="vertical"
				id="radix-:r5u:"
				class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]>svg]:rotate-180 hover:underline-none"
				data-id="10"
			>
				Are extra cables in the box bonus decorations?
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4 h-4 transition-transform duration-200 shrink-0"><path d="m6 9 6 6 6-6" /></svg
				></button
			>
		</h3>
		<div
			data-state="closed"
			id="radix-:r5v:"
			hidden=""
			role="region"
			aria-labelledby="radix-:r5u:"
			data-orientation="vertical"
			class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
			data-id="11"
			style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
		/>
	</div>
</div>

<style lang="postcss">
	section {
		@apply w-full py-12 md:py-24 lg:py-32 xl:py-48;
	}
	section > div {
		@apply container flex flex-col items-center px-4 space-y-2 text-center md:px-6 max-w-none;
	}
	footer {
		@apply absolute w-full text-center bottom-1;
	}
</style>
