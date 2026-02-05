
import { ControllerBase } from "./base/ControllerBase.js";
import pedidosService from "../services/pedidosService.js";

class PedidosController extends ControllerBase {
    constructor() {
        super(pedidosService);
    }
}

export default new PedidosController();
