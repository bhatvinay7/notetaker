-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "refreshToken" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteSession" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topic" VARCHAR(255),
    "userId" UUID,
    "deleated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NoteSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "summary" TEXT NOT NULL,
    "sessionId" UUID,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "note_user_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "note_session_id_idx" ON "NoteSession"("id");

-- CreateIndex
CREATE INDEX "note_session_topic_idx" ON "NoteSession"("topic");

-- CreateIndex
CREATE INDEX "note_title_id_idx" ON "Note"("title");

-- CreateIndex
CREATE INDEX "note_id_idx" ON "Note"("id");

-- AddForeignKey
ALTER TABLE "NoteSession" ADD CONSTRAINT "NoteSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "NoteSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
