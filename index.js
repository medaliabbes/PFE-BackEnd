
require('dotenv').config()

const mongoose = require('mongoose') ;
const express = require('express')   ;
const app     = express() ;

//configure mongoose
/*mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/CRUD",
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );
*/
  console.log(process.env.API_KEY) // remove this a