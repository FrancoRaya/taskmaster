//Cronómetro
const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const sumarTiempo = document.getElementById('sumarTiempo');

let stopwatchInterval;
let runningTime = 0;

const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running');
        pause();
    }
}

const pause = () => {
    clearInterval(stopwatchInterval);
}

const stop = () => {
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => {
    let startTime = Date.now() - runningTime;

    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000)
}

const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}`
}



//Ingreso de datos
    //Nombre del proyecto
    const agregarProyecto = document.getElementById("agregarProyecto");
    const botonProyecto = document.getElementById("botonProyecto");
    const nomProyecto = document.getElementById("nomProyecto");

        //Agregar un nombre de proyecto nuevo
        botonProyecto.addEventListener ("click", () => {

            let proyectoAgr = document.createElement ("p");
            proyectoAgr.innerHTML = agregarProyecto.value;
            nomProyecto.append (proyectoAgr);

            //Si hace click sin agregar nada
            agregarProyecto.value === "" && Swal.fire('Tenés que agregar un proyecto');
        });
    

    //Costo por hora
    const agregarCosto = document.getElementById('agregarCosto');
    const botonCosto = document.getElementById('botonCosto');
    const costoHora = document.getElementById('costoHora');

        //Agregar costo x hora nuevo
        botonCosto.addEventListener ("click", () => {

            let costoAgr = document.createElement ("p");
            costoAgr.innerHTML = "$" + agregarCosto.value;
            costoHora.append (costoAgr);

            //Costo por minuto de proyecto
            let costoMinuto = agregarCosto.value / 60;
            console.log(costoMinuto);

            let costoMinRed = Math.round(costoMinuto);
            console.log(costoMinRed);

            //Si hace click sin agregar nada
            agregarCosto.value === "" && Swal.fire('Tenés que agregar tu costo por hora');
        });



//Tiempo total proyecto
const totalHoras = document.querySelector("#totalHoras");

//Costo total proyecto
const costoTotal = document.querySelector("#costoTotal");

    //Cálculo
    botonCosto.addEventListener ("click", () => {

        let calcCostoTotal = totalHoras.innerHTML * agregarCosto.value;
        console.log(calcCostoTotal);

        let costoTotAgr = document.createElement ("p");
        costoTotAgr.innerHTML = "$" + calcCostoTotal;
        costoTotal.append (costoTotAgr);
    });





//Costo por hora calculado
const agregarSalario = document.getElementById('agregarSalario');
const botonSalario = document.getElementById('botonSalario');
const costoHoraCalculado = document.getElementById('costoHoraCalculado');

    //Cálculo
    botonSalario.addEventListener ("click", () => {
        
        //Sueldo pretendido mensual / días laborables = costo diario
        let costoDiario = agregarSalario.value / 22;
        console.log(costoDiario);

        //Costo diario / jornada la boral estandar = costo por hora
        let costoxHora = costoDiario / 8;
        console.log(costoxHora);
        
        let costoHoraRed = Math.round(costoxHora);
        console.log(costoHoraRed);

        costoHoraCalculado.innerText = "$" + costoHoraRed;

        //Si hace click sin agregar nada
        agregarSalario.value === "" && Swal.fire('Tenés que agregar tu sueldo pretendido');
    });


//Almacenamiento de datos
const tasks = JSON.parse(localStorage.getItem('Nombre proyecto')) || [];

/* function guardarProyecto () {
    localStorage.setItem ("Nombre proyecto", JSON.stringify(agregarProyecto.value));
}; */

/* function guardarCosto () {
    localStorage.setItem ("Costo x hora", agregarCosto.value);
}; */

    //Listeners
/*     botonProyecto.addEventListener ("click", guardarProyecto); */
/*     botonCosto.addEventListener ("click", guardarCosto); */


//Copié el código para poder revisarlo en detalle y ver qué debía hacer. Todavía no lo resuelvo
function addTask(e) {
	e.preventDefault();
	//Selecciono el valor del input name ="task"
	const text = agregarProyecto.value;
	// 	Creo un objeto con el texto de la tarea y un valor booleano para saber si si esta hecha o no.
	const task = {
		text,
		done: false
	}

	// 	Pasa por parametros a la función el array de tareas y el innerHTML
	populateList(tasks, nomProyecto);
	console.log(tasks) // Devuelve el array de objetos
	console.log(nomProyecto) //Devuelve el innerHTML del contenedor
	
	localStorage.setItem('tasks',JSON.stringify(tasks));
/* 	addButton.checked = false;
	this.reset(); */
}

function populateList(tasks = [], taskList) {
	//Utiliza un MAP para mostrar todas las tareas
	taskList.innerHTML = tasks.map((task, i) => {
		// Esto es lo que se renderiza
		return `
			<li class="task">
				<input type="checkbox" class="checkbox" data-index="task${i}" id="task${i}" ${task.done ? 'checked' : ''} />
				<label class="label" for="task${i}">
					<span></span>${task.text}<button></button>
				</label>
			</li>
		`;
		//Con el metodo join, suma todas las tareas!
	}).join('');
}

addTasks.addEventListener('submit', addTask);
tasksList.addEventListener('click', toggleDone);
populateList(tasks, tasksList);



