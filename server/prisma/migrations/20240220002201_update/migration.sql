-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "emission_date" DATETIME NOT NULL,
    "assignor_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "Payable_assignor_id_fkey" FOREIGN KEY ("assignor_id") REFERENCES "Assignor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payable" ("assignor_id", "created_at", "deleted_at", "emission_date", "id", "updated_at", "value") SELECT "assignor_id", "created_at", "deleted_at", "emission_date", "id", "updated_at", "value" FROM "Payable";
DROP TABLE "Payable";
ALTER TABLE "new_Payable" RENAME TO "Payable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
