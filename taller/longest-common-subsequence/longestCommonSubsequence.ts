export function longestCommonSubsequence(text1: string, text2: string): number {
  const n = text1.length;
  const m = text2.length;

  // (n+1) x (m+1) en ceros: fila 0 y columna 0 son el caso base.
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];             // la letra entra en la LCS
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // descartar una de las dos
      }
    }
  }
  return dp[n][m];
}
