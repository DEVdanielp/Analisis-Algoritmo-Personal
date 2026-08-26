public class Solution {

    public boolean lemonadeChange(int[] bills) {
        int cincos = 0;
        int diez = 0;

        for (int billete : bills) {
            if (billete == 5) {
                // Siempre podemos aceptar un billete de $5: no requiere cambio.
                cincos++;
            } else if (billete == 10) {
                // Decision greedy: la unica forma de dar cambio de $5 es con
                // un billete de $5, asi que si no hay, es imposible continuar.
                if (cincos == 0) {
                    return false;
                }
                cincos--;
                diez++;
            } else { // billete == 20
                // Decision greedy: para dar $15 de cambio, preferimos usar
                // un $10 + un $5 en vez de tres $5, porque el billete de $10
                // no sirve para dar cambio de $10, mientras que el de $5 es
                // el mas "flexible" y conviene conservarlo para el futuro.
                if (diez > 0 && cincos > 0) {
                    diez--;
                    cincos--;
                } else if (cincos >= 3) {
                    cincos -= 3;
                } else {
                    return false;
                }
            }
        }

        return true;
    }

    public static void main(String[] args) {
        Solution solucion = new Solution();

        int[] caso1 = {5, 5, 5, 10, 20};
        int[] caso2 = {5, 5, 10, 10, 20};

        System.out.println("bills = [5,5,5,10,20] -> " + solucion.lemonadeChange(caso1)); // true
        System.out.println("bills = [5,5,10,10,20] -> " + solucion.lemonadeChange(caso2)); // false
    }
}
