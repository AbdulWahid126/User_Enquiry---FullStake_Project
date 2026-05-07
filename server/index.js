let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const enquiryRouter = require('./app/routes/web/enquiryRoutes');
require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.json());

// Import Routes
app.use('/api/website/enquiry', enquiryRouter);


// Connect to MongoDB
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is Runnung")
    })
}).catch((err) => {
    console.log(err);
});



