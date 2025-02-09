let lupa = document.getElementById("lupa");
let galeria = document.getElementById("contenedorPokemon");

async function recogerImagen(url){
    await fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            let img = document.createElement("img");
            console.log(pokemon);
            return img;
        });
}

async function crearContenedores(){
    fetch("https://pokeapi.co/api/v2/pokemon")
        .then(response => response.json())
        .then(lista =>{
            for(let i = 0; i < 20; i++){
                let contenedor = document.createElement("div");
                contenedor.classList.add("pokemon");
                let nombre = document.createElement("h2");
                let imagen = document.createElement("img");
                fetch(lista.results[i].url)
                    .then(response => response.json())
                    .then(pokemon => {
                        imagen.src = pokemon.sprites.front_default;
                        console.log(pokemon);
                    });
                nombre.textContent = lista.results[i].name;
                contenedor.appendChild(imagen);
                contenedor.appendChild(nombre);
                galeria.appendChild(contenedor);
            }
        })
}
crearContenedores();