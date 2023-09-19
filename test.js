
// import { readPsd } from 'ag-psd';

const {readPsd} = require('ag-psd')
const fs = require('fs')
const buffer = fs.readFileSync('test.psd');

// read only document structure
const psd1 = readPsd(buffer, { skipThumbnail: true, useImageData: true });
console.log(psd1.children[1].children);
// fs.writeFileSync('layer-1.png', (psd1.children[1].children).toBuffer());

// read document structure and image data
// const psd2 = readPsd(buffer);
// console.log(psd2);
// // by defaults `canvas` field type is HTMLCanvasElement, so it needs to be cast to `any`
// // or node-canvas `Canvas` type, in order to call `toBuffer` method
// fs.writeFileSync('layer-1.png', (psd2.children[0].canvas).toBuffer());