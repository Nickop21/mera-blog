import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"



export class Authservice{
    client=new Client();
    account;
    constructor()
    {
        this.client.setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwritePojectid);
        this.account=new Account(this.client);
    } 

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
            
            }
            else return userAccount;
        } catch (error) {
            throw error
        }
    }
    
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

    async getCurrentUse(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite:getCurrentUser :: error",error);
        }
        return null
    }
}
const authservice=new Authservice();


export default authservice;