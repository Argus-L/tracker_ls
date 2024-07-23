/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `LanguageTag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appStatus` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobPostDate` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobURL` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `appStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobPostDate` DATETIME(3) NOT NULL,
    ADD COLUMN `jobType` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobURL` VARCHAR(191) NOT NULL,
    MODIFY `salary` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `LanguageTag_name_key` ON `LanguageTag`(`name`);
