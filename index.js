'use strict';

/*
 CASALINI, SABRINA NATALIA - LÓPEZ, JUAN RAMÓN
 */

let productos = [
    {
        id: 1,
        nombre: 'Shampoo sólido de coco',
        descripcion: 'Un cabello fresco, más vital y manejable en pocos pasos, de la mano de Sentida Botánica. Libre de crueldad: elaborado sin lastimar animales.',
        precio: 1800,
        imagen: 'images/shampoo.jpg',
        categoría: 'Higiene',
    },
    {
        id: 2,
        nombre: 'Labial vegano coral',
        descripcion: 'Mantiene los labios super humectados. Combate paspaduras, y repara grietas y resequedad. Manteca de cacao, manteca de karité',
        precio: 3000,
        imagen: 'images/labial.jpg',
        categoría: 'Cosmética',
    },
    {
        id: 3,
        nombre: 'Cepillo de dientes de bambú',
        descripcion: 'Cepillo totalmente sustentable hecho con materiales biodegradables que brindan un estilo de vida más eco firendly.',
        precio: 1500,
        imagen: 'images/cepillo.jpg',
        categoría: 'Higiene',
    },
    {
        id: 4,
        nombre: 'Perfume vegano floral',
        descripcion: 'Fórmula vegana y muy fresca, realizada con alcohol de origen natural. El envase procede de materiales reciclados.',
        precio: 5000,
        imagen: 'images/perfume.jpeg',
        categoría: 'Cosmética',
    },
    {
        id: 5,
        nombre: 'Cuaderno hojas recicladas',
        descripcion: 'Cuaderno Ecológico/Reciclado Tamaño A5 liso tapa dura 1,5 mm forrado en papel kraft FSC Ecológico con 100 hojas interiores lisas en papel reciclado. ',
        precio: 1200,
        imagen: 'images/cuaderno.jpeg',
        categoría: 'Artículos de oficina',
    },
    {
        id: 6,
        nombre: 'Lapicera biodegradable',
        descripcion: 'bolígrafo de perforación de papel ecológico con botón de plástico negro.Tinta negra. Medidas: 9 x 164 mm',
        precio: 1700,
        imagen: 'images/boligrafo.jpg',
        categoría: 'Artículos de oficina',
    },
];




class Carrito {


    static obtenerProductosAgregados () {

        let valores = Object.values(window.localStorage);

    }

    // -------------- Crear contador de cantidad de items agregados al carrito y acumulador de precio total en el LocalStorage -----------------//

    static crearContadorAcumulador = () => {

        if (!(window.localStorage.getItem('cantidadTotalItems') !== undefined && window.localStorage.getItem('cantidadTotalItems'))){
            window.localStorage.setItem("cantidadTotalItems", 0);
        };
        
        if (!(window.localStorage.getItem("montoTotal") !== undefined && window.localStorage.getItem("montoTotal"))){
            window.localStorage.setItem("montoTotal", 0);
        };

    };

    // -------------- Funciones para actualizar cantidad de productos y precio total----------------- //

    static actualizarItems = () => {
        document.querySelector("#items-agregados").innerText =  window.localStorage.getItem("cantidadTotalItems");
    };

    static actualizarPrecioTotal = () => {
        document.querySelector("#monto-total").innerText ="";
        document.querySelector("#monto-total").innerText = window.localStorage.getItem("montoTotal");
    };

    // -------------- Método estático para agregar al carrito ----------------- //
    static agregarAlCarrito (id, precio, nombre, descripcion, imagen, categoría) {

        precio = parseFloat(precio);

        if (localStorage.getItem(id)){ // Si el producto ya existe le sumo 1 a la cantidad
            let nuevaCantidad = JSON.parse(localStorage.getItem(id)).cantidad + 1;
            localStorage.setItem(id, JSON.stringify({
                id: id,
                cantidad: nuevaCantidad,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                categoría: categoría
            }));

           

        } else { // Si el producto no existe lo agrego al local storage
            localStorage.setItem(id, JSON.stringify({
                id: id,
                cantidad: 1,
                precio: precio,
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagen,
                categoría: categoría
            }));

        
            
        }

        //actualizo cantidad total de productos en el local storage
        let cantidadTotalProductos =  Number(window.localStorage.getItem("cantidadTotalItems"));
        cantidadTotalProductos++;
        window.localStorage.setItem("cantidadTotalItems", cantidadTotalProductos);

        //actualizo monto total de productos en el local storage
        let montoTotal = Number(window.localStorage.getItem("montoTotal"));
        montoTotal += precio;
        window.localStorage.setItem("montoTotal", montoTotal);

        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();

    }

    // -------------- Método estático para eliminar del carrito ----------------- //

