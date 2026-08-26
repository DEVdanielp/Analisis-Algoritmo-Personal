public class Solution {

    public boolean lemonadeChange(int[] bills) {
        int cincos = 0;
        int diez = 0;

        for (int billete : bills) {
            if (billete == 5) {
                cincos++;
            } else if (billete == 10) {
                if (cincos == 0) {
                    return false;
                }
                cincos--;
                diez++;
            } else { // billete == 20
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
