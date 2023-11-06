// https://wiki.python.org.ar/recetario/validarcuit/
export function validarCUIT(cuit: string | number): cuit is string {
  if (typeof cuit === 'number') {
    cuit = cuit.toString();
  }
  cuit = cuit.replace(/[^\d]/g, '');
  // validaciones minimas
  if (cuit.length !== 11) {
    return false;
  }

  const base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  // calculo el digito verificador:
  let aux = 0;
  for (let i = 0; i < 10; i++) {
    aux += parseInt(cuit[i]) * base[i];
  }

  aux = 11 - (aux - (parseInt(String(aux / 11)) * 11));

  if (aux === 11) {
    aux = 0;
  } else if (aux === 10) {
    aux = 9;
  }

  return aux === parseInt(cuit[10]);
}
