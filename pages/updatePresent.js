import {
  prisma,
  router
} from "./utilits.js"


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
    console.error(`Error ao tentar acessar o presente ${error}.`)
    res.status(500).json({ error: "Erro interno." })
  }
})

export default router;