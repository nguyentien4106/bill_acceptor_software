const { google } = require('googleapis');
const stream = require("stream"); // Added

const CLIENT_ID = '711886891625-nuud2finio4ij5n68nutroldtq8b1c19.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04MRgVaPko-awCgYIARAAGAQSNwF-L9IrMgzRonzazRrGhfajGdt_UEiacY2YIIEBUpwEV7LYFAVQGrZwFPhO7jxQIJ72RxsqG_c';
const FOLDER_ID = '1nucNIiGn_z9NQrkgjnWdkrTAhhcs-RwD'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/


function convertImageFromBase64ToImage(img){
    const uploadImg = img.split(/,(.+)/)[1];
    const buf = new Buffer.from(uploadImg, "base64"); // Added
    const bs = new stream.PassThrough(); // Added
    bs.end(buf); // Added
    return bs;
}

function uploadFile(name, base64Img) {
    return new Promise((resolve, reject) => {
      drive.files
        .create({
          requestBody: {
            name: name, //This can be name of your choice
            mimeType: 'image/jpg',
            parents: [FOLDER_ID]
          },
          media: {
            mimeType: 'image/jpg',
            body: convertImageFromBase64ToImage(base64Img),
          },
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
}

function generatePublicUrl(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileId = id; //'YOUR FILE ID';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      /* 
      webViewLink: View the file in the browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });

      resolve(result.data);
    } catch (error) {
      reject(error.message);
    }
  });
}

module.exports = {
    uploadFile: uploadFile,
    generatePublicUrl: generatePublicUrl

}