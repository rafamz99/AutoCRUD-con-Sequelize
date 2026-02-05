
import { ControllerBase } from "./base/ControllerBase.js";
import productosService from "../services/productosService.js";

class ProductosController extends ControllerBase {
    constructor() {
        super(productosService);
    }
}

export default new ProductosController();
