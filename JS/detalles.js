let abierta = document.getElementById("abierta");
let cerrada = document.getElementById("cerrada");
let titulo = document.getElementById("titulo");
let gif = document.getElementById("gif");
let contenedorMovimientos = document.getElementById("contenedorMovimientos");
let contenedorDescripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const posterior = document.getElementById("posterior");

anterior.addEventListener("click", () => {
    linkearPokemon(-1);
});

posterior.addEventListener("click", () => {
    linkearPokemon(1);
});

async function linkearPokemon(pos) {
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");

    if (!nombrePokemon) {
        console.error("No se encontró el Pokémon en la URL");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();

        const nuevoId = pokemon.id + pos;

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${nuevoId}`);
        const data = await response2.json();

        window.location.href = `detalles.html?pokemon=${data.name}`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function obtenerPokemon() {
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");
    if (!nombrePokemon) {
        console.error("No se encontró el Pokémon en la URL");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();

        const response2 = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`);
        gif.src = response2.url;

        document.getElementById("nombre").textContent = pokemon.name.toUpperCase();
        document.getElementById("nombre").classList.add("marginTop");
        document.getElementById("imagen").src = pokemon.sprites.other.dream_world.front_default;
        document.getElementById("favicon").setAttribute("href", pokemon.sprites.other.dream_world.front_default);
        document.getElementById("favicon").setAttribute("sizes", "256x256");
        titulo.textContent = nombrePokemon.toUpperCase();
        habilidadesPokemon();
        escribirDescripcion();
        mostrarDetallesPokemon();
        mostrarDebilidadesPokemon();
        mostrarEvolucionPokemon();
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
        for(let i = 0 ; i < pokemon.abilities.length; i++){
            const response2 = await fetch(pokemon.abilities[i].ability.url)
            const habilidades = await response2.json();
            // console.log(habilidades.names[5].name);
        }
    } catch (error) {
        
    }
}

async function escribirDescripcion(){
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`);
    const pokemon = await response.json(); 
    let descripciones = pokemon.flavor_text_entries;
    descripciones = descripciones.filter(entry =>entry.language.name === "es").map(entry => entry.flavor_text);
    const descripcion = descripciones.join("\n");
    let parrafo = document.createElement("p");
    parrafo.textContent = descripcion;
    contenedorDescripcion.appendChild(parrafo);
}

async function mostrarDetallesPokemon() {
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();

        for (const tipo of pokemon.types) {
            const tipoResponse = await fetch(`https://pokeapi.co/api/v2/type/${tipo.type.name}`);
            const tipoData = await tipoResponse.json();

            const nombreTipoEspañol = tipoData.names.find(name => name.language.name === "es");

            let tipoDiv = document.createElement("div");
            tipoDiv.classList.add(tipo.type.name);
            tipoDiv.classList.add("type");
            tipoDiv.textContent = nombreTipoEspañol ? nombreTipoEspañol.name : tipo.type.name;
            contenedorTipos.appendChild(tipoDiv);
        }

    } catch (error) {
        console.error("Error al obtener los datos del Pokémon:", error);
    }
}
async function mostrarDebilidadesPokemon() {
    const params = new URLSearchParams(window.location.search);
    const nombrePokemon = params.get("pokemon");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const pokemon = await response.json();

        const tipoDePokemon = pokemon.types.map(tipo => tipo.type.name);

        for (const tipo of tipoDePokemon) {
            const tipoResponse = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            const tipoData = await tipoResponse.json();

            for (const debilidad of tipoData.damage_relations.double_damage_from) {
                const debilidadResponse = await fetch(`https://pokeapi.co/api/v2/type/${debilidad.name}`);
                const debilidadData = await debilidadResponse.json();

                const nombreDebilidadEspañol = debilidadData.names.find(name => name.language.name === "es");

                let debilidadDiv = document.createElement("div");
                debilidadDiv.classList.add(debilidad.name);
                debilidadDiv.classList.add("type");
                debilidadDiv.textContent = nombreDebilidadEspañol ? nombreDebilidadEspañol.name : debilidad.name;

                document.getElementById("contenedorDebilidades").appendChild(debilidadDiv);
            }
        }

    } catch (error) {
        console.error("Error al obtener los datos de las debilidades del Pokémon:", error);
    }
}

async function mostrarEvolucionPokemon() {
    const parametros = new URLSearchParams(window.location.search);
    const nombrePokemon = parametros.get("pokemon");

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}`);
        const pokemon = await respuesta.json();

        const urlEvolucion = pokemon.evolution_chain.url;
        const respuestaEvolucion = await fetch(urlEvolucion);
        const datosEvolucion = await respuestaEvolucion.json();

        const contenedorEvolucion = document.getElementById("contenedorEvolucion");
        contenedorEvolucion.innerHTML = "";

        let cadenaEvolutiva = datosEvolucion.chain;
        let evoluciones = [];

        while (cadenaEvolutiva) {
            evoluciones.push(cadenaEvolutiva);
            cadenaEvolutiva = cadenaEvolutiva.evolves_to.length > 0 ? cadenaEvolutiva.evolves_to[0] : null;
        }

        for (let i = 0; i < evoluciones.length; i++) {
            const evolucion = evoluciones[i];
            const divEvolucion = document.createElement("div");
            divEvolucion.classList.add("column");

            const imagenEvolucion = document.createElement("img");
            const idEvolucion = evolucion.species.url.split('/')[6];
            imagenEvolucion.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idEvolucion}.png`;
            imagenEvolucion.alt = evolucion.species.name;

            imagenEvolucion.style.width = "80px";
            imagenEvolucion.style.height = "80px";
            imagenEvolucion.style.borderRadius = "50%";
            imagenEvolucion.style.border = "3px solid #000";
            imagenEvolucion.style.objectFit = "cover";
            imagenEvolucion.style.cursor = "pointer";

            imagenEvolucion.addEventListener("click", () => {
                window.location.href = `detalles.html?pokemon=${evolucion.species.name}`;
            });

            const nombreEvolucion = document.createElement("p");
            nombreEvolucion.textContent = evolucion.species.name.charAt(0).toUpperCase() + evolucion.species.name.slice(1);

            const numeroPokedex = document.createElement("p");
            numeroPokedex.textContent = `#${idEvolucion}`;

            const respuestaTipos = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolucion.species.name}`);
            const datosTipos = await respuestaTipos.json();

            const contenedorTipos = document.createElement("div");
            for (const tipo of datosTipos.types) {
                const tipoPokemon = document.createElement("span");
                tipoPokemon.textContent = tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1);
                tipoPokemon.classList.add(tipo.type.name);
                tipoPokemon.classList.add("type");
                contenedorTipos.appendChild(tipoPokemon);
            }

            divEvolucion.appendChild(imagenEvolucion);
            divEvolucion.appendChild(nombreEvolucion);
            divEvolucion.appendChild(numeroPokedex);
            divEvolucion.appendChild(contenedorTipos);
            contenedorEvolucion.appendChild(divEvolucion);

            if (i < evoluciones.length - 1) {
                const flecha = document.createElement("img");
                flecha.src = "../Recursos/flecha.svg";
                flecha.classList.add("flecha");
                contenedorEvolucion.appendChild(flecha);
            }
        }
    } catch (error) {
        console.error("Error al obtener los datos de la evolución del Pokémon:", error);
    }
}








obtenerPokemon();



