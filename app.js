//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElementLeft(element, start, target, duration) { //Retornará promesa con elemento
    element.style.left = start;
    let counter = 0;
    const delta = (target - start) * 40 / duration; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject) => { // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(() => { // toma una funcion y la repite cada ciertos milisegundos
            const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element.style.left = current;
            if (start > target && current <= target) { // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
                element.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            } else if (start < target && current >= target) {
                element.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
}

function animateElementTop(element, start, target, duration) { //Retornará promesa con elemento
    element.style.top = start;
    let counter = 0;
    const delta = (target - start) * 40 / duration; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject) => { // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(() => { // toma una funcion y la repite cada ciertos milisegundos
            const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element.style.top = current;
            if (start > target && current <= target) { // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
                element.style.top = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            } else if (start < target && current >= target) {
                element.style.top = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
}

// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allLi = document.getElementsByTagName("li");
Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
    [
        animateElementLeft(allLi[0], 0, 600, 6000),
        animateElementLeft(allLi[1], 0, 600, 8000),
        animateElementLeft(allLi[2], 0, 600, 4000)
    ]
).then((results) => {
    console.log("Llegaron a la derecha");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
            animateElementTop(allLi[1], 0, 300, 1000),
            animateElementTop(allLi[0], 100, 400, 1000),
            animateElementTop(allLi[2], 100, 500, 700)
        ]
    )
}).then((results) => {
    console.log("Estan abajo");
    return Promise.all([
        animateElementLeft(allLi[1], 600, 0, 8000),
        animateElementLeft(allLi[0], 600, 0, 6000),
        animateElementLeft(allLi[2], 600, 0, 4000)
    ]
    )
}).then(() => {
    console.log("Llegaron hacía la izquierda");
    return Promise.all([
        animateElementTop(allLi[1], 300, 0, 1000),
        animateElementTop(allLi[0], 500, 100, 1000),
        animateElementTop(allLi[2], 500, 100, 1500)
    ]
    )
}).then((results) => {
    console.log("Atraparon el queso");
}).catch(() => {
    console.log("Falló la animación");
});