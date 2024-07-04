-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spread` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `notes` VARCHAR(191) NULL,
    `template` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Spread_userId_template_idx`(`userId`, `template`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spreadId` INTEGER NOT NULL,
    `order` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `card` VARCHAR(191) NULL,
    `reversed` BOOLEAN NOT NULL DEFAULT false,
    `suit` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `path` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `spreadId` INTEGER NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NULL,

    INDEX `Media_spreadId_deleted_idx`(`spreadId`, `deleted`),
    PRIMARY KEY (`path`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardReference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `card` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NULL,
    `keywords` VARCHAR(191) NULL,
    `reversed` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `starred` BOOLEAN NOT NULL DEFAULT false,

    INDEX `CardReference_userId_card_idx`(`userId`, `card`),
    INDEX `CardReference_userId_source_idx`(`userId`, `source`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Spread` ADD CONSTRAINT `Spread_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Position` ADD CONSTRAINT `Position_spreadId_fkey` FOREIGN KEY (`spreadId`) REFERENCES `Spread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_spreadId_fkey` FOREIGN KEY (`spreadId`) REFERENCES `Spread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardReference` ADD CONSTRAINT `CardReference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
