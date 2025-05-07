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
exports.DbConnect = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
class DbConnect {
    constructor(dbName) {
        this.url = process.env.DB_CONNECTION_URL || "";
        this.dbName = dbName;
        this.client = new mongodb_1.MongoClient(this.url, {
            maxPoolSize: 10000,
            retryReads: true,
            retryWrites: true,
            family: 4,
            serverSelectionTimeoutMS: 10000,
            tls: true
        });
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log("DB >> connected");
            }
            catch (error) {
                console.error(error);
                console.error("Error while connecting");
            }
        });
    }
    disConnectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.close();
                console.log("DB >> connection closed");
            }
            catch (error) {
                console.error("Error while disconnecting");
            }
        });
    }
    getClient() {
        return this.client;
    }
}
exports.DbConnect = DbConnect;
