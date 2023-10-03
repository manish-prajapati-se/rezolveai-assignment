//importing required modules
const pool = require("./database");
const express = require("express");

//create a backend server using express
const app = express();

//creating a route to fetch toppers data
app.get("/api/toppers", async (req, res) => {
  try {

    //get a connection from mysql pool
    const connection = await pool.getConnection();

    const sqlQuery = `
  SELECT
    subject,
    name AS topper,
    marks AS score
  FROM students
  WHERE (subject, marks) IN (
    SELECT
      subject,
      MAX(marks) AS max_marks
    FROM students
    GROUP BY subject
  )
`;
    const [rows, fields] = await connection.execute(sqlQuery);

    //release the connection
    connection.release();

    //send the result as JSON
    res.json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//Set the port for the server
const port = 3000;

//Start the server
app.listen(port, () => {
  console.log("Server started listening on port:", port);
});
