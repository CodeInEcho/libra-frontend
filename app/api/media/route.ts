import S3 from "aws-sdk/clients/s3"
import { randomUUID } from "crypto"
import { NextResponse } from 'next/server'
 
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const fileType = searchParams.get('fileType');
  const ex = (fileType as string).split("/")[1];
  const Key = `${randomUUID()}.${ex}`;
  const s3Params = {
    Key: Key,
    Expires: 60,
    ContentType: fileType,
    Bucket: process.env.AWS_BUCKET,
  };

  const uploadUrl = await s3.getSignedUrl("putObject", s3Params);
  return NextResponse.json({ uploadUrl, Key })
}