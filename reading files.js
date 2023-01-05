const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = function (data) {
  return new Promise((resolve, reject) => {
    fs.readFile(data, 'utf8', (err, dat) => {
      if (err) {
        reject('Error reading file');
      } else {
        resolve(dat);
      }
    });
  });
};

const writeFilePro = function (
  data,
  fileToBeWritten
) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      data,
      fileToBeWritten,
      (err, dat) => {
        if (err) {
          reject('Error writing file');
        } else {
          resolve('File written successfully');
        }
      }
    );
  });
};

const getActivity = async () => {
  const data = await readFilePro(
    `${__dirname}/activity.txt`
  );
  const res = await superagent.get(
    `https://www.boredapi.com/api/${data}`
  );
  const { activity, type, participants, link } =
    res.body;
  const tdata = `$Activity:${activity}, Type:${type}, participants:${participants}`;
  await writeFilePro(
    `${__dirname}/newtet.txt`,
    tdata,
    (err) => {
      console.log(
        activity,
        type,
        participants,
        link
      );
      console.log('Erro');
    }
  );
};

(() => {
  const x = getActivity();
})();
// readFilePro(`${__dirname}/activity.txt`)
//   .then((data) => {
//     return superagent
//       .get(`https://www.boredapi.com/api/${data}`)
//       .then((res) => {
//         const {
//           activity,
//           type,
//           participants,
//           link,
//         } = res.body;
//         const tdata = `$Activity:${activity}, Type:${type}, participants:${participants}`;
//         return writeFilePro(
//           `${__dirname}/newtext.txt`,
//           tdata,
//           (err) => {
//             console.log(
//               err
//                 ? 'There was an error'
//                 : 'Success'
//             );
//           }
//         );
//       });
//   })
//   .catch((err) => {
//     console.log('There was an error');
//   });

// fs.readFile(`${__dirname}/activity.txt`, 'utf-8', (err, data) => {
//   if (err) return console.error('There was an error');
//   console.log(data);
//   superagent
//     .get(`https://www.boredapi.com/api/${data}`)
//     .then((res) => {
//       const { activity } = res.body;
//       fs.writeFile(`${__dirname}/newtext.txt`, activity, (err) => {
//         console.log(err ? 'There was an error' : 'There was no error');
//       });
//     })
//     .catch((err) => {
//       console.log('Error in getting data');
//     });
// });
