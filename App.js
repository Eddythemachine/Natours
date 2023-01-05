// C
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
// res.status(200).send('Hello From the server side');
//   res.status(200).json([
//     { name: 'James', age: 30 },
//     { name: 'Ana', age: 27 },
//     { name: 'Ana', age: 27 },
//   ]);
// });

// app.post('/eddy', (req, res) => {
//   res.send('You can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get((path = '/api/v1/tours'), (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    console.log('Hello')`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log('Failed to save file');
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send('done'); \
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port !`);
});
