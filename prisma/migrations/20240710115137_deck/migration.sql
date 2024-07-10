-- AlterTable
ALTER TABLE `Spread` ADD COLUMN `deckId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Deck` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Spread` ADD CONSTRAINT `Spread_deckId_fkey` FOREIGN KEY (`deckId`) REFERENCES `Deck`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
