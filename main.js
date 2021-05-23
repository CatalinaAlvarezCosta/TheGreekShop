
let totalCarrito = 0;
let acumuladorCardsHome = ``;
class Producto{
  constructor(id,nombre, descripcion, precio ,imagenUno,imagenDos,stock) {
    this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio  = precio;
      this.imagenUno = imagenUno;  
      this.imagenDos = imagenDos; 
      this.stock = stock;
      this.vendido = false; }
      vender( ) {
        this.vendido = true;
        this.stock= this.stock - 1;
      }   
}
const productoUno = new Producto(1,"Cartera Santorini", "Bolso formato bandolera de tejido denim. Cuerpo acolchado craquelado con pespuntes. Asa de hombro de cadena metalizada. Interior forrado con dos compartimentos, uno de ellos con bolsillo.Cierre de imanes. Alto x Ancho x Fondo 20 x 24 x 12 cm.", 4300,"Fotos/Cart1.webp","Fotos/Cart1.2.webp",5);

const productoDos = new Producto (2,"Cartera Mykonos","Bolso de hombro color negro,el más elegido de la temporada!Asa corta de hombro con detalle de arandela y hebilla metalizadas. Cierre mediante cremallera. Interior forrado con bolsillo. Alto x Ancho x Fondo 14 x 25 x 5 cm.",3500,"Fotos/Cart2.webp","Fotos/Cart2.2.webp",12);

const productoTres = new Producto (3,"Cartera Atenas","Bolso formato shopper en color negro con detalle de bolsillo en la parte delantera. Asa de hombros de cadena y asa ajustable de color negro para llevarlo tipo bandolera. Cierre mediante imán. Alto x Ancho x Fondo 29 x 27.5 x 12 cm.",5000,"Fotos/Cart3.jpg","Fotos/Cart3.2.webp",8);

const productoCuatro = new Producto (4,"Cartera Rodas","Bolso formato bandolera portamóvil con cierre mediante solapa y pieza metálica. Dispone de dos compartimentos en el interior. Compartimentos para tarjetas en la parte trasera.Alto x Ancho x Fondo 17.5 x 9.5 x 3 cm.",2500,"Fotos/Cart4.webp","Fotos/Cart4.2.webp",3);

const productoCinco = new Producto (5,"Cartera Corfú","Bolso tipo bandolera con estampado animal tipo serpiente con detalle de cadena de asa corta y detalle de asa de hombro con cadena. Cierre mediante solapa e imán. Alto x Ancho x Fondo 15 x 23 x 5 cm.",3850,"Fotos/Cart5.webp","Fotos/Cart5.2.webp",0);

const productoSeis = new Producto (6,"Cartera Creta","Bolso formato bandolera. Dispone de dos compartimentos en el interior.  Asa de hombro con cadena. Cierre mediante solapa e imán. Disponible en color lila. Alto x Ancho x Fondo: 10 x 18.5 x 4.5 cm.",3600,"Fotos/Cart6.webp","Fotos/Cart6.2.webp",17);

const baseDatosDeProductos =  [productoUno,productoDos,productoTres,productoCuatro,productoCinco,productoSeis];


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