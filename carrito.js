const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar= document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal=document.querySelector("#total");
const botonComprar= document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito(){
if (productosEnCarritoLS && productosEnCarritoLS.length > 0) {

  //  productosEnCarritoLS= JSON.parse(productosEnCarritoLS);
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    productosEnCarritoLS.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                </svg>
            </button>
        `;

        contenedorCarritoProductos.append(div);
    });
} else {
    
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}


  actualizarBotonesEliminar();
  actualizarTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar= document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton=> {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e){
    const idBoton= e.currentTarget.id;    
    const index = productosEnCarritoLS.findIndex (producto=> producto.id === idBoton);
    
    productosEnCarritoLS.splice (index,1)
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify (productosEnCarritoLS)) 
}
botonVaciar.addEventListener("click", vaciarCarrito);


function vaciarCarrito(){
    productosEnCarritoLS.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify (productosEnCarritoLS)) ;
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado= productosEnCarritoLS.reduce((acc, producto)=> acc+ (producto.cantidad * producto.precio),0 )
    total.innerText= `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productosEnCarritoLS.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify (productosEnCarritoLS)) ;

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    
}