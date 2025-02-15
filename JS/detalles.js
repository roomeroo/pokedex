let abierta = document.getElementById("abierta");
let cerrada = document.getElementById("cerrada");
let titulo = document.getElementById("titulo");
let gif = document.getElementById("gif");

async function obtenerPokemon() {
    // Obtener el nombre del Pokémon de la URL
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");
    if (!nombrePokemon) {
        console.error("No se encontró el Pokémon en la URL");
        return;
    }

    try {
        // Llamar a la API para obtener los detalles del Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();

        // Insertar los datos en el HTML
        const response2 = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`);
        document.getElementById("nombre").textContent = pokemon.name.toUpperCase();
        document.getElementById("nombre").classList.add("marginTop");
        document.getElementById("imagen").src = pokemon.sprites.other.dream_world.front_default;
        document.getElementById("favicon").setAttribute("href", pokemon.sprites.front_default);
        document.getElementById("favicon").setAttribute("sizes", "256x256");
        gif.src = response2.url;
        titulo.textContent = nombrePokemon.toUpperCase();

    } catch (error) {
        console.error("Error al obtener los datos del Pokémon:", error);
    }
}

async function habilidadesPokemon() {
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");
    if (!nombrePokemon) {
        console.error("No se encontró el Pokémon en la URL");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();
        let tipos = '';
        for (let i = 0; i < pokemon.abilities.length; i++) {
            tipos += pokemon.abilities[i].ability.name;
            if (i < pokemon.abilities.length - 1) {
                tipos += ', '; 
            }
        }
        document.getElementById("descripcion").textContent = tipos;
    } catch (error) {
        
    }
}

// Añadir un evento de clic a la pokeball cerrada


// Llamar a la función cuando cargue la página
obtenerPokemon();
habilidadesPokemon();
async function recogerGif(){
    const response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`);
    const data = await response.json();
    console.log(data);
}
