#Práctica 9: Aplicación para coleccionistas de cartas Magic 

## Introducción:
La gestión de colecciones es una tarea común en muchos ámbitos. En este informe, se presenta una aplicación diseñada para simplificar esta tarea, centrándose en la gestión de colecciones de manera eficiente. La aplicación ofrece funciones para agregar, listar, leer, actualizar y eliminar elementos de una colección, proporcionando una herramienta versátil y práctica para cualquier tipo de coleccionista. En las siguientes secciones, se detallará el diseño, la implementación y el funcionamiento de la aplicación.


## Aplicación para coleccionistas de cartas Magic
 
### Clase Carta:
La clase `Carta` representa una carta del juego de Magic. Cada parte de la clase y su funcionalidad:

1. **Atributos**:
   - `_id`: Un número que representa el identificador único de la carta.
   - `_nombre`: Una cadena que contiene el nombre de la carta.
   - `_coste_mana`: Un número que indica el costo de mana necesario para jugar la carta.
   - `_color`: Un miembro del enumerado `Color` que representa el color de la carta.
   - `_tipo`: Un miembro del enumerado `TipoCarta` que indica el tipo de la carta (Tierra, Criatura, Encantamiento, etc.).
   - `_rareza`: Un miembro del enumerado `Rareza` que especifica la rareza de la carta (Común, Infrecuente, etc.).
   - `_reglas`: Una cadena que contiene las reglas asociadas a la carta.
   - `_fuerza`: Un número que representa la fuerza de la carta, solo válido para cartas de tipo Criatura.
   - `_resistencia`: Un número que indica la resistencia de la carta, solo válido para cartas de tipo Criatura.
   - `_lealtad`: Un número que representa la lealtad de la carta, solo válido para cartas de tipo Planeswalker.
   - `_valor`: Un número que indica el valor de la carta en el mercado.

2. **Constructor**:
   - El constructor inicializa los atributos de la carta con los valores proporcionados como parámetros.
   - Verifica la validez de los valores de los enumerados `Color`, `TipoCarta` y `Rareza`, y lanza errores si los valores proporcionados no son válidos.
   - También verifica que las cartas de tipo Criatura tengan los atributos `_fuerza` y `_resistencia` definidos, y que las cartas de tipo Planeswalker tengan el atributo `_lealtad` definido.

En resumen, la clase `Carta` encapsula los datos y comportamientos asociados con una carta del juego de Magic, permitiendo la creación de cartas con distintas características.

### Clase ColeccionCartas:
Esta clase `ColeccionCartas` proporciona métodos para administrar la colección de cartas de un usuario. Cada método:

1. **addCarta(user: string, carta: Carta): string**: Este método agrega una nueva carta a la colección del usuario. Verifica si el usuario tiene una carpeta en el directorio de datos. Si no existe, la crea. Luego, verifica si la carta ya existe en la colección del usuario y, si no existe, escribe el archivo JSON de la carta en la carpeta del usuario.

2. **listCartas(user: string): string**: Este método lista todas las cartas en la colección del usuario. Primero verifica si el usuario tiene una carpeta en el directorio de datos. Si no existe, lanza un error. Luego, lee los archivos de la carpeta del usuario y muestra los detalles de cada carta en un formato legible, incluyendo el color formateado con `chalk`.

3. **readCarta(user: string, id: number): string**: Este método lee una carta específica de la colección del usuario por su ID. Verifica si el usuario tiene una carpeta en el directorio de datos y si la carta especificada existe en la colección. Luego, lee el archivo JSON de la carta y muestra sus detalles en un formato legible.

4. **modifyCarta(user: string, carta: Carta): string**: Este método modifica una carta existente en la colección del usuario. Verifica si el usuario tiene una carpeta en el directorio de datos y si la carta especificada existe en la colección. Luego, actualiza el archivo JSON de la carta con la versión modificada.

5. **removeCarta(user: string, id: number): string**: Este método elimina una carta de la colección del usuario por su ID. Verifica si el usuario tiene una carpeta en el directorio de datos y si la carta especificada existe en la colección. Luego, elimina el archivo JSON de la carta.

En resumen, la clase `ColeccionCartas` proporciona una interfaz para agregar, listar, leer, modificar y eliminar cartas en la colección de un usuario, todo almacenado en archivos JSON en el sistema de archivos.

### magic-app:
Este archivo es la entrada principal de la aplicación de magia de cartas. Aquí se definen varios comandos utilizando la biblioteca `yargs` para manejar la entrada de línea de comandos. Cada comando ejecuta una operación específica en la colección de cartas del usuario.

Cada comando definido:

1. **Comando "add"**: Este comando permite agregar una nueva carta a la colección del usuario. El usuario debe proporcionar varios argumentos como el nombre de usuario, ID de carta, nombre de la carta, costo, color, tipo, rareza, reglas, fuerza, resistencia, lealtad y precio de mercado de la carta. Se crea una instancia de `Carta` con estos detalles y se agrega a la colección utilizando el método `addCarta` de la instancia de `ColeccionCartas`.

