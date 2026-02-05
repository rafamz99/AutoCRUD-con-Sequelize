
import { ControllerBase } from "./base/ControllerBase.js";
import detalles_pedidoService from "../services/detalles_pedidoService.js";

class Detalles_pedidoController extends ControllerBase {
    constructor() {
        super(detalles_pedidoService);
    }
}

export default new Detalles_pedidoController();
