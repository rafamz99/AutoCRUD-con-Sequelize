
import { ControllerBase } from "./base/ControllerBase.js";
import clientesService from "../services/clientesService.js";

class ClientesController extends ControllerBase {
    constructor() {
        super(clientesService);
    }
}

export default new ClientesController();
