import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

export const openaiAuthorized = (req, res, next) => {
    console.log("middleware works");
    // next();
    try {
        console.log(1)
        if (!process.env.CHATGPT_APIKEY) {
            throw new Error("API key not found");
        }
        
        console.log(2)
        const configuration = new Configuration({
            apiKey: process.env.CHATGPT_APIKEY
        });
        const openai = new OpenAIApi(configuration);
        console.log(3)
        
        if (!req.user) {
            req.user = {};
        }
        
        req.user.openai = openai;
        console.log(4)
        console.log("middleware works");
        next();
    } catch (error) {
        console.log("middleware NOT works");
        res.status(500).json({ pass:false, data: error.message });
    }
}
