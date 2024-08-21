const express = require('express');
const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const port = process.env.PORT;
const errorHandler = require('./handler/errorhandler');
const fileUpload = require('express-fileupload');
const ConnectDB = require('./config/DbConfig');
const ChatSocket = require('./utils/Chatsocket');


const io = require('socket.io')(server, {
 cors: {
    origin: process.env.FRONTEND_APP_URL,
  },
});
module.exports.io = io;
ChatSocket(io);
ConnectDB();


//middlewares
app.use(cookieParser());



const corsOptions = {
  origin:  process.env.FRONTEND_APP_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  process.env.FRONTEND_APP_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(morgan('dev'));
morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, useTempFiles: false }),
);

//Routes
const GetAPIRoute = require('./routes/GetAPIRoute');
const jobroutes = require('./routes/JobRoutes');
const Orgroutes = require('./routes/OrgRoute');
const CandidateRoutes = require('./routes/CandidateRoute');
const MessageRoutes = require('./routes/MessageRoute');
const Userroute = require('./routes/UserauthRoute');


app.use('/api/user', Userroute);
app.use('/api/org', Orgroutes);
app.use('/api/job', jobroutes);
app.use('/api', GetAPIRoute);
app.use('/api/candidate', CandidateRoutes);
app.use('/api/message', MessageRoutes);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`server Listing on Port ${port}`);
});
