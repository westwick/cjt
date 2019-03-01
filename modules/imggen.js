import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import sqip from 'sqip';

function downloadImage() {
  return new Promise(async (resolve, reject) => {
    const img = await axios({
      url: 'https://ucarecdn.com/277ae637-95cd-4073-ab72-380475ae361a/-/scale_crop/440x272/',
      method: 'GET',
      responseType: 'stream'
    });
  
    const temppath = path.resolve(__dirname, './temp', 'test.jpg')
    const finalpath = path.resolve(__dirname, '../assets/generated', 'test.svg')
    
    const writer = fs.createWriteStream(temppath);
    img.data.pipe(writer)
  
    writer.on('finish', () => {
      console.log('wrote jpg, starting sqip');
      const result = sqip({
        filename: './modules/temp/test.jpg',
        numberOfPrimitives: 5,
        blur: 12
      });
      console.log('sqip worked!');
      fs.writeFile(finalpath, result.final_svg, (err) => {
        if (err) throw err;
        console.log('svg saved');
        fs.unlinkSync(temppath);
        resolve();
      });
    });
  });
}

module.exports = async function imgGen (moduleOptions) {
  await downloadImage();
}
