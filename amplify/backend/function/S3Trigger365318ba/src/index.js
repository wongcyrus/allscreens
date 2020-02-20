// eslint-disable-next-line


require('es6-promise').polyfill();
require('isomorphic-fetch');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({ signatureVersion: 'v4' });

/*
Note: Sharp requires native extensions to be installed in a way that is compatible
with Amazon Linux (in order to run successfully in a Lambda execution environment).

If you're not working in Cloud9, you can follow the instructions on http://sharp.pixelplumbing.com/en/stable/install/#aws-lambda how to install the module and native dependencies.
*/
const Sharp = require('sharp');

// We'll expect these environment variables to be defined when the Lambda function is deployed
const THUMBNAIL_WIDTH = parseInt(process.env.THUMBNAIL_WIDTH || 320, 10);



function thumbnailKey(filename) {
  return `public/resized/${filename}`;
}

function fullsizeKey(filename) {
  return `public/fullsize/${filename}`;
}

function makeThumbnail(photo) {
  return Sharp(photo).resize({ width: THUMBNAIL_WIDTH }).toBuffer();
}

async function resize(photoBody, bucketName, key) {
  const keyPrefix = "";//key.substr(0, key.indexOf('/upload/'));
  const originalPhotoName = key.substring(key.indexOf('/')+1);
  const originalPhotoDimensions = await Sharp(photoBody).metadata();

  console.log(keyPrefix, key);
  

  const thumbnail = await makeThumbnail(photoBody);

  await Promise.all([
    S3.putObject({
      Body: thumbnail,
      Bucket: bucketName,
      Key: thumbnailKey(originalPhotoName),
      ContentType: 'image/png'
    }).promise(),

    S3.copyObject({
      Bucket: bucketName,
      CopySource: bucketName + '/' + key,
      Key: fullsizeKey(originalPhotoName),
      ContentType: 'image/png'
    }).promise(),
  ]);

  await S3.deleteObject({
    Bucket: bucketName,
    Key: key
  }).promise();

  return {
    photoId: originalPhotoName,

    thumbnail: {
      key: thumbnailKey(keyPrefix, originalPhotoName),
      width: THUMBNAIL_WIDTH
    },

    fullsize: {
      key: fullsizeKey(keyPrefix, originalPhotoName),
      width: originalPhotoDimensions.width,
      height: originalPhotoDimensions.height
    }
  };
}

async function processRecord(record) {
  const bucketName = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

  console.log('processRecord', JSON.stringify(record));

  if (record.eventName !== "ObjectCreated:Put") { console.log('Is not a new file'); return; }
  if (!key.includes('upload/')) { console.log('Does not look like an upload from user'); return; }
  if (key.includes('resized/') || key.includes('fullsize/')) { console.log('Processed file.'); return; }

  const originalPhoto = await S3.getObject({ Bucket: bucketName, Key: key }).promise();

  const metadata = originalPhoto.Metadata;
  console.log('metadata', JSON.stringify(metadata));
  console.log('resize');
  const sizes = await resize(originalPhoto.Body, bucketName, key);
  console.log('sizes', JSON.stringify(sizes));
}


exports.handler = async(event, context, callback) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));

  try {
    event.Records.forEach(processRecord);
    callback(null, { status: 'Photo Processed' });
  }
  catch (err) {
    console.error(err);
    callback(err);
  }
};
