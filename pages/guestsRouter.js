import { prisma } from './utilits.js'
import { v4 as uuidv4 } from 'uuid'

import express from "express";
const router = express.Router();

// ROTAS PARA GERENCIAR A CRIAÇÃO, DELEÇÃO, LISTAR 

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
    const { nome, email, mensagem, telefone, presenteId } = req.body;
    const tokenGerado = uuidv4()

    // 1. Verificamos se o presente já está ocupado antes de qualquer coisa.
    const presenteExistente = await prisma.tabelaDePresentes.findUnique({
      where: {
        id: presenteId
      },
    });

    if (presenteExistente && presenteExistente.convidadoId !== null) {
      // Se o presente existe e já tem um convidado, retornamos.
      return res.status(400).json({ error: "Este presente já foi escolhido." });
    }

    // 2. Se o presente estiver disponível, criamos o convidado.
    const novoConvidado = await prisma.convidado.create({
      data: {
        nome,
        email,
        mensagem,
        telefone,
        token: tokenGerado,
        usado: true,
      },
    });

    // 3. E só então atualizamos o presente, agora com o ID do novo convidado.
    const presenteAtualizado = await prisma.tabelaDePresentes.update({
      where: {
        id: presenteId // Usamos apenas o ID do presente, que é único.
      },
      data: {
        convidadoId: novoConvidado.id // Passamos o ID do convidado para vincular o presente.
      },
    });
    res.status(201).json({ convidado: novoConvidado, presenteAtualizado: presenteAtualizado })
  } catch (error) {
    console.error("Erro ao tentar criar o convidado e escolher o presente.", error);
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