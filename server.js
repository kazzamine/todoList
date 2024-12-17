const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const taskRoutes = require('./routes/tasks'); 
const port = 3000;

app.use('/node_modules', express.static('node_modules'));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/', taskRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server status : Running`);
});
