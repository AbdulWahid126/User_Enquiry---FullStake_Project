let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete } = require('../../controllers/web/enquiryController');
let enquiryRouter = express.Router();

enquiryRouter.post('/insert', enquiryInsert);

enquiryRouter.get("/view", enquiryList)

enquiryRouter.delete("/delete/:id",enquiryDelete)

module.exports = enquiryRouter;