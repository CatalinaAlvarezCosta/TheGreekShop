
let totalCarrito = 0;
let acumuladorCardsHome = ``;
let baseDatosDeProductos = []

const obtenerProductos = async () => {
    const resp = await fetch('./stock.json')
    const data = await resp.json()

    baseDatosDeProductos = data
    cardsHome(baseDatosDeProductos)
}

obtenerProductos()


const contenedorProductos = document.getElementById('productos-contenedor');

let productosFiltro = []
const buscador = document.getElementById('buscador')
const botonBuscador = document.getElementById('botonBuscador')

botonBuscador.addEventListener('click',() => {
  const searchString = buscador.value.toLowerCase();

  const productosFiltrados = baseDatosDeProductos.filter((producto) => {
    return (
      producto.nombre.toLowerCase().includes(searchString)
    );
  });
  
  cardsHome(productosFiltrados)

  if (productosFiltrados =='')
{ const div = document.createElement('div')
div.classList.add('noCoincide')
div.innerHTML = `
  <div class="card">
  <div class="card-body">
    No existe coincidencia con la búsqueda.
  </div>
</div>`
contenedorProductos.appendChild(div);
}
})




function cardsHome (array){
  contenedorProductos.innerHTML = ''

  array.forEach( (producto) => {
       const div = document.createElement('div')
       div.classList.add('col')
       div.innerHTML = `
                      <div class="card h-100  cardsHome" >
                      <div id="carouselExampleControls" class="carousel slide  card-img-top" data-ride="carousel">
                      <div class="carousel-inner ">
                        <div class="carousel-item active">
                          <img class="d-block w-100" src="${producto.imagenUno}" alt="First slide">
                        </div>
                        <div class="carousel-item">
                          <img class="d-block w-100" src="${producto.imagenDos}" alt="Second slide">
                        </div>
                      </div>
                    </div>
                      <div class="card-body">
                       <h5 class="card-title">${producto.nombre}</h5>
                       <p class="card-text">${producto.descripcion}</p>
                       <h5 class="card-text ">  $${producto.precio}</h5>
                       <h6 class="card-text ">Cantidad:</h5>
                       <div class="cantidad card-text">
                       <div class="d-inline" onclick='restarCantidad(${producto.id})' type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  class="bi bi-dash resta" viewBox="0 0 16 16">
                       <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg> </div> <span id="inputCarrito${producto.id}" class="d-inline" > 1 </span> <div onclick='sumarCantidad(${producto.id})'class="d-inline" type="button"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus suma" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                   </svg>  </div>  
                       </div>
                       </div>
                     <div class="card-footer">
                        <button type="button" class="botonAgregar" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick='agregarAlCarrito(${producto.id})' >AGREGAR AL CARRITO</button>
                     </div>
                    </div>
                       `
            contenedorProductos.appendChild(div);
           
})}

cardsHome (baseDatosDeProductos)



function ordenarMayor(productosOrdenar){
  productosOrdenar.sort(function filtroPreciosMayor (x, y){
    return (y.precio - x.precio)
  
  })}

  
  function ordenarMenor(productosOrdenar){
  productosOrdenar.sort(function filtroPreciosMenor(x, y){
    return (x.precio - y.precio)
  })}

let opcionElegida = document.getElementById('preciosFiltro');



function ordenar (){
  let valorDeOpcion = opcionElegida.value

  if (valorDeOpcion == 0){
    cardsHome(baseDatosDeProductos)
  } else if(valorDeOpcion == 1){
     ordenarMenor(baseDatosDeProductos);
     cardsHome(baseDatosDeProductos);
  } else {ordenarMayor(baseDatosDeProductos);
    cardsHome(baseDatosDeProductos);
       }

   }

opcionElegida.addEventListener('change', ()=>{
  ordenar()})

  $('.carousel').carousel({
    interval: 8000
  }) 

document.getElementById("mensaje").addEventListener("input", validarTexto); 

document.getElementById("email").addEventListener("input", validarTexto);

document.getElementById("nombre").addEventListener("input", validarTexto);

function validarTexto(event) {
    if(event.target.value.length > 2){
        event.target.style.borderColor = 'green';
    }else{
        event.target.style.borderColor = 'red';
    }
}