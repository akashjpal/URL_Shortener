import { UrlModel } from "../Models/UrlModel";
import { DbConnect } from "./DbConnect";

export class UrlHelper {
    public dbConnect;
    private client;
    constructor() {
        this.dbConnect = new DbConnect(process.env.DB_NAME || "");
        this.client = this.dbConnect.getClient();
    }

    public async addUrl(urlData: UrlModel) {
        try {
            this.dbConnect.connectDB();
            const db = this.client.db();
            const collection = db.collection(process.env.DB_COLLECTION_URL || "");
            const result = await collection.insertOne(urlData);
            console.log("Inserted document ID:", result.insertedId);
        } catch (error: any) {
            console.error(error);
        }finally{
            this.dbConnect.disConnectDB();
        }
    }

    public async getUrl(shortenedUrl: string): Promise<string | null> {
        try {
            console.log(shortenedUrl);
            const updatedUrl = `${process.env.BASE_URL}/${shortenedUrl}`
            await this.dbConnect.connectDB();
            const db = this.client.db();
            const collection = db.collection(process.env.DB_COLLECTION_URL || "");
            const result: UrlModel | null = await collection.findOne<UrlModel>({ shortenedurl: updatedUrl });
            if (!result) {
                console.log("No result found");
                return null;
            }
            return result.originalUrl;
        } catch (error: any) {
            console.error("Error in getUrl:", error);
            return null;
        } finally {
            this.dbConnect.disConnectDB();
        }
    }
}