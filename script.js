let buscador = document.getElementById("buscador");
buscador.addEventListener("mouseenter", ()=>{
    buscador.style.width=("150px")
    buscador.style.height=("30px")
    buscador.style.borderRadius=("10px")
    buscador.style.background=("white")
    buscador.style.transition=("all 0.5s linear")
})

buscador.addEventListener("mouseleave", () => {
    buscador.style.removeProperty("width");
    buscador.style.removeProperty("height");
    buscador.style.borderRadius=("100%");
    buscador.style.removeProperty("background");
    buscador.style.removeProperty("color");
});

    