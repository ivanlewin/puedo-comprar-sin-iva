<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="p-2 text-green-700 bg-green-100 rounded-md md:p-4 {className}">
	<div class="flex items-center">
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
			class="w-5 h-5 mr-2"
		>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<polyline points="22 4 12 14.01 9 11.01" />
		</svg>
		<span><slot /></span>
	</div>
</div>
