localStorage.setItem("Numero de Pedidos", "000");

let jsonPedidos = {
    "cantidad_pedidos": 0,
    "pedidos": [],
}
localStorage.setItem("JSON Pedidos", JSON.stringify(jsonPedidos));