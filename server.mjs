import express from 'express';
import createItensRouter from "./pages/createPresent.js";
import updateItensRouter from "./pages/updatePresent.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hellou World")
})

app.use("/presentes", createItensRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})