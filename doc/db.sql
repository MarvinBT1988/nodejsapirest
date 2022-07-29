DROP DATABASE IF EXISTS `postsdb`;
CREATE DATABASE IF NOT EXISTS `postsdb`;
USE `postsdb`;

-- Crear la tabla de users
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`apellido` VARCHAR(50) NOT NULL,
	`correo` VARCHAR(100) NOT NULL,
	`password` CHAR(32) NOT NULL,
	`codeReseteo` VARCHAR(40),
	PRIMARY KEY (`id`),
	UNIQUE INDEX `correo` (`correo`)
) ENGINE=InnoDB;

-- Crear la tabla de posts
CREATE TABLE IF NOT EXISTS `posts` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
	`titulo` VARCHAR(50) NOT NULL,
	`descripcion` VARCHAR(500) NOT NULL,
	`fecha` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;
