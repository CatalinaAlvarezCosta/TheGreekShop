let carrito = [];
const contenedorCarrito = document.getElementById('carrito-contenedor')
const precioTotal = document.getElementById('precioTotal')
const ValorDelCarritoEnElStorage = JSON.parse (localStorage.getItem('carrito'))
const contadorCarrito = document.getElementById('contador')


if (ValorDelCarritoEnElStorage) {
  carrito = ValorDelCarritoEnElStorage;
  actualizarCarrito()
}

console.log (carrito);
function sumarCantidad(id){
  let valorCantidad = document.getElementById(`inputCarrito${id}`)
  valorCantidad.innerText = parseInt(valorCantidad.innerText) + 1;
}
function restarCantidad(id){
  let valorCantidad = document.getElementById(`inputCarrito${id}`)
  if (valorCantidad.innerText <= 1) {
    valorCantidad.innerText = valorCantidad.innerText
  } else {
    valorCantidad.innerText = valorCantidad.innerText - 1 
  }
}
function agregarAlCarrito(itemId) {
  let valorCantidad = document.getElementById(`inputCarrito${itemId}`)
  let productoCarrito = carrito.find( el => el.id == itemId )
  if (productoCarrito) {
    
    productoCarrito.cantidad += parseInt(valorCantidad.innerText)
} else {
  let {id,imagenUno, nombre, precio} = baseDatosDeProductos.find( el => el.id == itemId )
  carrito.push({id: id,imagenUno:imagenUno, nombre: nombre, precio: precio, cantidad: parseInt(valorCantidad.innerText)})
}
  localStorage.setItem('carrito', JSON.stringify(carrito))
  JSON.parse (localStorage.getItem('carrito'))
  console.log(carrito)
  actualizarCarrito()
}
function eliminarProducto(id) {
  let productoAEliminar = carrito.find( el => el.id == id )
  productoAEliminar.cantidad--
  if (productoAEliminar.cantidad == 0) {
      let indice = carrito.indexOf(productoAEliminar)
      carrito.splice(indice, 1)
  }
 localStorage.setItem('carrito', JSON.stringify(carrito))
  JSON.parse (localStorage.getItem('carrito'))
  console.log(carrito)
  actualizarCarrito()
}
function actualizarCarrito() {
  contenedorCarrito.innerHTML=''
  carrito.forEach( (producto) => {
      const div = document.createElement('div')
      div.classList.add('productoEnCarrito')
      div.innerHTML = `<img class="carritoImg" src="${producto.imagenUno}" </p>
                      <p>${producto.nombre}</p>
                      <p>Precio: $${producto.precio * producto.cantidad}</p>
                      <p>Cantidad: ${producto.cantidad}</p>
                      <div type "button" onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg></div>
                  `
      contenedorCarrito.appendChild(div)
  })
  contadorCarrito.innerText = carrito.reduce( (acc, el) => acc + (el.cantidad), 0 );
  precioTotal.innerText = carrito.reduce( (acc, el) => acc + (el.precio * el.cantidad), 0 )
}
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito)
function vaciarCarrito (){
  carrito.splice (0, carrito.length)
  localStorage.clear() 
  actualizarCarrito()
  console.log(carrito)
}
