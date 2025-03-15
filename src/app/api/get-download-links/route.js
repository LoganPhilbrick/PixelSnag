import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

// AWS S3 Configuration
const bucketName = "pixelsnag";
const region = "us-east-2"; // Change this to your S3 bucket region

// Initialize S3 client
const s3Client = new S3Client({ region });

// Define paths for different operating systems
const paths = [
  { os: "win32", prefix: "pixel-snag/win32/x64/", system: "Windows" },
  {
    os: "macos",
    prefix: "pixel-snag/darwin/arm64/",
    system: "macOS (Apple Silicon)",
  },
];

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const useSignedUrls = searchParams.get("signed") === "true";

    let allFiles = [];

    for (const path of paths) {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: path.prefix,
      });

      const response = await s3Client.send(command);

      if (response.Contents && response.Contents.length > 0) {
        const filteredFiles = response.Contents.filter((file) =>
          path.os === "win32" ? file.Key.endsWith(".exe") : true
        ).filter((file) =>
          path.os === "macos" ? file.Key.endsWith(".zip") : true
        );

        if (filteredFiles.length > 0) {
          let fileUrls;

          if (useSignedUrls) {
            fileUrls = await Promise.all(
              filteredFiles.map(async (file) => {
                const getObjectCommand = new GetObjectCommand({
                  Bucket: bucketName,
                  Key: file.Key,
                });
                return getSignedUrl(s3Client, getObjectCommand, {
                  expiresIn: 3600,
                });
              })
            );
          } else {
            fileUrls = filteredFiles.map(
              (file) =>
                `https://${bucketName}.s3.${region}.amazonaws.com/${file.Key}`
            );
          }

          // Add to allFiles array with OS information
          allFiles.push({
            os: path.os,
            system: path.system,
            files: fileUrls.reverse(),
          });
        }
      }
    }

    if (allFiles.length === 0) {
      return NextResponse.json({ message: "No files found." }, { status: 404 });
    }

    return NextResponse.json({ files: allFiles });
  } catch (error) {
    console.error("Error listing files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
