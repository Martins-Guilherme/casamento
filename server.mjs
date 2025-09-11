import express from 'express';
import createItensRouter from "./pages/createPresent.js";
import updateItensRouter from "./pages/updatePresent.js"
import convidadosDeleCreatRouter from "./pages/convidadosRouter.js"

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hellou World")
})

app.use("/presentes", createItensRouter);
app.use("/presentes", updateItensRouter);
app.use("/convidados", convidadosDeleCreatRouter)


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})