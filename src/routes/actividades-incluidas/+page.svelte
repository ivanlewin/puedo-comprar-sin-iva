<script lang="ts">
	import actividadesAfip from "../../actividades-afip";
	let actividades = Object.values(actividadesAfip).filter(
		({ INCLUIDA_EN_COMPRE_SIN_IVA }) => INCLUIDA_EN_COMPRE_SIN_IVA === true
	);
</script>

<div>
	<h2>Actividades incluidas en el programa</h2>
	{#each actividades as actividad}
		<div>
			{#each Object.entries(actividad) as [key, value]}
				<div>
					{key}: {value}
				</div>
			{/each}
		</div>
		<br />
	{/each}
</div>