    static eliminarDelCarrito(id){

        let cantidad = JSON.parse(localStorage.getItem(id)).cantidad;
        let precio = JSON.parse(localStorage.getItem(id)).precio;
        let subtotal = cantidad * precio;

        localStorage.removeItem(id); //elimino el item del local storage

        //actualizo cantidad total de productos en el local storage
        let cantidadTotalProductos =  Number(window.localStorage.getItem("cantidadTotalItems"));
        cantidadTotalProductos -= cantidad;
        window.localStorage.setItem("cantidadTotalItems", cantidadTotalProductos);

        //actualizo monto total de productos en el local storage
        let montoTotal = Number(window.localStorage.getItem("montoTotal"));
        montoTotal -= subtotal;
        window.localStorage.setItem("montoTotal", montoTotal);



        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();

        cerrarCarrito();
        verCarrito();
    };

    // -------------- Método estático para vaciar el carrito ----------------- //
    static vaciarCarrito(){
        window.localStorage.clear();
        Carrito.crearContadorAcumulador();
        Carrito.actualizarItems();
        Carrito.actualizarPrecioTotal();
        cerrarCarrito();
        verCarrito();
    };


}


// ------------------------------------------------------ 



document.addEventListener("DOMContentLoaded", ()=>{

    Carrito.actualizarItems();
    Carrito.actualizarPrecioTotal();
    Carrito.crearContadorAcumulador();
    


    productos.forEach(producto => {
        crearCardProducto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoría);
    });

    

})





// -------------- Función para crear card producto con elementos del DOM -----------------//

const crearCardProducto = (id, nombre, descripcion, precio, imagen, categoría) => {

    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = imagen;
    img.alt = nombre;
    let divInfo = document.createElement("div");
    let h3nombre = document.createElement("h3");
    h3nombre.innerText = nombre;
    let pDescripcion = document.createElement("p");
    pDescripcion.innerText = descripcion;
    let pPrecio = document.createElement("p");
    pPrecio.innerText = precio;
    let pCategoria = document.createElement("p");
    pCategoria.innerText = categoría; 
    let boton = document.createElement("button");
    boton.innerText = "+ Agregar al carrito";
    boton.id = id;
    boton.setAttribute("onclick", `Carrito.agregarAlCarrito(${id}, ${precio}, "${nombre}")`);
    boton.className = "btn-agregar";

    let btnVerDetalle = document.createElement("button");
    btnVerDetalle.innerText = "Ver detalle";
    btnVerDetalle.id = id;
    btnVerDetalle.setAttribute("onclick", `verProducto(${id}, "${nombre}", "${imagen}", "${descripcion}", ${precio}, "${categoría}")`); 

    divInfo.appendChild(h3nombre);
    divInfo.appendChild(pDescripcion);
    divInfo.appendChild(pPrecio);
    divInfo.appendChild(pCategoria);
    divInfo.appendChild(boton);
    divInfo.appendChild(btnVerDetalle);

    div.appendChild(img);
    div.append(divInfo);

    document.getElementById("productos").appendChild(div);
}

// !!! Cuando hace clic fuera de alguno no filtra nada CORREGIR-------------- Función para filtrar por categorías -----------------//

const filtrarPorCategoria = () => {

    
    document.getElementById("filtrarPor").addEventListener("click", (e) =>{

        //Limpio el html del div productos
        document.getElementById("productos").innerHTML = "";
        
        //Obtengo la categoría seleccionada
        let categoriaSeleccionada = e.target.textContent;

        //Aplico el filtro de categorías

        if (categoriaSeleccionada === "Todos"){
            productos.forEach(producto => {
                crearCardProducto(producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.categoría);
            });
        } else {
            for (let i=1; i < productos.length; i++){
                if (categoriaSeleccionada === productos[i].categoría){
                    crearCardProducto(productos[i].id, productos[i].nombre, productos[i].descripcion, productos[i].precio, productos[i].imagen, productos[i].categoría);
                }
            };
        };
 
    });

  

    

  

};




// -------------- Funciones para crear y eliminar ventana modal de carrito----------------- //

const verCarrito = () => {

    let div = document.createElement("div");
    div.id = "modalCarrito";
    div.classList.add("modal");
    //<a class="cerrar" href="javascript:void(0)" onclick="cerrarCarrito()">X</a>
    let aX = document.createElement("a");
    aX.href = "javascript:void(0)";
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarCarrito()");
    //<p>Items: <span>3</span> - Total: <span>$0</span></p>
    let pItemsTotal = document.createElement("p");
    let textItempsTotal = document.createTextNode("Items: ");
    pItemsTotal.append(textItempsTotal);
    let spanCantidadTotal = document.createElement("span");
    spanCantidadTotal.innerText = localStorage.getItem("cantidadTotalItems");
    pItemsTotal.append(spanCantidadTotal);
    let textMontoTotal = document.createTextNode(" - Total: $");
    pItemsTotal.append(textMontoTotal);
    let spanMontoTotal = document.createElement("span");
    spanMontoTotal.innerText = localStorage.getItem("montoTotal");
    pItemsTotal.append(spanMontoTotal);
    //<hr />
    let hr = document.createElement("hr");
    // <ul>
    let ul = document.createElement("ul");
    listarProductosCarrito(ul);
    // <button>Vaciar</button>
    let btnVaciar = document.createElement("button");
    btnVaciar.innerText = "Vaciar";
    btnVaciar.setAttribute("onclick", "Carrito.vaciarCarrito()")
    // <button>Ir al checkout</button>
    let btnCkeckout = document.createElement("button");
    btnCkeckout.innerText = "Ir al checkout";
    
    div.appendChild(aX);
    div.appendChild(pItemsTotal);
    div.appendChild(hr);
    div.appendChild(ul);
    div.appendChild(btnVaciar);
    div.appendChild(btnCkeckout);


    document.querySelector("body").appendChild(div);

};


