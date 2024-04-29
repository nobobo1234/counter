-- CreateTable
CREATE TABLE "AdminMapping" (
    "mappingId" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "AdminMapping_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdminMapping_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
