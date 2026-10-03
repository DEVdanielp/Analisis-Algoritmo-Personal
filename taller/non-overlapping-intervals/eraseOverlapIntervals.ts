function mezclarPorFin(a: number[][], aux: number[][], ini: number, medio: number, fin: number): void {
  let i = ini, j = medio, k = ini;
  while (i < medio && j < fin) {
    if (a[i][1] <= a[j][1]) aux[k++] = a[i++];
    else aux[k++] = a[j++];
  }
  while (i < medio) aux[k++] = a[i++];
  while (j < fin) aux[k++] = a[j++];
  for (k = ini; k < fin; k++) a[k] = aux[k];
}

/** Merge sort top-down sobre a[ini..fin), ordenando por end. */
function mergeSortPorFin(a: number[][], aux: number[][], ini: number, fin: number): void {
  if (fin - ini <= 1) return;
  const medio = (ini + fin) >>> 1;
  mergeSortPorFin(a, aux, ini, medio);
  mergeSortPorFin(a, aux, medio, fin);
  if (a[medio - 1][1] <= a[medio][1]) return; // ya en orden
  mezclarPorFin(a, aux, ini, medio, fin);
}

export function eraseOverlapIntervals(intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;

  // Candidatos ordenados por extremo derecho.
  const a = intervals.slice();
  mergeSortPorFin(a, new Array(n), 0, n);

  // Selección de actividades: el primero (el que termina antes) siempre se acepta.
  let aceptados = 1;
  let ultimoFin = a[0][1];
  for (let k = 1; k < n; k++) {
    if (a[k][0] >= ultimoFin) {
      // No pisa al último aceptado: se queda.
      aceptados++;
      ultimoFin = a[k][1];
    }
    // Si empieza antes de ultimoFin, se solapa: se "borra".
  }
  return n - aceptados;
}
