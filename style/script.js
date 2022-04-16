const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu").cloneNode(1);
const body = document.body;

hamb.addEventListener("click", hambHandler);

function hambHandler(e){
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll")
    renderPopap();
    
}

function renderPopap(){
    popup.appendChild(menu);
}