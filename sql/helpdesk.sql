-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2018 at 11:58 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `alat`
--

INSERT INTO `alat` (`id_alat`, `code_alat`, `nama_alat`, `deskripsi`, `created_at`) VALUES
(1, 'PC-01', 'PC Dekstop Rany', 'Devisi Akuntansi HRD', '2018-04-04 07:37:16'),
(2, 'PC-02', 'PC-Devi', 'Devisi admin gudang', '2018-04-04 07:41:18'),
(3, 'PC-03', 'PC Kevin', 'Devisi Gudang', '2018-04-04 07:42:53'),
(4, 'PC-04', 'PC Andri', 'Devisi Gudang', '2018-04-04 07:43:32'),
(5, 'PC-05', 'PC Dedy', 'Devisi IT', '2018-04-04 07:44:32');

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
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `name`, `email`, `password`, `status`, `created_at`) VALUES
(1, 'dedy dantry', 'dedydantry@gmail.com', 'sha1$1d793595$1$562818020c06d8e455358037b51973d532db20cd', 1, '2018-03-30 05:10:21');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1);

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