const cerrarCarrito = () => {
    let modalCarrito = document.querySelector("#modalCarrito");
    document.querySelector("body").removeChild(modalCarrito);
}

const listarProductosCarrito = (ul) => {

    let carrito = window.localStorage;
    let valores = Object.values(carrito);


    for(let i=0; i < valores.length; i++){

        if (isNaN(JSON.parse(valores[i])) ){ // Descarto los acumuladores y contadores

            let id = JSON.parse(valores[i]).id;
            let precio = JSON.parse(valores[i]).precio;
            let cantidad = JSON.parse(valores[i]).cantidad;
            let subtotal = cantidad * precio;

            let nombre = JSON.parse(valores[i]).nombre;

            

            //Creo un li por cada item del carrito -- <li>Nombre del producto <span>$0</span> <span>0 items</span> <span>subtotal $</span><a href="#">Eliminar</a></li>
            let li = document.createElement("li");

            let spanNombre = document.createElement("span");
            spanNombre.innerText = `${nombre}`;
            let spanPrecio = document.createElement("span");
            spanPrecio.innerText = `$${precio}`;
            let spanCantidad = document.createElement("span");
            spanCantidad.innerText = `${cantidad} items`;
            let spanSubtotal = document.createElement("span");
            spanSubtotal.innerText = `Subtotal: $${subtotal}`;
            let aEliminar = document.createElement("a");
            aEliminar.innerText = "Eliminar";
            aEliminar.href = `#${id}`;
            aEliminar.setAttribute("onclick", `Carrito.eliminarDelCarrito(${id})`);

            li.appendChild(spanNombre);
            li.appendChild(spanPrecio);
            li.appendChild(spanCantidad);
            li.appendChild(spanSubtotal);
            li.appendChild(aEliminar);
            
            ul.appendChild(li)

        }
        
        
      
        
    }
    
}



// -------------- Funciones para crear y eliminar ventana modal de detalle producto----------------- //


const verProducto = (id, nombre, imagen, descripcion, precio, categoria) => {

    //<div class="modal" id="modalProducto"></div>
    let div = document.createElement("div");
    div.id = "modalProducto";
    div.classList.add("modal");
    //<a class="cerrar" href="javascript:void(0)">X</a>
    let aX = document.createElement("a");
    aX.href = "javascript:void(0)";
    aX.classList.add("cerrar");
    aX.innerText = "X";
    aX.setAttribute("onclick", "cerrarProducto()");
    //<img src="producto-de-ejemplo.jpg" alt="Nombre del producto" />
    let img = document.createElement("img");
    img.src = imagen;
    img.alt = nombre;
   //<h3>Producto</h3>
   let h3Nombre = document.createElement("h3");
   h3Nombre.innerText = nombre;
   //<p>Descripción</p>
   let pDescripcion = document.createElement("p");
   pDescripcion.innerText = descripcion;
   //<p>Precio: <span>$0</span></p>
    let pPrecio = document.createElement("p");
    let textPrecio = document.createTextNode("Precio: ");
    pPrecio.append(textPrecio);
    let spanPrecio = document.createElement("span");
    spanPrecio.innerText = precio;
    pPrecio.append(spanPrecio);
   //<p>Categoría</p>
   let pCategoria = document.createElement("p");
   pCategoria.innerText = categoria;
   // <button>Agregar</button>
   let btnAgregar = document.createElement("button");
   btnAgregar.innerText = "Agregar al carrito";
   btnAgregar.setAttribute("onclick",`Carrito.agregarAlCarrito(${id}, ${precio}, "${nombre}", "${descripcion}", "${imagen}", "${categoria}")`);


    div.appendChild(aX);
    div.appendChild(img);
    div.appendChild(h3Nombre);
    div.appendChild(pDescripcion);
    div.appendChild(pPrecio);
    div.appendChild(pCategoria);
    div.appendChild(btnAgregar);

    document.querySelector("body").appendChild(div);
};

const cerrarProducto = () => {
    let modalProducto = document.querySelector("#modalProducto");
    document.querySelector("body").removeChild(modalProducto);
}