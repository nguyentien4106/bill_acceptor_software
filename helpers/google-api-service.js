const { google } = require('googleapis');
const stream = require("stream"); // Added
const XLSX = require('xlsx');
const { Readable } = require('stream');

const CLIENT_ID = '711886891625-nuud2finio4ij5n68nutroldtq8b1c19.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04xdeZNlHixTXCgYIARAAGAQSNwF-L9IrhgxwqyAWgdAion6phw2Nv6NyYEZKkE3AkrxXz3g6DIhBqVGC81FSnklgF4pgIN3znMQ';
const FOLDER_ID = '1nucNIiGn_z9NQrkgjnWdkrTAhhcs-RwD'
const REPORT_FOLDER_ID = '1fmqTIBm9V-QVmjhF0sJfOF7eMzX3nXMn'

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

function getUsers(){
  return new Promise((resolve, reject) => {
    drive.files.export({
      fileId: "1GNYRAmhN0cT6_rYDyFKvlsWyKQ_jgD1jvAalmM1HrY8",
      mimeType: "text/plain"
    }).then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}

function testUpload() {
  const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
  uploadFile("test.png", image).then(res => console.log(res))
}
function uploadTextFile(jsonData, fileName){
  // Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Convert the workbook to a buffer
  const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  const requestBody = {
    name: fileName,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    parents: [REPORT_FOLDER_ID]
  }

  const media = {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    body: Readable.from(excelBuffer)
  };
  
  return new Promise((resolve, reject) => {
    drive.files
      .create({
        requestBody: requestBody,
        media: media,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
module.exports = {
    uploadFile: uploadFile,
    generatePublicUrl: generatePublicUrl,
    testUpload: testUpload,
    getUsers: getUsers,
    uploadTextFile: uploadTextFile
}