const mesas = document.getElementsByName("mesa");

for (let index = 1; index <= 8; index++) {
  const storedData = localStorage.getItem("Mesa" + index);
  const parsedData = JSON.parse(storedData);

  if (parsedData != null) {
    if (parsedData.estado == "pedido") {
      mesas.forEach((mesa) => {
        if (mesa.value == parsedData.mesa) {
          mesa.classList.remove("available");
          mesa.classList.add("unavailable");
        }
      });
    }
  }
}

const numPedido = document.getElementById("numeroPedido");
const numPedidoStorage = localStorage.getItem("Numero de Pedidos");

numPedido.innerText = numPedidoStorage;

/* ----------------------------------------------------------------- */
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
  localStorage.clear();
});
