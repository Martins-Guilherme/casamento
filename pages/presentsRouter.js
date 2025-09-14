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

// DESMARCAR. convidadoid = null
router.put("/unselect/:id", autenticarAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Encontra o presente e verifica se ele está associado a um convidado
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id: parseInt(id) },
      select: { convidadoId: true }
    });

    // Se o presente não estiver vinculado a nenhum convidado.
    if (!presente || presente.convidadoId === null) {
      return res.status(204).json({ error: "Este presente não foi escolhido por nenhum convidado." });
    }

    // Desvincula o presente do convidado
    const presenteAtualizado = await prisma.tabelaDePresentes.update({
      where: { id: parseInt(id) },
      data: { convidadoId: null }
    });

    // Marca o token do convidado como não usado novamente
    await prisma.convidado.update({
      where: { id: presente.convidadoId },
      data: { usado: false }
    });

    res.status(200).json(presenteAtualizado);

  } catch (error) {
    console.error(`Erro ao tentar desmarcar o presente ${error}`)
    res.status(501).json({ error: "Erro interno." })
  }
})

// Rota para dar o retorno se o presente foi selecionado pelo convidado.
router.get("/selected/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Encontra o presente e verifica se ele está associado a um convidado
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id: parseInt(id) },
      select: { convidadoId: true }
    });

    // Se o presente não estiver vinculado a nenhum convidado.
    if (!presente || presente.convidadoId === null) {
      return res.status(200).json({ selected: false });
    }

    res.status(200).json({ selected: true });
  } catch (error) {
    console.error(`Erro ao tentar verificar se o presente foi selecionado ${error}`)
    res.status(501).json({ error: "Erro interno." })
  }
})


export default router;