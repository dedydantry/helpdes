-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2018 at 01:23 PM
-- Server version: 5.5.36
-- PHP Version: 5.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `helpdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `alat`
--

CREATE TABLE IF NOT EXISTS `alat` (
  `id_alat` int(11) NOT NULL AUTO_INCREMENT,
  `code_alat` varchar(250) NOT NULL,
  `nama_alat` varchar(250) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_alat`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `alat`
--

INSERT INTO `alat` (`id_alat`, `code_alat`, `nama_alat`, `deskripsi`, `created_at`) VALUES
(1, 'PC-01', 'PC Dekstop SER', 'Devisi Akuntansi HRD', '2018-04-04 07:37:16'),
(2, 'PC-02', 'PC-Devi', 'Devisi admin gudang', '2018-04-04 07:41:18'),
(3, 'PC-03', 'PC Kevin', 'Devisi Gudang', '2018-04-04 07:42:53'),
(4, 'PC-04', 'PC Andri', 'Devisi Gudang', '2018-04-04 07:43:32'),
(5, 'PC-05', 'PC Dedy Sirait', 'Devisi IT', '2018-04-04 07:44:32');

-- --------------------------------------------------------

--
-- Table structure for table `assigment`
--

CREATE TABLE IF NOT EXISTS `assigment` (
  `id_assigment` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id_assigment`),
  KEY `ticket_id` (`ticket_id`,`user_id`),
  KEY `ticket_id_2` (`ticket_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `assigment`
--

INSERT INTO `assigment` (`id_assigment`, `ticket_id`, `user_id`) VALUES
(3, 2, 1),
(4, 2, 3),
(5, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id_role`, `role_name`, `display_name`) VALUES
(1, 'administrator', 'Administrator'),
(2, 'operator', 'Operator'),
(3, 'member', 'Member');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `id_ticket` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_code` varchar(250) NOT NULL,
  `owner` int(11) NOT NULL,
  `assignment` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `priority` int(11) NOT NULL,
  `due_on` date NOT NULL,
  `lampiran` varchar(250) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `crated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ticket`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id_ticket`, `ticket_code`, `owner`, `assignment`, `title`, `description`, `priority`, `due_on`, `lampiran`, `status`, `crated_at`) VALUES
(2, '1524488316656', 1, 4, 'Mengenal Skincare Halal, Apa Saja Sih Kriterianya?', 'Example', 1, '2018-04-27', 'TANAKA BIO WHITE ADVANCED WHITENING CLEANSER.png', 0, '2018-04-23 12:58:36'),
(3, '1524492007817', 4, 4, 'This is my first ticket', 'Example ticket', 1, '2018-04-17', 'TANAKA BIO WHITE ADVANCED WHITENING NIGHT CREAM.png', 2, '2018-04-25 14:00:07'),
(4, '1525700470020', 1, 1, 'example texts', 'Hello mother fuckers', 2, '2018-05-08', 'IMG-20170612-WA0004.jpg', 0, '2018-05-07 13:41:10'),
(5, '1525700853796', 1, 1, 'hello Monther funcker', 'lorem ipsum', 2, '2018-05-10', '', 0, '2018-05-07 13:47:33'),
(6, '1525702668127', 1, 4, 'Hello Man', 'Hello helo there', 1, '2018-05-15', 'IMG-20170614-WA0000.jpg', 0, '2018-05-07 14:17:48');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comment`
--

CREATE TABLE IF NOT EXISTS `ticket_comment` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comment`),
  KEY `author` (`author`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `ticket_comment`
--

INSERT INTO `ticket_comment` (`id_comment`, `ticket_id`, `author`, `comment`, `created`) VALUES
(1, 3, 4, 'Hello there gt', '2018-04-23 14:56:27'),
(2, 3, 1, 'Oke oce deh', '2018-04-23 15:00:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `jabatan` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `name`, `email`, `password`, `status`, `jabatan`, `created_at`) VALUES
(1, 'dedy dantry', 'dedydantry@gmail.com', 'sha1$1d793595$1$562818020c06d8e455358037b51973d532db20cd', 1, '', '2018-03-30 05:10:21'),
(4, 'Jhon Doe', 'jhondoe@email.com', 'sha1$04cdd995$1$041fe91604ca6dc37a377a726eee536d8ae285c6', 1, 'Admin', '2018-04-23 13:36:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 2),
(3, 4, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
