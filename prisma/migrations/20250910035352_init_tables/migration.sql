-- CreateTable
CREATE TABLE "public"."Convidado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "mensagem" TEXT,

    CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TabelaDePresentes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "descricao" TEXT,
    "convidadoId" INTEGER,

    CONSTRAINT "TabelaDePresentes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_email_key" ON "public"."Convidado"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TabelaDePresentes_convidadoId_key" ON "public"."TabelaDePresentes"("convidadoId");

-- AddForeignKey
ALTER TABLE "public"."TabelaDePresentes" ADD CONSTRAINT "TabelaDePresentes_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "public"."Convidado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
