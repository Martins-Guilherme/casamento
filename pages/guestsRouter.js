import { prisma } from './utilits.js'
import { v4 as uuidv4 } from 'uuid'

import express from "express";
const router = express.Router();

// ROTAS PARA GERENCIAR A CRIAÇÃO, DELEÇÃO, APRESENTAÇÃO E ATUALIZAÇÃO DE CONVIDADOS

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

// Rota para CRIAR convidados.
router.post("/create", async (req, res) => {
  try {
    const { nome, email, mensagem, telefone } = req.body
    const tokenGerado = uuidv4()

    const novoConvidado = await prisma.convidado.create({
      data: {
        nome,
        email,
        mensagem,
        telefone,
        token: tokenGerado,
        usado: false
      }
    })
    res.status(201).json(novoConvidado);

  } catch (error) {
    console.error("Erro ao tentar criar o convidado.", error);
    res.status(501).json({ error: "Erro interno." })
  }
})

// Rota para DELETAR o convidado.
router.delete("/:id", autenticarAdmin, async (req, res) => {
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

// Rota para LISTAR todos os convidados
router.get("/", autenticarAdmin, async (req, res) => {
  try {
    const convidados = await prisma.convidado.findMany();

    res.status(200).json(convidados);
  } catch (error) {
    console.error("Erro ao listar convidados = ", error);
    res.status(500).json({ error: "Erro interno." })
  }
})

export default router;