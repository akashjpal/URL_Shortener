"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Project: URL Shortener API
const express_1 = __importDefault(require("express"));
const valid_url_1 = __importDefault(require("valid-url"));
const shortid_1 = __importDefault(require("shortid"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('URL Shortener API');
});
app.post("/url", (req, res) => {
    const { url } = req.body;
    if (valid_url_1.default.isUri(url)) {
        const newId = shortid_1.default.generate();
        res.send(`Right uri ${newId}`);
    }
    else {
        res.send(`Not right`);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
