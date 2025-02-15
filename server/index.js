import express from 'express';
import { Server } from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import ngrok from '@ngrok/ngrok'; // Uncomment if needed
import errorHandler from './handler/errorhandler.js';
import fileUpload from 'express-fileupload';
import ConnectDB from './config/DbConfig.js';
import ChatSocket from './utils/Chatsocket.js';
import checkExpiredSubscriptions from './utils/checkExpiredSubscriptions.js';
import cron from 'node-cron';
import { Server as socketIo } from 'socket.io';

dotenv.config();

const app = express();
const server = new Server(app);
const port = process.env.PORT;

ConnectDB();


const io = new socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_APP_URL,
  },
});

// Export the 'io' instance
export { io };

// Call the ChatSocket function with 'io'
ChatSocket(io);

// Run every day at midnight
cron.schedule('0 0 * * *', () => {
  checkExpiredSubscriptions();
});

// process?.env?.JWT_SECRET
//middlewares
app.use(cookieParser(process?.env?.JWT_SECRET, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/'
}));



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
import GetAPIRoute from './routes/GetAPIRoute.js';
import jobroutes from './routes/JobRoutes.js';
import Orgroutes from './routes/OrgRoute.js';
import CandidateRoutes from './routes/CandidateRoute.js';
import MessageRoutes from './routes/MessageRoute.js';
import Userroute from './routes/UserauthRoute.js';
import SubscriptionRoutes from './routes/SubcriptionRoute.js';

app.get('/hello', (req, res) => {
  res.send('<h1 style="color: green; font-size: 24px;">Hello World!</h1>')
})



app.use('/api/user', Userroute);
app.use('/api/org', Orgroutes);
app.use('/api/job', jobroutes);
app.use('/api', GetAPIRoute);
app.use('/api/candidate', CandidateRoutes);
app.use('/api/message', MessageRoutes);
app.use('/api/subscription', SubscriptionRoutes);


app.use(errorHandler);

server.listen(port, () => {
  console.log(`server Listing on Port ${port}`);
});

{/** ngrok config for public address and webhook verification */}
// ngrok.connect({
//   addr: port,
//   authtoken: process.env.NGROK_AUTHTOKEN,
//   hostname: 'calm-penguin-informed.ngrok-free.app' 
// }).then(listener => {
//     console.log(listener.url());
// }).catch(error => {
//     console.error("Ngrok connection failed:", error);
// });
