function formato(string) {
  if (string.length === 6) {
    return string.slice(0, 5) + "0" + string.slice(5, 6);
  }
  if (string.length === 7) {
    return string.slice(0, 5) + "" + string.slice(5, 7);
  }
}

//Función para sustituir meses
const mesAReemplazar = (month) => {
  if (month.slice(5, 7) >= 10) return month.slice(5, 7);

  if (month.slice(6, 7) >= 9) return month.slice(6, 7);
};
//Le pasás cualquiera de las órdenes
export const gananciasPorFiltro = (order) => {
  return order?.map((p) => p?.totalPrice).reduce((a, b) => a + b, 0);
};
export const hoy = new Date().toISOString().slice(0, 10);
export const mes = hoy.slice(0, 7);
export const mesAnterior = formato(
  mes.replace(mesAReemplazar(mes), mesAReemplazar(mes) - 1)
);
