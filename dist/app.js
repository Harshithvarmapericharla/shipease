"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import dbInit from "./db/init";
//import routes from "./routes/routes";
const port = 3004;
const app = (0, express_1.default)();
//app.use(express.json());
//dbInit()
//app.use('/',routes)
app.get('/', (req, res) => {
    res.send("hello world");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
