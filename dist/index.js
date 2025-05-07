"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Project: URL Shortener API
const express_1 = __importDefault(require("express"));
const valid_url_1 = __importDefault(require("valid-url"));
const shortid_1 = __importDefault(require("shortid"));
require("dotenv/config");
const UrlModel_1 = require("./Models/UrlModel");
const UrlHelper_1 = require("./Helpers/UrlHelper");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/url", (req, res) => {
    const { url } = req.body;
    try {
        if (valid_url_1.default.isUri(url)) {
            const newId = shortid_1.default.generate();
            const newURL = `${process.env.BASE_URL}/${newId}`;
            const urlModel = new UrlModel_1.UrlModel();
            urlModel.originalUrl = url;
            urlModel.shortenedurl = newURL;
            const urlHelper = new UrlHelper_1.UrlHelper();
            urlHelper.addUrl(urlModel);
            res.status(200).json({
                data: {
                    urlModel: urlModel
                }
            });
        }
        else {
            res.status(204).json({
                error: "Wrong URI"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            error: error
        });
    }
});
app.get("/:shortcode", (req, res) => {
    const { shortcode } = req.params;
    try {
        const urlHelper = new UrlHelper_1.UrlHelper();
        urlHelper.getUrl(shortcode)
            .then((result) => {
            console.log(result);
            if (!result) {
                res.send("done");
                return;
            }
            res.redirect(result);
        });
    }
    catch (error) {
        console.error(error);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
