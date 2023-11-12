<script lang="ts">
	import actividadesAfip from '../../actividades-afip';
	const actividadesIncluidas = Object.values(actividadesAfip).filter(
		({ INCLUIDA_EN_COMPRE_SIN_IVA }) => INCLUIDA_EN_COMPRE_SIN_IVA === true
	);
</script>

<main class="min-h-[calc(100vh-theme(space.8))]">
	<section class="container flex flex-col items-center w-full px-4 py-8 space-y-2 text-center md:py-16 lg:py-24 md:px-6 max-w-none">
		<h2 class="text-lg font-bold tracking-tighter sm:text-xl lg:text-2xl">Actividades incluidas</h2>
		<p>
			Los comercios minoristas y/o mayoristas deberán estar inscriptos ante la AFIP con alguna de
			las siguientes actividades participantes del Programa.
		</p>
		<table class="w-full max-w-6xl text-sm border border-gray-300 border-solid caption-bottom dark:border-gray-700">
			<thead class="[&_th]:border-b">
				<th
					class="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-4/12 sm:w-3/12 md:w-2/12"
					>Código de actividad</th
				>
				<th
					class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
					>Descripción</th
				>
			</thead>
			<tbody class="[&_tr:last-child]:border-0">
				{#each actividadesIncluidas as actividad}
					<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
						<td class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
							>{actividad.COD_ACTIVIDAD_F883}</td
						>
						<td class="p-4 align-middle text-left [&:has([role=checkbox])]:pr-0"
							>{actividad.DESCL_ACTIVIDA_F883}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</main>
