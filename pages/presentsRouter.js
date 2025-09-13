import { prisma } from "./utilits.js";
import express from "express";

const router = express.Router();

// ROTAS PARA GERENCIAR A DELEÇÃO E APRESENTAÇÃO


// MIDDLEWARE DE AUTENTICAÇÃO
const autenticarAdmin = (req, res, next) => {
  const adminToken = req.query.token;
  const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN;
  if (adminToken && adminToken === ADMIN_TOKEN_SECRET) {
    next()
  } else {
    res.status(403).json({ error: "Acesso negado. Token de administrador inválido." })
  }
}

// DELEÇÃO DO PRESENTE
router.delete("/:id", autenticarAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const presentDeletado = await prisma.tabelaDePresentes.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json(presentDeletado)
  } catch (error) {
    console.error(`Erro ao tentar deletar o presente. ${error}`)
    res.status(500).json({ error: "Erro interno." })
  }
})


// LISTAR PRESENTES
router.get("/listar", autenticarAdmin, async (req, res) => {
  try {
    const presentes = await prisma.tabelaDePresentes.findMany()
    res.status(200).json(presentes)
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar listar os convidados" })
  }
})



export default router;