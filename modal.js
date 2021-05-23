const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const modalContact = document.getElementById("modalContacto")
const myModal = document.getElementById('exampleModal')
myModal.addEventListener('click', function () {
  myModal.focus()
})
modalContact.addEventListener('click', function () {
  modalContact.focus()
})
modalCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})


