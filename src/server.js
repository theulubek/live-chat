import ejs from 'ejs';
import cors from 'cors';
import http from "http";
import path from 'path';
import './config/index.js';
import express  from "express";
import fileUpload from 'express-fileupload';
import { Server } from "socket.io";

import database from './config/db.js';
import mock from './mock.js';

import UserRoute from './routes/users.js';
import MessageRoute from './routes/messages.js';

import errorHandler from './middlewares/errorHandler.js';
import databaseMiddleware from './middlewares/database.js'
import logger from './middlewares/logger.js';

!async function() {
    const app = express();
    const httpServer = http.createServer(app);
    const io = new Server(httpServer);

    app.use(cors());

    // database connection
    const db = await database();

    // mock data
    // await mock({ sequelize: db });

    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(process.cwd(), 'src', 'views'));
    
    app.use(express.static(path.join(process.cwd(), 'src', 'public')));
    app.use(databaseMiddleware({ sequelize: db }));
    app.use(express.json());
    app.use(fileUpload());

    // render html
    app.get('/', (req, res) => res.render('index'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/register', (req, res) => res.render('register'));

    // routes
    app.use(UserRoute);
    app.use(MessageRoute);

    // error handler
    app.use(errorHandler);
    app.use(logger);

    httpServer.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
}()