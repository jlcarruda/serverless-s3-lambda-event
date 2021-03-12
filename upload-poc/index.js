const dotenv = require('dotenv')
const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

dotenv.config()
const app = express();

const AWS_CREDENTIALS = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET
}

const s3 = new aws.S3(AWS_CREDENTIALS);
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const cleanName = file.originalname
        .replace(/[^A-Z0-9]/gi, "_")
        .toLowerCase();

      const filename = `${Date.now()}-${cleanName}`;
      cb(null, filename);
    },
  }),
});

app.post("/upload", upload.array("photos", 3), function (req, res, next) {
  // res.send('Successfully uploaded ' + req.files.length + ' files!')
  console.log("Received request", req.files)
  res.send(req.files);
});

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json(error)
})

app.listen(3333);
