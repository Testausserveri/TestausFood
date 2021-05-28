import { encode } from 'blurhash';
import jpg from 'jpeg-js';

const loadImage = async base64 =>
  new Promise((resolve) => {
    var img = Buffer.from(base64.substr(23), 'base64');
    resolve(jpg.decode(img));
  });

export default async (base64) => {
  try {
    const image = await loadImage(base64);
    return encode(image.data, image.width, image.height, 4, 4);
  } catch (e) {
    return 'UQSF;Lt7~qM{M{j[xuWB-;WBD%xu%MWBM{t7';
  }
}