import express from 'express';
import managementPresentsRouter from "./pages/presentsRouter.js";
import managementGuestsRouter from "./pages/guestsRouter.js"
import escolherComTokenRouter from "./pages/escolherComToken.js"
import presentCreatRouter from "./pages/creatUpdatePresent.js"
import dotenv from 'dotenv'

const app = express();
const PORT = 5000;
dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hellou World")
})

// Rotas para presentes
app.use("/presente", presentCreatRouter);
app.use("/presentes/escolher-com-token", escolherComTokenRouter);

// Rota de gerenciamento de presentes
app.use("/presentes", managementPresentsRouter);

// Rota de gerenciamento de convidados
app.use("/convidados", managementGuestsRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})