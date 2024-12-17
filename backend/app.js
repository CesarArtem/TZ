const express = require('express');
const employeeRouter = require('./routes/employee');
const departmentRouter = require('./routes/department');
const app = express();
const cors = require('cors');
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use('/', employeeRouter);
app.use('/', departmentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});