const inputTarea = document.querySelector('#input-tarea');
const btnAñadir = document.querySelector('#btn-añadir');
const listaTareas = document.querySelector('#lista-tareas');

btnAñadir.addEventListener('click', () => añadirTarea());

function añadirTarea(tarea = { texto: inputTarea.value, completada: false }) {
    if (tarea.texto === '') return;

    const li = document.createElement('li');
    li.textContent = tarea.texto;
    if (tarea.completada) li.classList.add('completada');

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        guardarEnStorage();
    });

    li.appendChild(btnEliminar);
    li.addEventListener('click', () => {
        li.classList.toggle('completada');
        guardarEnStorage();
    });

    listaTareas.appendChild(li);
    inputTarea.value = '';
    guardarEnStorage();
}

function guardarEnStorage() {
    const tareas = Array.from(listaTareas.querySelectorAll('li')).map(elemento => ({
        texto: elemento.childNodes[0].textContent,
        completada: elemento.classList.contains('completada')
    }));
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarDeStorage() {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea.texto;
        if (tarea.completada) li.classList.add('completada');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            guardarEnStorage();
        });

        li.appendChild(btnEliminar);
        li.addEventListener('click', () => {
            li.classList.toggle('completada');
            guardarEnStorage();
        });

        listaTareas.appendChild(li);
    });
}

cargarDeStorage();
