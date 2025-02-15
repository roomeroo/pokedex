let galeria = document.getElementById("contenedorPokemon");
let buscador = document.getElementById("buscador");
let miSelect = document.getElementById("desplegable");


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

async function crearContenedores() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
        const lista = await response.json();

        if (!lista.results || lista.results.length === 0) {
            console.log("No quedan más pokemons o no se recibió la lista correctamente");
            return;
        }

        lista.results.forEach(pokemon => {
            let contenedor = document.createElement("div");
            contenedor.classList.add("pokemon");
            let contenedor2 = document.createElement("div");
            contenedor2.classList.add("row");
            let nombre = document.createElement("h2");
            let imagen = document.createElement("img");
            imagen.classList.add("imagenPokemon");

            nombre.textContent = pokemon.name;
            contenedor.appendChild(imagen);
            contenedor.appendChild(nombre);
            contenedor.appendChild(contenedor2);
            galeria.appendChild(contenedor);

            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonDetails => {
                    imagen.src = pokemonDetails.sprites.front_default;
                    pokemonDetails.types.forEach(type => {
                        let p = document.createElement("p");
                        p.textContent = type.type.name;
                        p.classList.add(type.type.name);
                        p.classList.add("type");
                        contenedor2.appendChild(p);
                        //console.log(type)    Ayuda para buscar la imagen de los tipos
                    });
                });
        });
    } catch (error) {
        console.error("Error al obtener los pokemons:", error);
    }
}

crearContenedores();

buscador.addEventListener("keyup", e =>{
    
    const busqueda = e.target.value.toLowerCase();
    const pokemons = document.querySelectorAll(".pokemon");

    pokemons.forEach(pokemon =>{
        const nombre = pokemon.querySelector("h2").textContent.toLowerCase();
        if(nombre.startsWith(busqueda)){
            pokemon.style.display = "flex"; // se muestra
        }else
            pokemon.style.display = "none"; // no se muestra
    })
})

function imagenTipo(){
    fetch("https://pokeapi.co/api/v2/type/12/")
        .then(response => response.json())
        .then(data => {
            console.log(data.sprites);
        });
}

imagenTipo();

miSelect.addEventListener("change", ()=>{
    const valor = miSelect.value;
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

galeria.addEventListener("click",()=>{

})