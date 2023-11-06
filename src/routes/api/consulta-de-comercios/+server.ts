import buffer from 'buffer';

import { error, json } from '@sveltejs/kit';

import actividadesAfip from '../../../actividades-afip.js';
import { validarCUIT } from '../../../utils.js';
import { type DatosComercio, parseCuitOnline } from './utils.js';

export type ConsultaDeComerciosResponse = {
	message: string;
	comercioIncluido: boolean;
	datosComercio: DatosComercio | null;
};

export async function POST({ request }) {
	const { cuit } = await request.json();
	if (!validarCUIT(cuit)) {
		throw error(400, 'El CUIT provisto no es válido');
	} else {
		try {
			const validCUIT = Number(cuit.replace(/[^\d]/g, ''));
			const response = await fetch(`https://www.cuitonline.com/detalle/${validCUIT}/`);
			if (response.status === 404) {
				throw error(404, `No se encontró un comercio con el CUIT ${cuit}`);
			}
			const html = await response.text();
			const utf8 = buffer.transcode(Buffer.from(html, 'latin1'), 'latin1', 'utf-8').toString(); // not working perfectly

			const datosComercio = parseCuitOnline(utf8);
			if (!datosComercio) {
				return json({
					message: 'El comercio no está incluido en el programa',
					comercioIncluido: false,
					datosComercio: null
				} as ConsultaDeComerciosResponse);
			}

			let comercioIncluido = false;
			if (datosComercio) {
				for (const actividad of (datosComercio.actividades || [])) {
					if (actividad in actividadesAfip && actividadesAfip[actividad as keyof typeof actividadesAfip]['INCLUIDA_EN_COMPRE_SIN_IVA']) {
						comercioIncluido = true;
					}
				}
			}
			let message = 'El comercio';
			if (datosComercio.denominacion) {
				message += ` ${datosComercio.denominacion}`;
			}
			if (comercioIncluido) {
				message += ` está incluido en el programa`;
			} else {
				message += ` no está incluido en el programa`;
			}
			return json({
				datosComercio,
				comercioIncluido,
				message,
			} as ConsultaDeComerciosResponse, { status: 200 });
		} catch (err) {
			console.error(err);
			if (err
				&& typeof err === 'object'
				&& 'status' in err
				&& typeof err.status === 'number'
				&& 'body' in err && err.body && typeof err.body === 'object'
				&& 'message' in err.body && err.body.message && typeof err.body.message === 'string'
			) {
				throw error(err.status, err.body.message);
			}
			throw error(400, `Se produjo un error al realizar la consulta del CUIT ${cuit}`);
		}
	}
}