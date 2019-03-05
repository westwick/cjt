import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import sqip from 'sqip';
var requireContext = require('require-context');

function downloadImage(ucareUrl) {
  return new Promise(async (resolve, reject) => {
    const id = ucareUrl.substring(ucareUrl.indexOf('.com/')+5, ucareUrl.length - 1);
    const finalpath = path.resolve(__dirname, '../assets/generated', id + '.svg')

    if (fs.existsSync(finalpath)) {
      console.log(`${id} exists, skipping`);
      resolve();
    } else {
      console.log(`converting: ${id}`);
      const url = ucareUrl + '-/scale_crop/440x272/';
      const img = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
      });
      const temppath = path.resolve(__dirname, './temp', 'temp.jpg')
      const writer = fs.createWriteStream(temppath);
      img.data.pipe(writer)
      writer.on('finish', () => {
        console.log(`wrote jpg, starting sqip`);
        const result = sqip({
          filename: './modules/temp/temp.jpg',
          numberOfPrimitives: 30,
          blur: 0
        });
        console.log('sqip worked!');
        fs.writeFile(finalpath, result.final_svg, (err) => {
          if (err) throw err;
          console.log('svg saved');
          fs.unlinkSync(temppath);
          resolve();
        });
      });
    }
  });
}

module.exports = async function imgGen (moduleOptions) {
  const toursPath = path.resolve(__dirname, '../content/tours');
  const toursContext = requireContext(toursPath, false, /\.json$/);
  const tours = toursContext.keys().map(key => ({
    ...toursContext(key),
    showBooking: false,
    _path: `/tours/${key.replace('.json', '').replace('./', '')}`
  }));
  for (const tour of tours) {
    const done = await downloadImage(tour.thumbnail);
  }
}
