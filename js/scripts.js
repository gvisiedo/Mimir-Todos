const inputTarea = document.querySelector('#input-tarea');
const btnAñadir = document.querySelector('#btn-añadir');
const listaTareas = document.querySelector('#lista-tareas');

btnAñadir.addEventListener('click', ()=>añadirTarea());

function añadirTarea(tarea={texto:inputTarea.value, completada:false}){
    if(tarea.texto !== ''){
        const li = document.createElement('li'); //crea el elemnto
        li.textContent = tarea.texto; //le pone el texto
        if(tarea.completada)li.classList.add('completada');
        listaTareas.appendChild(li); //lo añade a la lista
        inputTarea.value = ''; // limpia el input después de añadir
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.addEventListener('click', (e)=>{
            e.stopPropagation();
            li.remove();
            guardarEnStorage();
            });
        li.appendChild(btnEliminar);
        li.addEventListener('click', ()=>{
            console.log('ANTES del toggle:', li.classList.contains('completada'));
            li.classList.toggle('completada');
            console.log('Despues del toggle:', li.classList.contains('completada'));
            guardarEnStorage();
                       
        });
            guardarEnStorage();
        }
        };
        //al final guarda en storage
        function guardarEnStorage(){
        const tareas = Array.from(listaTareas.querySelectorAll('li')).map(elemento =>({
           
            texto: elemento.childNodes[0].textContent,
                completada: elemento.classList.contains('completada')
        }));
        console.log('guardando:', tareas);
        localStorage.setItem('tareas', JSON.stringify(tareas) );
    };
       
    




function cargarDeStorage(){
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach(tarea => añadirTarea(tarea));
}

cargarDeStorage();