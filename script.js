let carrito = []

function guardarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function obtenerLocalStorage() {
    let carritoLS = JSON.parse(localStorage.getItem('carrito'));
    if (carritoLS) {
        carrito = carritoLS;
        renderCarrito();
    }
}

obtenerLocalStorage()

function traerProductos() {
    fetch('data.json')
        .then((res) => res.json())
        .then((productos) => {
            let inner = '';
            for (let i = 0; i < productos.length; i++) {
                inner =
                    inner +

                    ` <div class="card" style="width: 25rem;">
                            <img src= "${productos[i].img}" class="card-img-top;" style="height: 25rem;" alt="${productos[i].nombre};"/>
                            <div class="card-body">
                                <h5 class="card-title">${productos[i].nombre} <br> $ ${productos[i].precio} </h5>
                                <p class="card-text">${productos[i].text}</p>
                                <a class="btn btn-primary" id="${productos[i].nombre}" onclick= 'agregarAlCarrito(${i})' >AGREGAR AL CARRITO</a>
                            </div>
                        </div>   
            `;
            }
            document.getElementById('servicios').innerHTML = inner;
        })
        .catch((e) => {
            console.log(e);
        });
}


function renderCarrito() {
    let inner = '';
    for (let i = 0; i < carrito.length; i++) {
        inner =
            inner +

            `<div class="card" style="width: 25rem;">
            <img src= "${carrito[i].img}" class="card-img-top;" style="height: 25rem; " alt="${carrito[i].nombre};"/>
            <div class="card-body">
                <h5 class="card-title">${carrito[i].nombre} <br> $ ${carrito[i].precio} </h5>
                <a class="btn btn-primary" id="${carrito[i].nombre}" onclick= 'removeDelCarrito(${i});'>QUITAR PRODUCTO</a>
            </div>
        </div>
    </div>
    `;
    }
    document.getElementById('div-carrito').innerHTML = inner;

}


function agregarAlCarrito(id) {
    fetch('data.json')
        .then((res) => res.json())
        .then((productos) => {

            let productoEncontrado = productos.find((item) => item.id == id);
            carrito.push(productoEncontrado);

            renderCarrito();

            guardarLocalStorage();
            obtenerLocalStorage();

            Toastify({
                text: "Producto Agregado!",
                duration: 1000,
                gravity: 'buttom',
                style: {
                    background: 'linear-gradient(to right, #f8b8d5, #f8b8d5)'
                }

            }).showToast();
        })
        .catch((e) => {
            console.log(e);
        });

}


function removeDelCarrito(id) {

    carrito.splice(id, 1)

    renderCarrito();

    guardarLocalStorage();
    obtenerLocalStorage();


    Toastify({
        text: "Producto Eliminado!",
        duration: 1000,
        style: {
            background: 'linear-gradient(to right, #f8b8d5, #f8b8d5)'
        }
    }).showToast();

}


traerProductos()


