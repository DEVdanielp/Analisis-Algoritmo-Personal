export function combinationSum(candidates: number[], target: number): number[][] {
  const respuesta: number[][] = [];
  const actual: number[] = [];

  function buscar(inicio: number, resto: number): void {
    if (resto === 0) {
      respuesta.push(actual.slice()); // copia: actual se seguirá modificando
      return;
    }
    for (let i = inicio; i < candidates.length; i++) {
      const c = candidates[i];
      if (c > resto) continue;   // poda: tomarlo se pasaría de target
      actual.push(c);            // elegir
      buscar(i, resto - c);      // bajar (mismo i → reutilizar)
      actual.pop();              // deshacer
    }
  }

  buscar(0, target);
  return respuesta;
}
