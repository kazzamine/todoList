const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const taskRoutes = require('./routes/tasks'); 
const port = 3000;

app.use('/node_modules', express.static('node_modules'));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/', taskRoutes);

app.listen(port, () => {
    console.log(`Server status : Running`);
});
