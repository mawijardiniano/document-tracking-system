const { google } = require("googleapis");
const { Readable } = require("stream");
const path = require("path");

const KEY_FILE_PATH = path.join(__dirname, "../config/hopeful-sound-412801-b2f14b243369.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

async function uploadFile(fileBuffer, fileName) {
  try {
  
    const fileStream = new Readable();
    fileStream.push(fileBuffer);
    fileStream.push(null); // End of stream

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: ["1ds9EJrSSMEHYg5Hj9VCyJa3IyLz7Dw_v"], 
      },
      media: {
        mimeType: "application/octet-stream",
        body: fileStream, 
      },
    });

    if (!response.data.id) {
      console.error("Upload failed: No file ID returned");
      return null;
    }

    const fileId = response.data.id;

  
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Generate shareable file link
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

    return { fileId, fileUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

module.exports = { uploadFile };
