-- CreateTable
CREATE TABLE "Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignor_id" TEXT NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "Payable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
