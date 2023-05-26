const dia = document.querySelector('#dia');
const lista= document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter'); 
const check = 'fa-check-circle'; 
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id
let LIST

// creacion de fecha 

const FECHA = new Date()
dia.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'short', day:'numeric'})

// funcion agregar tarea 
function agregarTarea(tarea,id,realizado,eliminado) {

    if(eliminado){return}

    const checkTask = realizado ?check:uncheck 
    const taskCompleted = realizado ?lineThrough:''

    const element = `
    <li>
        <i class="far ${checkTask} co" data="realizado" id=${id}></i>
        <p class="text ${taskCompleted}"> ${tarea} </p>
        <i class="fas fa-trash de" data="eliminado" id=${id}></i> 
    </li>
    `
    lista.insertAdjacentHTML("beforeend", element)

}

// funcion tarea realizada
function tareaRealizada(elemento) {
    elemento.classList.toggle(check)
    elemento.classList.toggle(uncheck)
    elemento.parentNode.querySelector('.text').classList.toggle(lineThrough)
    console.log(LIST[elemento.id].realizado)
    LIST[elemento.id].realizado= LIST[elemento.id].realizado ?false:true
    
}


//funcion tarea eliminada 
function tareaEliminada(elemento) {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode)
    LIST[elemento.id].eliminado = true
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    console.log(LIST)
})
document.addEventListener('keyup', function(event) {
    if(event.key =='Enter') {
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea, id,false,false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value=''
        id++
        console.log(LIST)
    }
})


lista.addEventListener('click',function(event) {    
    const elemento = event.target
    const elementData = elemento.attributes.data.value
    if(elementData=== 'realizado'){
        tareaRealizada(elemento)
    }
    else if (elementData=== 'eliminado') {
        tareaEliminada(elemento)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})



// local storage get item

let data = localStorage.getItem('TODO')
if(data) {
    LIST =JSON.parse(data)
    id=LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id= 0
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}


