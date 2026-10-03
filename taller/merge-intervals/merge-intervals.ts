
function mezclar(a: number[][], aux: number[][], ini: number, medio: number, fin: number): void {
  let i = ini;   // cabeza de la corrida izquierda
  let j = medio; // cabeza de la corrida derecha
  let k = ini;   // siguiente posición libre en aux

  while (i < medio && j < fin) {
    if (a[i][0] <= a[j][0]) aux[k++] = a[i++];
    else aux[k++] = a[j++];
  }
  while (i < medio) aux[k++] = a[i++]; // sobrante izquierdo
  while (j < fin) aux[k++] = a[j++];   // sobrante derecho

  for (k = ini; k < fin; k++) a[k] = aux[k];
}

/** Merge sort top-down sobre a[ini..fin), ordenando por start. */
function mergeSort(a: number[][], aux: number[][], ini: number, fin: number): void {
  if (fin - ini <= 1) return;            // 0 o 1 elemento: ya está ordenado
  const medio = (ini + fin) >>> 1;
  mergeSort(a, aux, ini, medio);         // ordenar mitad izquierda
  mergeSort(a, aux, medio, fin);         // ordenar mitad derecha
  if (a[medio - 1][0] <= a[medio][0]) return; // ya están en orden: no hace falta mezclar
  mezclar(a, aux, ini, medio, fin);
}

function merge(intervals: number[][]): number[][] {
  const n = intervals.length;
  if (n === 0) return [];

  // 1) Ordenar una copia de los intervalos por start con merge sort.
  const ordenados = intervals.slice();
  const aux: number[][] = new Array(n);
  mergeSort(ordenados, aux, 0, n);

  // 2) Pasada única manteniendo el intervalo "abierto".
  const resultado: number[][] = [];
  let abiertoIni = ordenados[0][0];
  let abiertoFin = ordenados[0][1];

  for (let k = 1; k < n; k++) {
    const ini = ordenados[k][0];
    const fin = ordenados[k][1];
    if (ini <= abiertoFin) {
      // Se solapa o se toca: ensanchar el end del abierto.
      if (fin > abiertoFin) abiertoFin = fin;
    } else {
      // Hay hueco: cerrar el abierto y abrir uno nuevo.
      resultado.push([abiertoIni, abiertoFin]);
      abiertoIni = ini;
      abiertoFin = fin;
    }
  }
  resultado.push([abiertoIni, abiertoFin]); // cerrar el último
  return resultado;
}
