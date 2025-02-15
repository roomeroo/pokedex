let abierta = document.getElementById("abierta");
let cerrada = document.getElementById("cerrada");

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
        document.getElementById("nombre").textContent = pokemon.name.toUpperCase();
        document.getElementById("imagen").src = pokemon.sprites.front_default;
        const tipos = document.getElementById("tipos");
        /*pokemon.types.forEach(type => {
            let p = document.createElement("p");
            p.textContent = type.type.name;
            p.classList.add("type");
            tipos.appendChild(p);
        });*/

        cerrada.addEventListener("click", mostrarPokeballAbierta());

    } catch (error) {
        console.error("Error al obtener los datos del Pokémon:", error);
    }
}

// Función para mostrar la pokeball abierta y hacerla más grande
function mostrarPokeballAbierta() {
    console.log("Pokeball cerrada clickeada"); 
    // Ocultar la pokeball cerrada
    cerrada.style.display = "none";

    // Hacerla más grande
    abierta.style.transform = "scale(1.5)"; // Puedes ajustar el tamaño según lo necesites
}

// Añadir un evento de clic a la pokeball cerrada


// Llamar a la función cuando cargue la página
obtenerPokemon();

