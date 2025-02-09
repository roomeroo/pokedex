let lupa = document.getElementById("lupa");
let galeria = document.getElementById("contenedorPokemon");
let numeroPag;

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
                let contenedor2 = document.createElement("div");
                contenedor2.classList.add("row");
                let nombre = document.createElement("h2");
                let imagen = document.createElement("img");
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