2. **Comando "list"**: Este comando lista todas las cartas en la colección del usuario. El usuario solo necesita proporcionar su nombre de usuario. Se utiliza el método `listCartas` de la instancia de `ColeccionCartas` para obtener una representación legible de todas las cartas en la colección.

3. **Comando "read"**: Este comando permite al usuario leer los detalles de una carta específica en su colección. El usuario debe proporcionar su nombre de usuario y el ID de la carta que desea leer. Se utiliza el método `readCarta` de la instancia de `ColeccionCartas` para obtener los detalles de la carta especificada.

4. **Comando "update"**: Este comando permite al usuario actualizar los detalles de una carta existente en su colección. Funciona de manera similar al comando "add", pero en lugar de agregar una nueva carta, actualiza una existente con los detalles proporcionados. Se utiliza el método `modifyCarta` de la instancia de `ColeccionCartas` para realizar la actualización.

5. **Comando "remove"**: Este comando permite al usuario eliminar una carta de su colección. El usuario debe proporcionar su nombre de usuario y el ID de la carta que desea eliminar. Se utiliza el método `removeCarta` de la instancia de `ColeccionCartas` para eliminar la carta especificada.

En resumen, este archivo define la interfaz de línea de comandos para interactuar con la colección de cartas de un usuario, permitiendo agregar, listar, leer, actualizar y eliminar cartas.

## Modificación hecha en clase

### Clase Mochila:

La clase abstracta `Mochila` proporciona una estructura base para representar una mochila y define los métodos necesarios para inicializar sus atributos. Esta clase sirve como punto de partida para las subclases específicas que manejan la lectura de información de mochilas desde diferentes tipos de archivos, como CSV y JSON. Implementando así el patrón de diseño `Template method`

**Funciones:**

1. **`procesar(fichero: string): [number[], number[]]`:**
   - Esta función es responsable de procesar la información de una mochila desde un archivo y devolver los beneficios y pesos de los elementos de la mochila.
   - Toma como parámetro la ruta del archivo que contiene la información de la mochila.
   - Internamente, invoca métodos abstractos para inicializar la capacidad, los elementos y el número de elementos de la mochila.
   - Devuelve un array de dos elementos: un array con los beneficios de los elementos y otro array con los pesos de los elementos.

### Clase MochilaCSV:

La subclase `MochilaCSV` extiende la clase `Mochila` y proporciona implementaciones específicas para leer la información de una mochila desde un archivo CSV.

**Funciones:**

1. **`initCapacidad(fichero: string): void`:**
   - Inicializa la capacidad de la mochila leyendo el archivo CSV especificado.
   - Toma como parámetro la ruta del archivo CSV que contiene la información de la mochila.
   - Utiliza el módulo `fs` de Node.js para leer el archivo y extraer la capacidad de la mochila.

2. **`initElementos(fichero: string): void`:**
   - Inicializa los elementos de la mochila leyendo el archivo CSV especificado.
   - Toma como parámetro la ruta del archivo CSV que contiene la información de la mochila.
   - Utiliza el módulo `fs` de Node.js para leer el archivo y extraer los elementos de la mochila.

3. **`initNumElementos(): void`:**
   - Inicializa el número de elementos de la mochila.
   - Accede al atributo `elementos` de la clase para determinar la cantidad de elementos que contiene la mochila.

### Clase MochilaJSON:

La subclase `MochilaJSON` extiende la clase `Mochila` y proporciona implementaciones específicas para leer la información de una mochila desde un archivo JSON.

**Funciones:**

1. **`initCapacidad(fichero: string): void`:**
   - Inicializa la capacidad de la mochila leyendo el archivo JSON especificado.
   - Toma como parámetro la ruta del archivo JSON que contiene la información de la mochila.
   - Utiliza el módulo `fs` de Node.js para leer el archivo y extraer la capacidad de la mochila.

2. **`initElementos(fichero: string): void`:**
   - Inicializa los elementos de la mochila leyendo el archivo JSON especificado.
   - Toma como parámetro la ruta del archivo JSON que contiene la información de la mochila.
   - Utiliza el módulo `fs` de Node.js para leer el archivo y extraer los elementos de la mochila.

3. **`initNumElementos(): void`:**
   - Inicializa el número de elementos de la mochila.
   - Accede al atributo `elementos` de la clase para determinar la cantidad de elementos que contiene la mochila.

Esta estructura proporciona una visión detallada de la jerarquía de clases y las funciones específicas que realizan dentro del contexto de la optimización de mochilas.

## Conclusiones
En conclusión, la aplicación ofrece una solución para la gestión de colecciones de cartas, haciendo uso de tecnologías como Yargs para el manejo de comandos de línea, Chalk para la presentación de mensajes con colores y estilos, y FileSystem (fs) para la manipulación de archivos. Estas herramientas, combinadas con un diseño orientado a objetos y modular, facilitan la interacción con las colecciones de cartas.

