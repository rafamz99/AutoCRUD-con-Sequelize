
import { ControllerBase } from "./base/ControllerBase.js";
import logService from "../services/logService.js";

class LogController extends ControllerBase {
    constructor() {
        super(logService);
    }
}

export default new LogController();
