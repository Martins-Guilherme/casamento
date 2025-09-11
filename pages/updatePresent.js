import { prisma } from "./utilits.js";
import express from "express";

const router = express.Router();

router.put("/", async (req, res) => {
  try {

    const { presentId, convidadoId } = req.body;

    const presenteAtualizado = await prisma.tabelaDePresentes.update({
      where: {
        id: presentId
      },
      data: {
        convidadoId: convidadoId
      }
    })
    // Item adicionado o identificador com sucesso.
    res.status(200).json(presenteAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar vincular o presente ao convidado." })
  }
})

export default router;