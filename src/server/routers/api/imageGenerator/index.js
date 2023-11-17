const express = require("express");
const fs = require("fs"); // For test code
const path = require('path'); // For test code
const crypto = require('crypto');

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

const {
  openaiAuthorized,
  usageRestrictions,
} = require(`${global.routesDir}/middleware/index`);

const router = express.Router();

const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME
const awsS3BucketRegion = process.env.AWS_S3_BUCKET_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region: awsS3BucketRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
});

router.post(
  "/images",
  openaiAuthorized,
  usageRestrictions,
  async (req, res) => {
    const openai = req.openaiAuth;
    console.log("Check env file if it doesn't work.");
    if (process.env.EXECUTABLE_DALL_E === "true") {
      console.time("Image load time");
      try {

      // Test code
        // const response = { data : { data : [] } }
        // const imagePaths = ['./test/page1.jpg','./test/page2.jpg'];
        // const convertBuffer = async(paths) => {
        //   for(let i = 0; i < paths.length; i++) {
        //     try {
        //       const fullPath = path.join(__dirname, paths[i]);
        //       console.log(fullPath)
        //       const buffer = fs.readFileSync(fullPath);
        //       response.data.data.push({b64_json:buffer});
        //     } catch (error) {
        //       console.error(error.message);
        //     }
        //   };
        // }

        // await convertBuffer(imagePaths);

        const response = await openai.createImage({
          prompt: req.body.prompt,
          n: req.body.n,
          size: req.body.size,
          response_format: "b64_json",
        });

        const imageFiles = [...response.data.data];

        imageFiles.forEach( obj => {
          const randomImageName = crypto.randomBytes(16).toString('hex');
          obj.fileName = randomImageName + '.jpg';
          obj.fullURL = `https://${awsS3BucketName}.s3.amazonaws.com/${randomImageName}.jpg`;
        });

        const uploadPromises = imageFiles.map((obj) => {
          const buffer = Buffer.from(obj.b64_json, 'base64');
          console.log(obj.fileName);
          const s3Params = {
            Bucket: awsS3BucketName,
            Key: obj.fileName,
            Body: buffer,
            ContentType: 'image/jpeg',
          };
          const command = new PutObjectCommand(s3Params);
          return s3.send(command);
        });
        
        await Promise.all(uploadPromises);
        
        req.user.usageCount[req.body.serviceType] += 1;
        await req.user.save();

        const imageUrls = imageFiles.map(obj =>{return {url:obj.fullURL, imageName:obj.fileName}});
        res.json({ pass: true, data: imageUrls });
      } catch (error) {
        console.error(error);
        res.status(500).send('Image upload error');
      } finally {
        console.timeEnd("Image load time");
      }
    } else {
      res.json({ pass: true, data: [{ test: true }] });
    }
  }
);

router.get("/downloadImage/:imageName", async (req, res) => {
  const imageName = req.params.imageName;
  const s3Params = {
    Bucket: awsS3BucketName,
    Key: imageName,
  };
  const command = new GetObjectCommand(s3Params);

  try {
    const response = await s3.send(command);
    res.setHeader('Content-Type', response.ContentType);
    res.attachment(imageName);

    const stream = response.Body;
    stream.on('error', (streamError) => {
      console.error(streamError);
      res.status(500).end();
    });

    stream.pipe(res).on('finish', () => {
      console.log('Download finished');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while downloading file');
  }
});

module.exports = router;
