import { parse as parseHTML } from 'node-html-parser';

export type DatosComercio = {
	denominacion?: string;
	cuit?: string;
	localidad?: string;
	tipoPersona?: 'juridica' | 'fisica';
	// ganancias?: string;
	// iva?: string;
	actividades?: string[];
};

export function parseCuitOnline(html: string): DatosComercio | null {
	const root = parseHTML(html);

	const denominacion: DatosComercio['denominacion'] = root.querySelector('h1.p_title > span[itemprop="name"]')?.textContent;
	const cuit: DatosComercio['cuit'] = root.querySelector('div.persona-data > ul.p_info > li.p_cuit_title span.p_cuit')?.textContent;
	const localidad: DatosComercio['localidad'] = root.querySelector('div.persona-data > ul.p_info span[itemprop="addressLocality"]')?.textContent;

	let tipoPersona: DatosComercio['tipoPersona'] = undefined;
	const elementosLi = root.querySelectorAll("div.persona-data > ul.p_info > li");
	for (const elemento of elementosLi) {
		if (elemento.textContent.includes("Persona J")) { // since charset encoding is not working completely, avoid checking with accentuated characters
			tipoPersona = 'juridica';
		} else if (elemento.textContent.includes("Persona F")) { // since charset encoding is not working completely, avoid checking with accentuated characters
			tipoPersona = 'fisica';
		}
	}
	const actividades: string[] = [];
	const elementosActividades = root.querySelectorAll('div.persona-data > ul.p_info span:has(span.activity-order)');
	for (const elemento of elementosActividades) {
		const match = /(?:\[\d+\/\d+\] (\d{6}) - )/gm.exec(elemento.textContent);
		if (!match) {
			continue;
		}
		actividades.push(match[1]);
	}

	return {
		cuit,
		denominacion,
		localidad,
		actividades,
		tipoPersona
	};
}