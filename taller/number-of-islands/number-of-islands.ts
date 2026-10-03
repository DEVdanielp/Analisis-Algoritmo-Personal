function numIslands(grid: string[][]): number {
  const m = grid.length;
  if (m === 0) return 0;
  const n = grid[0].length;

  const dr = [-1, 1, 0, 0]; // arriba, abajo
  const dc = [0, 0, -1, 1]; // izquierda, derecha (sin diagonales)

  let islas = 0;
  const pila: number[] = []; // guarda celdas codificadas como r * n + c

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== "1") continue; // agua o ya visitada

      islas++;               // nueva componente
      grid[r][c] = "0";      // marcar al apilar → nunca entra dos veces
      pila.push(r * n + c);

      while (pila.length > 0) {
        const celda = pila.pop()!;
        const cr = Math.floor(celda / n);
        const cc = celda % n;
        for (let d = 0; d < 4; d++) {
          const nr = cr + dr[d];
          const nc = cc + dc[d];
          if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === "1") {
            grid[nr][nc] = "0";
            pila.push(nr * n + nc);
          }
        }
      }
    }
  }
  return islas;
}
