<script>
  import "../app.css";
</script>

<header>
	<a href="/">
		Página principal
	</a>
	<a href="/actividades-incluidas">
		Actividades incluidas en el programa
	</a>
</header>
<slot />
<footer>
	<p>
		Hecho por
		<a href="https://www.ivanlewin.com" target="_blank" class="text-blue-600">Iván Lewin</a>
	</p>
</footer>

<style lang="postcss">
	footer {
		@apply h-8 w-full text-center;
	}
</style>
