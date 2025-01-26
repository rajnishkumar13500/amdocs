-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `education` VARCHAR(191) NOT NULL DEFAULT '',
    `goals` VARCHAR(191) NOT NULL DEFAULT '',
    `learningStyle` VARCHAR(191) NOT NULL DEFAULT '',
    `timeAvailable` INTEGER NOT NULL DEFAULT 0,
    `learningPace` INTEGER NOT NULL DEFAULT 0,
    `WeeklyHours` INTEGER NOT NULL DEFAULT 0,
    `platformVisited` INTEGER NOT NULL DEFAULT 0,
    `python` INTEGER NOT NULL DEFAULT 0,
    `Statistics` INTEGER NOT NULL DEFAULT 0,
    `MachineLearning` INTEGER NOT NULL DEFAULT 0,
    `HTML_CSS` INTEGER NOT NULL DEFAULT 0,
    `JavaScript` INTEGER NOT NULL DEFAULT 0,
    `React` INTEGER NOT NULL DEFAULT 0,
    `SocialMedia` INTEGER NOT NULL DEFAULT 0,
    `SEO` INTEGER NOT NULL DEFAULT 0,
    `Analytics` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `Link` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `Duration` VARCHAR(191) NOT NULL,
    `Instructor` VARCHAR(191) NOT NULL,
    `Cost` INTEGER NOT NULL DEFAULT 0,
    `LearningRequirements` VARCHAR(191) NOT NULL DEFAULT '',
    `Prerequisites` VARCHAR(191) NOT NULL DEFAULT '',
    `CourseStructure` VARCHAR(191) NOT NULL DEFAULT '',
    `price` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `progress` INTEGER NOT NULL DEFAULT 0,
    `enrolledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserCourse_userId_courseId_key`(`userId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
