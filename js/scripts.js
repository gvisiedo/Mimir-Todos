const inputTarea = document.querySelector('#input-tarea');
const btnAñadir = document.querySelector('#btn-añadir');
const listaTareas = document.querySelector('#lista-tareas');

btnAñadir.addEventListener('click', ()=>añadirTarea());

function añadirTarea(texto = inputTarea.value){
    if(texto !== ''){
        const li = document.createElement('li'); //crea el elemnto
        li.textContent = texto; //le pone el texto
        listaTareas.appendChild(li); //lo añade a la lista
        inputTarea.value = ''; // limpia el input después de añadir
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.addEventListener('click', ()=> li.remove());
        li.appendChild(btnEliminar);
        li.addEventListener('click', ()=>li.classList.toggle('completada'));
        btnEliminar.addEventListener('click', (e)=>{
            e.stopPropagation();
            li.remove();
        });
        //al final guarda en storage
        const tareas = Array.from(listaTareas.querySelectorAll('li')).map(li =>li.childNodes[0].textContent);
        guardarEnStorage(tareas);
    };
}

function guardarEnStorage(tareas){
    localStorage.setItem('tareas', JSON.stringify(tareas) );

}
function cargarDeStorage(){
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach(tarea => añadirTarea(tarea));
}

cargarDeStorage();