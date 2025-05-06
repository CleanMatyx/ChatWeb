const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const nunjucks = require('nunjucks');
const cors = require('cors'); // Importar el middleware de CORS

let app = express();
let server = http.createServer(app);
let io = socketio(server, {
    cors: {
        origin: 'https://matiasborra.es', // Permitir solicitudes desde este dominio
        methods: ['GET', 'POST'], // Métodos permitidos
        credentials: true // Si necesitas enviar cookies o encabezados de autenticación
    }
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

// Configurar el middleware de CORS para Express
app.use(cors({
    origin: 'https://matiasborra.es', // Permitir solicitudes desde este dominio
    methods: ['GET', 'POST'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies o encabezados de autenticación
}));

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(8083);

io.on('connection', (socket) => {
    socket.emit('conectado');
    socket.on('enviar', (datos) => {
        io.emit('difundir', datos);
    });
});