import { MongoClient } from "mongodb";
import "dotenv/config";

export class DbConnect {
    private url:string = process.env.DB_CONNECTION_URL || "";
    private client:MongoClient;
    private dbName;
    constructor(dbName: string){
        this.dbName = dbName;
        this.client = new MongoClient(this.url,{
            maxPoolSize: 10000,
            retryReads: true,
            retryWrites: true,
            family: 4,
            serverSelectionTimeoutMS:10000,
            tls: true
        });
    }

    public async connectDB() {
        try{
            await this.client.connect();
            console.log("DB >> connected");
        }catch(error: any){
            console.error(error);
            console.error("Error while connecting");
        }
    }

    public async disConnectDB() {
        try{
            await this.client.close();
            console.log("DB >> connection closed")
        }catch(error:any){
            console.error("Error while disconnecting")
        }
    }

    public getClient() :MongoClient {
        return this.client;
    }
}