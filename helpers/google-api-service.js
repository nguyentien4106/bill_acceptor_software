const { google } = require('googleapis');
const stream = require("stream"); // Added

const CLIENT_ID = '711886891625-nuud2finio4ij5n68nutroldtq8b1c19.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04kDVFHV5txKGCgYIARAAGAQSNwF-L9IrX6xNiXW4vVKD5UK0JdIaFlDT88buBd0hX2KDODZhBnbRbwu5HrYo7g9plhnA2dEPysY';
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

const base64ImgTest = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="

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

function testUpload(){
    uploadFile("nguyenxuanhee", base64ImgTest).then(res => {
        generatePublicUrl(res.id).then(urlRes => {
            // const qr_svg = qr.image(urlRes.webViewLink, { type: 'png' });
            // qr_svg.pipe(fs.createWriteStream('view.png'));
            // const qr_svg_download = qr.image(urlRes.webContentLink, { type: 'png' });
            // qr_svg_download.pipe(fs.createWriteStream('download.png'));
        })
    }); 
}
// async function deleteFile(fileId) {
//   try {
//     const response = await drive.files.delete({
//       fileId: fileId, //'YOUR FILE ID',
//     });
//     console.log(response.data, response.status);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
function getFile(id){
  return new Promise(async (resolve, reject) => {
    try {
      const fileId = id; //'YOUR FILE ID';
      const file = await drive.files.get({
        fileId: fileId
      });

      /* 
      webViewLink: View the file in the browser
      webContentLink: Direct download link 
      */
      // const result = await drive.files.get({
      //   fileId: fileId,
      //   fields: 'webViewLink, webContentLink',
      // });
      console.log(file)
      resolve(file);
    } catch (error) {
      reject(error.message);
    }
  });
}
getFile("18c2-jfJk0xHTEZRk_mxAiJxC8jbvVDuq")
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
    testUpload: testUpload,
    generatePublicUrl: generatePublicUrl,
    getFile: getFile

}