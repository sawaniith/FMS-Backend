const mongoose = require('mongoose');
const URI = process.env.DATABASE;
mongoose.connect(URI, 
    {useNewUrlParser: true}).then(() => 
          console.log("MongoDB connected")).catch((err) => console.log(err));