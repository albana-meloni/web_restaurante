const numeroMesaHTML = document.getElementById("numeroMesa");

let url = window.location.search;
let objectUrl = new URLSearchParams(url);

let numMesa = objectUrl.get("mesa");
numeroMesaHTML.innerText = numMesa;

/* ------------------------------------------------------- */

const cantPersonas = document.getElementById("personas");

const divBebidas = document.getElementById("bebidas");
const botonBebidas = document.getElementById("cargarBebidas");
const textareaBebidas = document.getElementById("pedidoBebidas");

const divComidas = document.getElementById("Comidas");
const botonComidas = document.getElementById("cargarComidas");
const textareaComidas = document.getElementById("pedidoComidas");

class CardItem {
  constructor(text) {
    const cardItem = document.createElement("div");
    const itemPedido = document.createElement("p");
    itemPedido.innerText = text;
    cardItem.appendChild(itemPedido);
    cardItem.classList.add("card");
    cardItem.classList.add("p-3");
    cardItem.classList.add("mb-1");
    return cardItem;
  }
}

function crearPedido(textarea, div) {
  if (textarea.value != "") {
    div.innerHTML = "";
    let listaPedido = textarea.value.split("\n");

    listaPedido.forEach((line) => {
      const item = new CardItem(line);
      div.appendChild(item);
    });
  } else {
    if (div != null) {
      div.innerHTML = "";
    }
  }
}

function cargarPedido(cant, listText, div) {
  cantPersonas.value = cant;

  listText.forEach((text) => {
    const item = new CardItem(text);
    div.appendChild(item);
  });
}

botonBebidas.addEventListener("click", () => {
  crearPedido(textareaBebidas, divBebidas);
});

botonComidas.addEventListener("click", () => {
  crearPedido(textareaComidas, divComidas);
});

/* ------------------------------------------------------- */

const guardarPedido = document.getElementById("guardarPedido");
const actualizarPedido = document.getElementById("actualizarPedido");

guardarPedido.addEventListener("click", () => {
  const storedData = sessionStorage.getItem("Mesa" + numMesa);
  const parsedData = JSON.parse(storedData);

  if (parsedData == null) {
    const data = {
      mesa: numMesa,
      personas: cantPersonas.value,
      bebidas: textareaBebidas.value.trim().split("\n"),
      Comidas: textareaComidas.value.trim().split("\n"),
      propina: null,
      estado: "pedido",
    };

    const jsonData = JSON.stringify(data);

    sessionStorage.setItem("Mesa" + numMesa, jsonData);
  }
});

actualizarPedido.addEventListener("click", () => {
  const storedData = sessionStorage.getItem("Mesa" + numMesa);
  const parsedData = JSON.parse(storedData);

  parsedData.mesa = numMesa;
  parsedData.personas = cantPersonas.value || parsedData.personas;

  if (textareaBebidas.value.trim() != "") {
    parsedData.bebidas = textareaBebidas.value.trim().split("\n");
  }

  if (textareaComidas.value.trim() != "") {
    parsedData.Comidas = textareaComidas.value.trim().split("\n");
  }

  parsedData.estado = "pedido";

  const jsonData = JSON.stringify(parsedData);
  sessionStorage.setItem("Mesa" + numMesa, jsonData);
});

for (let index = 1; index <= 8; index++) {
  const storedData = sessionStorage.getItem("Mesa" + index);
  const parsedData = JSON.parse(storedData);

  if (parsedData != null) {
    if (parsedData.estado == "pedido" && parsedData.mesa == numMesa) {
      cargarPedido(parsedData.personas, parsedData.bebidas, divBebidas);
      cargarPedido(parsedData.personas, parsedData.Comidas, divComidas);
    }
  }
}

/* ----------------------------------------------------------------- */

const cerrarPedido = document.getElementById("cerrarPedido");
const propina = document.getElementById("propina");

cerrarPedido.addEventListener("click", () => {
  if (propina.value != "") {
    const numPedidoStorage = sessionStorage.getItem("Numero de Pedidos");
    let intPedido = parseInt(numPedidoStorage, 10);
    intPedido++;
    let pedidoActual = intPedido.toString().padStart(3, "0");
    sessionStorage.setItem("Numero de Pedidos", pedidoActual);

    const storedData = sessionStorage.getItem("Mesa" + numMesa);
    const parsedData = JSON.parse(storedData);
    parsedData.estado = "cerrado";
    parsedData.propina = propina.value;

    const jsonData = JSON.stringify(parsedData, null, 2);
    sessionStorage.setItem("Mesa" + numMesa, jsonData);

    const blob = new Blob([jsonData], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pedido_" + pedidoActual + ".json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    sessionStorage.removeItem("Mesa" + numMesa);
  }
});
