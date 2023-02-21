const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 3000;

app.listen(PORT, (err) => {
    console.log(`A node server is listening on port: ${PORT}`);
});
