-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME
);
INSERT INTO "new_Assignor" ("deleted_at", "document", "email", "id", "name", "phone") SELECT "deleted_at", "document", "email", "id", "name", "phone" FROM "Assignor";
DROP TABLE "Assignor";
ALTER TABLE "new_Assignor" RENAME TO "Assignor";
CREATE UNIQUE INDEX "Assignor_document_key" ON "Assignor"("document");
CREATE UNIQUE INDEX "Assignor_email_key" ON "Assignor"("email");
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignor_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "Payable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignor_id", "deleted_at", "emission_date", "id", "value") SELECT "assignor_id", "deleted_at", "emission_date", "id", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
