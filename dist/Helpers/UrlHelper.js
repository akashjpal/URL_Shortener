"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlHelper = void 0;
const DbConnect_1 = require("./DbConnect");
class UrlHelper {
    constructor() {
        this.dbConnect = new DbConnect_1.DbConnect(process.env.DB_NAME || "");
        this.client = this.dbConnect.getClient();
    }
    addUrl(urlData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.dbConnect.connectDB();
                const db = this.client.db();
                const collection = db.collection(process.env.DB_COLLECTION_URL || "");
                const result = yield collection.insertOne(urlData);
                console.log("Inserted document ID:", result.insertedId);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                this.dbConnect.disConnectDB();
            }
        });
    }
    getUrl(shortenedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(shortenedUrl);
                const updatedUrl = `${process.env.BASE_URL}/${shortenedUrl}`;
                yield this.dbConnect.connectDB();
                const db = this.client.db();
                const collection = db.collection(process.env.DB_COLLECTION_URL || "");
                const result = yield collection.findOne({ shortenedurl: updatedUrl });
                if (!result) {
                    console.log("No result found");
                    return null;
                }
                return result.originalUrl;
            }
            catch (error) {
                console.error("Error in getUrl:", error);
                return null;
            }
            finally {
                this.dbConnect.disConnectDB();
            }
        });
    }
}
exports.UrlHelper = UrlHelper;
