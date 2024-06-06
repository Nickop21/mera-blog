import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritePojectid);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteBucketId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("createpost", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteBucketId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("updatepost", error);
    }
  }
  async deletepost(slug) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteBucketId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletepost", error);
      return false
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteBucketId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getpost", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.getDocument(
        conf.appwriteBucketId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("getposts", error);
    }
  }
  async uploadeFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uplodefile", error);
    }
  }
  async deleteFile(fileid) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileid);
      return true;
    } catch (error) {
      console.log("delete file", error);
      return false;
    }
  }

  getfilePreview(fileid){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileid
    )
  }
}
