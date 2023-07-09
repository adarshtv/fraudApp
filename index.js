const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoute = require("./routes/User");
const memberRoute = require("./routes/Member");
const loansRoute = require("./routes/Loans");
const subscriptionsRoute = require("./routes/Subscriptions");
const mdtwfRoute = require("./routes/MDTWF");
const kuriRoute = require("./routes/Kuri");
const reportsRoute = require("./routes/Reports");
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;
const corsOption = {credentials: true, origin: process.env.URL || "*"};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/',express.static(path.join(__dirname,'PaisaSanchay')));


app.use('/users', userRoute);
app.use('/members', memberRoute);
app.use('/transactions',loansRoute);
// app.use('/subscriptions',subscriptionsRoute);
// app.use('/kuri',kuriRoute);
// app.use('/mdtwf',mdtwfRoute);
app.use('/collectionReports',reportsRoute);

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'/PaisaSanchay/index.html'));
});


app.listen(port, ()=>{
    console.log(`Application starting on port ${port}`)
})