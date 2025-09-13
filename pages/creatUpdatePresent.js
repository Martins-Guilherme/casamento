import { prisma } from "./utilits.js";
import express from "express";

const router = express.Router();


// CRIAÇÃO DO PRESENTE
router.post("/creat", async (req, res) => {
  try {
    // pegar os dados enviados pelo meu gerente e a dignissima dele, só dele.
    const { nome, descricao, imagem } = req.body;

    const novoPresente = await prisma.tabelaDePresentes.create({
      data: {
        nome,
        descricao,
        imagem,
      }
    })

    res.status(201).json(novoPresente);  // Item criado com sucesso.

  } catch (error) {
    console.error(`Erro ao tentar criar o presente ${error}.`)
    res.status(501).json({ error: "Erro interno." })
  }
});

export default router;