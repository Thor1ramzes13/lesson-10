import mongoose from 'mongoose'
import config from '../config/default.mjs'

mongoose.Promise = global.Promise;

export default async () => {
	try {
		mongoose.connect(config.mongoURI);
		console.log("Successfully connected to the database");
	} catch (error) {
		console.log("Database connection failed:", error);
	}
}