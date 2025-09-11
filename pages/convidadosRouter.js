import { prisma } from './utilits.js'
import express from "express";

const router = express.Router();

// Rota para criar convidados.
router.post("/", async (req, res) => {
  try {
    const { nome, email, } = req.body

    const novoConvidado = await prisma.convidado.create({
      data: {
        nome,
        email
      }
    })
    res.status(201).json(novoConvidado);

  } catch (error) {
    console.error("Erro ao tentar criar o convidado.", error);
    res.status(501).json({ error: "Erro interno." })
  }
})

// Rota para deletar o convidado.
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const convidadoDeletado = await prisma.convidado.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json(convidadoDeletado);

  } catch (error) {
    console.error("Erro ao tentar deletar o convidado.", error)
    res.status(500).json({ error: "Erro interno" })
  }
})

export default router;