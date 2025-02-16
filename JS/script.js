const contenedorPokemon = document.getElementById("contenedorPokemon");
const buscador = document.getElementById("buscador");
const desplegable = document.getElementById("desplegable");
const boton = document.getElementById("boton");

let pokemonData = [];
let displayedPokemons = [];
const cargador = document.getElementById("cargando");

const obtenerTodosPokemons = async () => {
    try {
        cargador.style.display = "block"; // Mostrar el loader

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1300");
        const data = await response.json();

        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const pokemonDetails = await obtenerDetallesPokemon(pokemon.url);
                return pokemonDetails;
            })
        );

        pokemonData = detailedPokemons;
        aplicarFiltros();

        cargador.style.display = "none";
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        cargador.style.display = "none";
    }
};

const obtenerDetallesPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const mostrarPokemons = (pokemons) => {
    for (const pokemon of pokemons) {
        const pokemonElement = crearPokemonElemento(pokemon);
        contenedorPokemon.appendChild(pokemonElement);
    }
};

const crearPokemonElemento = (pokemon) => {
    const link = document.createElement("a");
    link.href = `detalles.html?pokemon=${pokemon.name}`;
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    const nombre = document.createElement("h3");
    nombre.textContent = pokemon.name;
    const numero = document.createElement("p");
    numero.textContent = `#${pokemon.id}`;
    const contTipo = document.createElement("div");
    contTipo.classList.add("contTipo");

    pokemon.types.forEach(tipo => {
        const tipoDiv = document.createElement("div");
        tipoDiv.classList.add("type", tipo.type.name);
        tipoDiv.textContent = tipo.type.name;
        contTipo.appendChild(tipoDiv);
    });

    pokemonDiv.appendChild(img);
    pokemonDiv.appendChild(nombre);
    pokemonDiv.appendChild(numero);
    pokemonDiv.appendChild(contTipo);
    link.appendChild(pokemonDiv);

    return link;
};

const aplicarFiltros = () => {
    const nombreBusqueda = buscador.value.toLowerCase();
    const tipoSeleccionado = desplegable.value;

    let pokemonsFiltrados = pokemonData.filter(pokemon =>
        pokemon.name.startsWith(nombreBusqueda)
    );

    if (tipoSeleccionado !== "todos") {
        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon =>
            pokemon.types.some(tipo => tipo.type.name === tipoSeleccionado)
        );
    }

    mostrarPokemons(pokemonsFiltrados.slice(0, 40));
    displayedPokemons = pokemonsFiltrados.slice(0, 40);
};

buscador.addEventListener("input", () => {
    contenedorPokemon.innerHTML = '';
    aplicarFiltros();
});

desplegable.addEventListener("change", () => {
    contenedorPokemon.innerHTML = '';
    aplicarFiltros();
});

boton.addEventListener("click", () => {
    girarPokeball();

    const nombreBusqueda = buscador.value.toLowerCase();
    const tipoSeleccionado = desplegable.value;

    let pokemonsFiltrados = pokemonData.filter(pokemon =>
        pokemon.name.startsWith(nombreBusqueda)
    );

    if (tipoSeleccionado !== "todos") {
        pokemonsFiltrados = pokemonsFiltrados.filter(pokemon =>
            pokemon.types.some(tipo => tipo.type.name === tipoSeleccionado)
        );
    }

    const nuevosPokemons = pokemonsFiltrados.slice(displayedPokemons.length, displayedPokemons.length + 40);

    setTimeout(() => {
        mostrarPokemons(nuevosPokemons);
        displayedPokemons = [...displayedPokemons, ...nuevosPokemons];
    }, 800);
});

obtenerTodosPokemons();

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
let grados = 0;
function girarPokeball(){
    let imagen = boton.querySelector("img");
    grados +=360;
    imagen.style.transform = `rotate(${grados}deg)`;
    imagen.style.transition = "transform 1s";
}