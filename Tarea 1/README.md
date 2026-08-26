## 1. Lemonade Change (`LemonadeChange.java`) 

**Link:** https://leetcode.com/problems/lemonade-change/


**Problema:** los clientes pagan $5 por un vaso de limonada usando billetes de $5, $10 o $20. Hay que dar el cambio correcto a cada uno, sabiendo que la caja empieza vacia. Determinar si es posible atender a todos los clientes en el orden dado.

**Donde esta el greedy:**

Al recibir un billete de $20, el codigo decide como dar el cambio de $15:

```java
if (diez > 0 && cincos > 0) {
    diez--;
    cincos--;
} else if (cincos >= 3) {
    cincos -= 3;
} else {
    return false;
}
```

En vez de evaluar todas las combinaciones posibles de cambio, siempre se prefiere gastar un billete de $10 + uno de $5 antes que tres de $5, cuando ambas opciones estan disponibles.

**Por que funciona (y por que es greedy valido):**

El billete de $10 solo sirve para una cosa: dar cambio de un billete de $20 (no sirve para dar cambio de un billete de $10, porque eso requeriria $5 exactos). En cambio, el billete de $5 es el mas "flexible": sirve para dar cambio tanto de $10 como de $20. Por eso, siempre que se pueda, conviene gastar el billete de $10 primero y conservar los de $5, que son mas utiles para el futuro. Esta decision nunca deja a la caja en una situacion peor que la alternativa de usar tres billetes de $5, y en cambio preserva mas $5 disponibles para clientes posteriores. Al no requerir marcha atras ni recalculo, el problema se resuelve en una sola pasada, O(n).

## 2. Assign Cookies (`AssignCookies.java`)

**Link:** https://leetcode.com/problems/assign-cookies/

**Problema:** cada niño tiene un factor de codicia `g[i]` (el tamaño minimo de galleta que lo satisface) y cada galleta tiene un tamaño `s[j]`. Cada niño recibe a lo sumo una galleta, y una galleta lo satisface solo si su tamaño es mayor o igual a su codicia. Se busca maximizar el numero de niños satisfechos.

**Donde esta el greedy:**

Primero se ordenan ambos arreglos de menor a mayor, y luego se recorren con dos punteros:

```java
if (s[indiceGalleta] >= g[indiceNino]) {
    satisfechos++;
    indiceNino++;
    indiceGalleta++;
} else {
    indiceGalleta++;
}
```

La decision greedy es asignarle al niño **menos codicioso** que aun no tiene galleta la galleta **mas pequeña** que ya logra satisfacerlo.

**Por que funciona (y por que es greedy valido):**

Si una galleta pequeña ya alcanza para satisfacer al niño menos exigente, usarla en un niño mas exigente no aporta nada (ese niño mas exigente de todas formas necesitaria una galleta igual o mas grande), y ademas le quitaria a otro niño la unica galleta que lo podia satisfacer. Por lo tanto, "gastar poco para satisfacer poco" nunca es una mala decision: libera las galletas grandes para los niños mas dificiles de contentar, maximizando el total de niños satisfechos. Ordenar ambos arreglos es lo que permite aplicar esta regla de forma directa con dos punteros, en O(n log n).

## 3. Complejidades
## Resumen

| Ejercicio | Decision greedy | Por que es correcta | Complejidad tiempo | 
|---|---|---|---|
| Lemonade Change | Ante un billete de $20, preferir dar cambio con un $10 + un $5 en vez de tres $5 | El billete de $10 solo sirve para dar cambio de $20, mientras que el de $5 es mas flexible; conservarlo maximiza las opciones futuras | O(n) | 
| Assign Cookies | Asignar al niño menos codicioso la galleta mas pequeña que ya lo satisface | Usar una galleta pequeña en un niño exigente no cambia su resultado pero le quita a otro niño su unica opcion; se maximiza el total de niños satisfechos | O(n log n + m log m) (dominada por el ordenamiento) | 