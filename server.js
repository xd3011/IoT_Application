const express = require("express");
const app = express();
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 5000;
// Create router
const route = require("./routes");
const db = require("./config/db");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Connect to DB
db.connect();
// Route init
route(app);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/api/auth/login`));
