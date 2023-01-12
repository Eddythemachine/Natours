// CORE MODULES
const fs = require("fs");
const path = require("path");

// NPM MODULES
const express = require("express");
const console = require("console");
const app = express();

// MIDDLE WARE
app.use(express.json());
// Creating our own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

// app.get('/', (req, res) => {
//   res.status(200).send('Hello');
// });
const getTour = (req, res) => {
  console.log(req.requestTime);
  console.log(req.params);
  const tour = tours.find((el) => el.id === +req.params.id);

  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: "Failed",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    // status: tour ? 'Successfull' : 'Failed',
    status: "Success",
    data: {
      tour,
    },
  });
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Successfull",
    results: tours.length,
    data: { tours: tours },
  });
};

const updateTour = (req, res) => {
  // Validate your url
  console.log(req.params);
  res.status(200).json({
    status: "Successfull",
    data: {
      tours: "Data updated",
    },
  });
};

const deleteTour = (req, res) => {
  // Validate your url
  console.log(req.params);
  res.status(204).json({
    status: "Successfull",
    data: null,
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newObj = Object.assign({ id: newId }, req.body);
  tours.push(newObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Successfull",
        data: {
          tours: newObj,
        },
      });
    }
  );
  // Object.assign creates a new object and merges it with an existing object
};

// app.get("/api/v1/tours", getAllTours);
// app.post("/api/v1/tours", createTour);
// app.get("/api/v1/tours/:id", getTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log("Server started");
});

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

// IMPORTANT CODE

// const tours = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     'utf-8'
//   )
// );

// app.get((path = '/api/v1/tours'), (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign(
//     {
//       id: newId,
//     },
//     req.body
//   );
//   tours.push(newTour);
//   fs.writeFile(
//     console.log(
//       'Hello'
//     )`${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       if (err) console.log('Failed to save file');
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );

//   // res.send('done'); \
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port !`);
// });
