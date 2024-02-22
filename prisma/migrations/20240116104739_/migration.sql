/*
  Warnings:

  - Added the required column `company` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `company` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `salary` INTEGER NOT NULL,
    ADD COLUMN `skills` VARCHAR(191) NOT NULL;
