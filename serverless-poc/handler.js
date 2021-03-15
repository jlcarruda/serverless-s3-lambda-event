'use strict';

module.exports.hello = async (event) => {
  // console.log("Triggered Event", JSON.stringify(event.Records[0].s3) )
  const eventRecord = event.Records[0]
  const srcBucket = eventRecord.s3.bucket.name
  const srcKey = decodeURIComponent(eventRecord.s3.object.key.replace(/\+/g, " "))

  console.log(`S3 event triggered: ${eventRecord.eventName}`)
  console.log(`S3 Bucket name: ${srcBucket}`)
  console.log(`S3 Object Key: ${srcKey}`)
};
