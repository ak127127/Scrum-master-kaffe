# Low-Fidelity Mockup för "Bönan & Koppen" - Iteration 1

Detta är en enkel, textbaserad mockup för att visualisera det grundläggande användarflödet.

---

### **1. Startsida / Produktlista (`/products`)**

```
==================================================
 Bönan & Koppen | Produkter | Om Oss | Logga In 
==================================================

Våra Handplockade Kaffesorter
-----------------------------

[BILD]
**Kaffebönor "Morgonbris"**
- Rosteri: Göteborgs Kafferosteri
- Smak: Fruktig, söt, balanserad
- Pris: 129 kr
[DETALJER] [LÄGG I VARUKORG]

-----------------------------

[BILD]
**Kaffebönor "Skogsglänta"**
- Rosteri: Stockholms Rosteri
- Smak: Nötig, choklad, fyllig
- Pris: 139 kr
[DETALJER] [LÄGG I VARUKORG]

-----------------------------

... (fler produkter) ...

==================================================
        Varukorg (2) | © 2025 Bönan & Koppen
==================================================
```

### **2. Produktdetaljsida (`/products/morgonbris`)**

(Användaren klickar på "DETALJER" för "Morgonbris")

```
==================================================
 Bönan & Koppen | Produkter | Om Oss | Logga In 
==================================================

Kaffebönor "Morgonbris"
-----------------------------

[STOR BILD PÅ PRODUKTEN]

Ett fruktigt och sött kaffe med en balanserad
eftersmak. Perfekt för en långsam morgon.

- **Rosteri:** Göteborgs Kafferosteri
- **Ursprung:** Etiopien, Yirgacheffe
- **Typ:** Hela bönor
- **Vikt:** 250g
- **Rostningsdatum:** 2025-12-05

**Pris: 129 kr**

Antal: [ 1 ] +/- 
[LÄGG I VARUKORG]

==================================================
        Varukorg (2) | © 2025 Bönan & Koppen
==================================================
```

### **3. Varukorg (`/cart`)**

(Användaren klickar på "Varukorg (2)" längst ner)

```
==================================================
 Bönan & Koppen | Produkter | Om Oss | Logga In 
==================================================

Din Varukorg
-----------------------------

**1. Kaffebönor "Morgonbris"**
   - Antal: [ 1 ] +/-
   - Pris: 129 kr
   [TA BORT]

**2. Kaffebönor "Skogsglänta"**
   - Antal: [ 1 ] +/-
   - Pris: 139 kr
   [TA BORT]

-----------------------------
**Delsumma: 268 kr**
Frakt: 49 kr
**TOTALT: 317 kr**

[FORTSÄTT HANDLA] [GÅ TILL KASSAN]

==================================================
        Varukorg (2) | © 2025 Bönan & Koppen
==================================================
```

---
### **4. Kassa (`/checkout`)**

(Användaren klickar på "GÅ TILL KASSAN" i varukorgen)

```
==================================================
 Bönan & Koppen | Produkter | Om Oss | Logga In 
==================================================

Kassa
-----------------------------

**1. Leveransinformation**

   Namn:      [____________________]
   Adress:    [____________________]
   Postnummer:[______]
   Ort:       [____________________]
   E-post:    [____________________]


**2. Betalning**

   Kortnummer:      [____________________]
   Giltig till (MM/ÅÅ): [_____]
   CVC:             [___]


**3. Din Beställning**

   - 1x Kaffebönor "Morgonbris": 129 kr
   - 1x Kaffebönor "Skogsglänta": 139 kr
   - Delsumma: 268 kr
   - Frakt: 49 kr
   - **TOTALT ATT BETALA: 317 kr**

   [AVBRYT] [SLUTFÖR KÖP & BETALA]

==================================================
        Varukorg (2) | © 2025 Bönan & Koppen
==================================================
```
