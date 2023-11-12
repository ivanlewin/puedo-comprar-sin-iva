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

<main class="min-h-[calc(100vh-theme(space.8))]">
	<section class="container flex flex-col items-center w-full px-4 py-12 space-y-2 text-center md:py-24 lg:py-32 md:px-6 max-w-none">
		<h1 class="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl">¿Puedo comprar sin IVA?</h1>
		<p class="subheader mx-auto max-w-[700px] text-zinc-500 md:text-xl">
			Sacate todas las dudas sobre el programa
			<a
				href="https://www.argentina.gob.ar/noticias/compre-sin-iva"
				target="_blank"
				class="text-blue-600">Compre sin IVA</a
			>
		</p>
	</section>
	<section id="consulta-de-comercios" class="container flex flex-col items-center w-full px-4 py-12 space-y-2 text-center md:py-24 lg:py-32 md:px-6 max-w-none">
		<h2 class="text-lg font-bold tracking-tighter sm:text-xl lg:text-2xl">Consulta de comercios</h2>
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
	</section>
	<!-- <section id="preguntas-frecuentes" class="container flex flex-col items-center w-full px-4 py-12 space-y-2 text-center md:py-24 lg:py-32 md:px-6 max-w-none">
		<PreguntasFrecuentes />
	</section>
	<section id="enlaces-utiles" class="container flex flex-col items-center w-full px-4 py-12 space-y-2 text-center md:py-24 lg:py-32 md:px-6 max-w-none">
		<EnlacesUtiles />
	</section> -->
</main>
