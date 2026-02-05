
import { ControllerBase } from "./base/ControllerBase.js";
import categoriasService from "../services/categoriasService.js";

class CategoriasController extends ControllerBase {
    constructor() {
        super(categoriasService);
    }
}

export default new CategoriasController();
