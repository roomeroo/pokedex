let contenedoresDiv = document.getElementById("contenedorPokemon");
let desplegable = document.getElementById("desplegable");
let buscador = document.getElementById("buscador");
let pokemons = [];
let numeroPagina = 0;
let limitePagina = 40;

async function comprobarFiltros(){
    /*if(buscador.value === "" && desplegable.value === "todos"){
        return pokemons;
    }*/
    let aux = [];
    Promise.all(pokemons.forEach(unidad => {
        fetch(unidad.url)
            .then(response => response.json())
            .then(detalles =>{
                let nombre = detalles.name;
                let tipos = detalles.types;
                Promise.all(pokemons.forEach(pokemon => {
                    if(nombre.includes(buscador.value) && tipos.includes(desplegable.value)){
                        aux.push(pokemon);
                    }
                }));
            })
    }))

    return aux;
}

async function crearContenedores(){
    let pokemonsFiltrados = await comprobarFiltros();

    for(let i = (numeroPagina * limitePagina); i < 40 + (numeroPagina * limitePagina); i++){
        let contenedor = document.createElement("div")
        contenedor.classList.add("pokemon")
        let letras = document.createElement("div");
        letras.classList.add("contTipo")
        let nombre = document.createElement("h2");
        let imagen = document.createElement("img");
        console.log(pokemonsFiltrados[i])
        nombre.textContent = pokemonsFiltrados[i].name;
        contenedor.appendChild(imagen)
        contenedor.appendChild(nombre);
        contenedor.appendChild(letras);
        fetch(pokemonsFiltrados[i].url)
        .then(response => response.json())
        .then(pokemonDetails => {
            imagen.src = pokemonDetails.sprites.front_default;
            pokemonDetails.types.forEach(type => {
                let p = document.createElement("p");
                p.textContent = type.type.name;
                p.classList.add(type.type.name);
                p.classList.add("type");
                letras.appendChild(p);
            });
        });
    }
}

async function cogerPokemons() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
        const data = await respuesta.json();
        pokemons = data.results;
        crearContenedores();
    } catch (error) {
        console.error("La api no da respuesta");
    }


}

buscador.addEventListener("click", ()=>{
    buscador.style.width=("150px")
    buscador.style.height=("30px")
    buscador.style.borderRadius=("10px")
    buscador.style.background=("white")
    buscador.style.transition=("all 0.5s linear")
})

buscador.addEventListener("blur", () => {       //blur => click fuera
    buscador.style.removeProperty("width");
    buscador.style.removeProperty("height");
    buscador.style.borderRadius=("100%");
    buscador.style.removeProperty("background");
    buscador.style.removeProperty("color");
});

buscador.addEventListener("keyup", e =>{
    
    const busqueda = e.target.value.toLowerCase();
    const pokemons = document.querySelectorAll(".pokemon");

    pokemons.forEach(pokemon =>{
        const nombre = pokemon.querySelector("h2").textContent.toLowerCase();
        if(nombre.includes(busqueda)){
            pokemon.style.display = "flex"; // se muestra
        }else
            pokemon.style.display = "none"; // no se muestra
    })
})

desplegable.addEventListener("change", ()=>{
    const valor = desplegable.value;
    const pokemons = document.querySelectorAll(".pokemon")
    pokemons.forEach(pokemon => {
        const tipo = Array.from(pokemon.querySelectorAll(".type")).map(p => p.textContent.toLowerCase());
        if(valor==="todos" || tipo.includes(valor))
            pokemon.style.display = "flex";
        else{
            pokemon.style.display = "none";
        }
    })

})

cogerPokemons();

let grados = 0;
function girarPokeball(){
    let imagen = boton.querySelector("img");
    grados +=360;
    imagen.style.transform = `rotate(${grados}deg)`;
    imagen.style.transition = "transform 1s";
}

boton.addEventListener("click", () => {
    girarPokeball();
    setTimeout(() => {
        numeroPagina++;
        crearContenedores();
    }, 1000);
});