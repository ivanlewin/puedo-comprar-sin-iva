<script lang="ts">
	import Error from '../components/Error.svelte';
	import Success from '../components/Success.svelte';
	import { validarCUIT } from '../utils';
	import type { ConsultaDeComerciosResponse } from './api/consulta-de-comercios/+server';
	import PreguntasFrecuentes from './PreguntasFrecuentes.svelte';
	import EnlacesUtiles from './EnlacesUtiles.svelte';

	let errorMessage = '';
	let respuestaConsulta: ConsultaDeComerciosResponse | undefined = undefined;
	let cuitInput = '';

	const handleFormSubmit: HTMLFormElement['onsubmit'] = async (event) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const cuit = formData.get('cuit');
		errorMessage = '';
		if (!cuit) {
			errorMessage = 'El CUIT no puede estar vacío';
			return;
		}
		if (typeof cuit !== 'string' || !validarCUIT(cuit)) {
			errorMessage = 'El CUIT ingresado no es válido';
			return;
		}

		try {
			errorMessage = '';
			const response = await fetch('/api/consulta-de-comercios', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ cuit })
			});
			const json = await response.json();
			respuestaConsulta = json as ConsultaDeComerciosResponse;
		} catch (error) {
			console.error(error);
			if (
				typeof error === 'object' &&
				error &&
				'message' in error &&
				typeof error.message === 'string'
			) {
				errorMessage = error.message;
				return;
			} else {
				error = 'Hubo un error al validar el CUIT';
			}
		}
	};

	const handleCuitChange: HTMLInputElement['onchange'] = (event) => {
		const cuit = (event.target as HTMLInputElement).value;
		cuitInput = cuit.replace(/[^\d-]/g, '');
		errorMessage = '';
	};
</script>

<!-- <header>¿Puedo comprar sin IVA?</header> -->
<main>
	<section>
		<div>
			<h1>¿Puedo comprar sin IVA?</h1>
			<p class="subheader">
				Sacate todas las dudas sobre el programa
				<a
					href="https://www.argentina.gob.ar/noticias/compre-sin-iva"
					target="_blank"
					class="text-blue-600">Compre sin IVA</a
				>
			</p>
		</div>
	</section>
	<section id="consulta-de-comercios">
		<div>
			<h2>Consulta de comercios</h2>
			<p class="subheader">
				Averiguá si el comercio en el que vas a comprar está incluido dentro del programa
			</p>
			<form class="flex items-center space-x-2" on:submit|preventDefault={handleFormSubmit}>
				<label for="cuit">CUIT</label>
				<input
					required
					id="cuit"
					name="cuit"
					inputmode="numeric"
					minlength="11"
					maxlength="13"
					bind:value={cuitInput}
					placeholder="30-12345678-1"
					class="flex flex-1 w-full h-10 max-w-lg px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					on:keydown={handleCuitChange}
				/>
				<button
					class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
					type="submit"
				>
					Enviar
				</button>
			</form>
			{#if errorMessage}
				<Error class="mt-2">
					{errorMessage}
				</Error>
			{/if}
			{#if respuestaConsulta}
				{#if respuestaConsulta.comercioIncluido}
					<Success class="mt-2">
						{respuestaConsulta.message}
					</Success>
				{:else}
					<Error class="mt-2">
						{respuestaConsulta.message}
					</Error>
				{/if}
			{/if}
		</div>
	</section>
	<!-- <section id="preguntas-frecuentes">
		<PreguntasFrecuentes />
	</section>
	<section id="enlaces-utiles">
		<EnlacesUtiles />
	</section> -->
</main>
<footer>
	<p>
		Hecho por
		<a href="https://www.ivanlewin.com" target="_blank" class="text-blue-600">Iván Lewin</a>
	</p>
</footer>

<style lang="postcss">
	main {
		min-height: calc(100vh - theme(spacing.8));
	}
	footer {
		@apply h-8 w-full text-center;
	}
	section {
		@apply w-full py-12 md:py-24 lg:py-32;
	}
	section > div {
		@apply container flex flex-col items-center px-4 space-y-2 text-center md:px-6 max-w-none;
	}
	h1,
	h2 {
		@apply font-bold tracking-tighter;
	}
	h1 {
		@apply text-2xl sm:text-3xl lg:text-4xl;
	}
	h2 {
		@apply text-lg sm:text-xl lg:text-2xl;
	}
	.subheader {
		@apply mx-auto max-w-[700px] text-zinc-500 md:text-xl;
	}
</style>
