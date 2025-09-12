/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Convidado` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Convidado" ADD COLUMN     "token" TEXT,
ADD COLUMN     "usado" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_token_key" ON "public"."Convidado"("token");
