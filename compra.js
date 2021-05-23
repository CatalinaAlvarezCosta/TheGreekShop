
$("#sinEnvio").click(function() {
$("#envios").hide(1500);
});

$("#conEnvio").click(function() {
  $("#envios").show(1500);
  });

  async function generarLinkDePago() {
    const productosLinkPago = carrito.map( el => ({
      
        title: el.nombre,
        description: el.descripcion,
        picture_url: "",
        category_id: el.id,
        quantity: Number(el.cantidad),
        currency_id: "ARS",
        unit_price: Number(el.precio),
      }))
      const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer TEST-3184992409945438-052000-10633f2ed0872603dcc4509d25209bf7-608112048",
        },
        body: JSON.stringify({
          items: productosLinkPago,
        }),
      } 
    );
    const data = await response.json();
    window.open(data.init_point, "_blank");
    console.log (JSON.stringify(productosLinkPago))
  }

 const direccion = document.getElementById("direccion")
 direccion.addEventListener("input", validarTexto); 
 const email =  document.getElementById("email")
 email.addEventListener("input", validarTexto);
 
 const nombre = document.getElementById("nombre");
 nombre.addEventListener("input", validarTexto);
 const prov = document.getElementById("prov");
 prov.addEventListener("input", validarTexto);
 const cp = document.getElementById("cp");
 cp.addEventListener("input", validarTexto);
 const local = document.getElementById("local");
  local.addEventListener("input", validarTexto);
  const invalidos = document.getElementById("invalidos");
  const arrayValidar = [local,cp,prov,direccion,nombre,email]
  let validados = [];
  function validarTexto(event) {
    if(event.target.value.length > 2){
        event.target.style.borderColor = 'green';
        event.target.setAttribute("aria-invalid", "true");

          if((local.value.length > 2) && (cp.value.length > 2) && (prov.value.length > 2) && (direccion.value.length > 2) && (email.value.length > 2) && (nombre.value.length > 2)){
        document.getElementById("pagarLink").addEventListener("click", generarLinkDePago);
        document.getElementById("pagarLink").setAttribute("data-bs-target", "#modalCompra");
      }
    }else{
        event.target.style.borderColor = 'red';
        event.target.setAttribute("aria-invalid", "false");
        document.getElementById("pagarLink").setAttribute("data-bs-target", "#modalCompraInv");
  }

  }