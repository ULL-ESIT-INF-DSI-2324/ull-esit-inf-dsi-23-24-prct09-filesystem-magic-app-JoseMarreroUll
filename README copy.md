# Práctica 8: Ejercicios - PE101

Implemente un sistema de notificación de eventos *genéricos* haciendo uso del patrón Observable.

Para ello, en primer lugar, defina una interfaz genérica Event<T> cuyo parámetro de tipo genérico T permita definir eventos de diferente tipo (entre otros posibles atributos, al menos, debe haber un atributo denominado data de tipo T). Estos eventos genéricos son los que deberá notificar un objeto Observable a los objetos Observer suscritos.

Luego, piense que sus interfaces Observer y Observable también deberán ser interfaces genéricas basadas en dicho parámetro de tipo T, y que los correspondientes métodos update de Observer y notify de Observable, deberán recibir como argumento un objeto Event<T>, esto es, el evento genérico a ser notificado.

Por último, piense que la clase que implementa la interfaz Observable debe ser una clase genérica, mientras que la clase que implementa la interfaz Observer ya puede ser una clase concreta.

Todo el código fuente deberá ser desarrollado haciendo uso de módulos ESM, en lugar de módulos CJS, que es lo que ha venido utilizando hasta ahora.

Por último, recuerde que deberá incluir la documentación haciendo uso de TypeDoc, así como seguir una metodología TDD/BDD utilizando el framework de pruebas Mocha y la librería de aserciones Chai. También trate de comprobar el nivel de cubrimiento de su código mediante c8, hacer un seguimiento de dicho cubrimiento con Coveralls y activar el proyecto en Sonar Cloud. Para ello, utilice los flujos de trabajo de GitHub, tal y como se ha visto en clase.

[![Coverage Status](https://coveralls.io/repos/github/JoseMarreroUll/ull-esit-inf-dsi-2324-prct08/badge.svg?branch=main)](https://coveralls.io/github/JoseMarreroUll/ull-esit-inf-dsi-2324-prct08?branch=main)

