
//const nodemailer = require('nodemailer');
//const nodeoutlook = require('nodejs-nodemailer-outlook');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const express = require('express');
const { loadSequelizeModels } = require('./helpers/sequelizeHelpers.js');



const cors = require('cors');
const app = express();

loadSequelizeModels();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
//log resquest & responses with dev function
app.use(morgan("dev"));

app.use(helmet());// Sécurization of Express with define Http header 
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('An error occurred');
});

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

// send email with nodemailer
/*app.get('/outlook', function (req, res) {
    nodeoutlook.sendEmail({
            auth: {
                user: "myemail@outlook.com",// a definir
                pass: "***"//a definit
            },
            from: "myemail@outlook.com",
            to: '****',
            subject: '****',
            html: '<b>This is bold text</b>',
            text: 'This is text version!',
            replyTo: "",


            onError: (e) => console.log(e),
            onSuccess: (i) => res.send("Email envoyé")
        }


    );
})*/
// routes
const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// error handling

// set port, listen for requests
const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });



