let lupa = document.getElementById("lupa");
let galeria = document.getElementById("contenedorPokemon");
let numeroPag;
let buscador = document.getElementById("buscador");
let numeroVentana = 0;


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

async function crearContenedores(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${numeroVentana*20}`)  //offset => inicio del array
        .then(response => response.json())
        .then(lista =>{
            for(let i = 0 + (numeroVentana * 20); i < 20 + (numeroVentana * 20); i++){
                if(lista.length === 0)
                    return;
                let contenedor = document.createElement("div");
                contenedor.classList.add("pokemon");
                let contenedor2 = document.createElement("div");
                contenedor2.classList.add("row");
                let nombre = document.createElement("h2");
                let imagen = document.createElement("img");
                imagen.classList.add("imagenPokemon");
                nombre.textContent = lista.results[i].name;
                contenedor.appendChild(imagen);
                contenedor.appendChild(nombre);
                contenedor.appendChild(contenedor2);
                galeria.appendChild(contenedor);
                fetch(lista.results[i].url)
                .then(response => response.json())
                .then(pokemon => {
                    imagen.src = pokemon.sprites.front_default;
                    for(let i = 0; i < pokemon.types.length; i++){
                        let p = document.createElement("p");
                        p.textContent = pokemon.types[i].type.name;
                        p.classList.add(pokemon.types[i].type.name);
                        p.classList.add("type");
                        contenedor2.appendChild(p);
                    }
                });
            }
        })
}

crearContenedores();

buscador.addEventListener("keyup", e =>{
    
    const busqueda = e.target.value.toLowerCase();
    const pokemons = document.querySelectorAll(".pokemon");

    pokemons.forEach(pokemon =>{
        const nombre = pokemon.querySelector("h2").textContent.toLowerCase();
        if(nombre.includes(busqueda)){
            pokemon.style.display = "block"; // se muestra
        }else
            pokemon.style.display = "none"; // no se muestra
    })
})