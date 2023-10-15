import express from "express";
import dotenv from 'dotenv';
import { openaiAuthorized } from "../../middleware/index";
import multer from 'multer';
import fs from 'fs';
import { Readable } from 'stream';

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/script", openaiAuthorized, upload.single('audio'), async(req,res)=>{
    const openai = req.user.openai;
    try {
        const audioBuffer = req.file.buffer;
    // Test 1
        // const bufferStream = new Readable();
        // bufferStream.push(audioBuffer);
        // bufferStream.push(null); // ストリームの終端を示す

        // console.log("bufferStream???")
        // console.dir(bufferStream, {depth:4})

    // Test 2
        const bufferStream = Readable.from(audioBuffer);
        // Githubの中の天才によると、pathを入れることでOpenAIをあざむけるらしい。
        bufferStream.path = req.file.originalname;
        console.log("bufferStream???")
        console.dir(bufferStream, {depth:4})

    // Test 3
    console.log('req.file???')
    console.log(req.file)
    const language = req.body.language; // Access 'language' variable
    const temperature = req.body.temperature; // Access 'temperature' variable

        // const filePath = req.file.path;
        // console.log("file path???")
        // console.log(filePath)
        // const fileStream = fs.createReadStream(req.file.path);
        // console.log("fileStream???")
        // console.dir(fileStream, {depth:4})


        // const audioRealFileStream = fs.createReadStream("src/server/routers/api/audioScriptor/test2.mp3");

        // console.log("audioRealFileStream???")
        // console.dir(audioRealFileStream, {depth:4})

    // 次のとおり、ファイルから直接、は問題ない。メモリストレージにはバッファでしか保存できないから、バッファをストリームに変換する必要がある。
        // const script = await openai.createTranscription( fs.createReadStream("src/server/routers/api/audioScriptor/test2.mp3"),"whisper-1");
       
       
        // const script = await openai.createTranscription( bufferStream,"whisper-1");

        console.log(req.body);
       
        const script = await openai.createTranscription(
            bufferStream,
            "whisper-1",
            undefined,
            undefined,
            +req.body.temperature,
            req.body.language,
            {
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
            }
          );
    
        console.dir(script, {depth:4})
       
        // parameterは、ファイルのパス、モデル名、言語、温度、ストリームとか。 
            // https://github.com/openai/openai-node/issues/93
            // https://focusreactive.com/video-transcription-using-openai-part-1-using-whisper-for-transcription-extraction/

        res.json({pass:true,data:script.data.text})
    } catch (error) {
        console.log(error);
        res.json({pass:false,data:"Test unsuccessful"})
        
    }
})

export default router;

// これ、ドキュメント通りだけど、全然動かない。
        // const script = await openai.createTranscription({
        //     model: "whisper-1",
        //     file:fs.createReadStream("src/server/routers/api/audioScriptor/test2.mp3"),
        //     language: req.body.language,
        //     temperature: req.body.temperature,
        // });

// 同じくブラウザからじゃなくてNode.jsで頑張ろうとしている人多数。そして、とうとう解決策が見つかった、githubで。
    // https://stackoverflow.com/questions/75716899/convert-audio-buffer-into-readable-stream-to-use-in-whisper
    // https://github.com/openai/openai-node/issues/77

//File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm