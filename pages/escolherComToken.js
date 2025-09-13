import { prisma } from "./utilits.js";


import express from "express";
const router = express.Router();

router.put("/", async (req, res) => {
  try {
    const { presentId, token } = req.body;
    // 1. Encontra o convidado pelo token e verifica se ele ainda não foi usado
    const convidado = await prisma.convidado.findFirst({
      where: {
        AND: [
          { token: token },
          { usado: false }
        ]
      }
    });
    // 2. Se o convidado não for encontrado (token inválido ou já usado), retorna erro
    if (!convidado) {
      return res.status(403).json({ error: "Token inválido ou já utilizado." });
    }
    // 3. Atualiza o presente com o ID do convidado
    const presenteAtualizado = await prisma.tabelaDePresentes.update({
      where: {
        id: presentId,
      },
      data: {
        convidadoId: convidado.id
      }
    });

    // 4. Marca o token do convidado como usado no banco de dados
    await prisma.convidado.update({
      where: { id: convidado.id },
      data: { usado: true }
    });

    res.status(200).json(presenteAtualizado);

  } catch (error) {
    console.error(`Erro ao tentar escolher o presente: ${error}.`);
    res.status(500).json({ error: "Erro interno." });
  }
});

export default router;