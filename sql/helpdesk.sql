-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2018 at 05:44 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `notif`
--

CREATE TABLE `notif` (
  `id_notif` int(11) NOT NULL,
  `ticket_code` varchar(20) NOT NULL,
  `notif_from` int(11) NOT NULL,
  `notif_too` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `notif_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notif`
--

INSERT INTO `notif` (`id_notif`, `ticket_code`, `notif_from`, `notif_too`, `type`, `notif_read`, `created_at`) VALUES
(12, '1530455730687', 6, 1, 1, 0, '2018-07-01 14:35:30'),
(13, '1530455829254', 6, 1, 1, 0, '2018-07-01 14:37:09'),
(14, '1530457440868', 6, 1, 1, 0, '2018-07-01 15:04:00');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id_rating` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id_role` int(11) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL,
  `ticket_code` varchar(250) NOT NULL,
  `owner` int(11) NOT NULL,
  `assignment` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `priority` int(11) NOT NULL,
  `due_on` date NOT NULL,
  `lampiran` varchar(250) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `crated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id_ticket`, `ticket_code`, `owner`, `assignment`, `title`, `description`, `priority`, `due_on`, `lampiran`, `status`, `crated_at`) VALUES
(16, '1530455730687', 6, 1, 'Product example', 'kakaka', 1, '2018-07-21', '', 0, '2018-07-01 14:35:30'),
(17, '1530455829254', 6, 1, 'Lorem ipsum', 'Lorem', 3, '0000-00-00', '', 0, '2018-07-01 14:37:09'),
(18, '1530457440868', 6, 1, 'Loremp bro', 'Hello', 1, '2018-07-11', '', 0, '2018-07-01 15:04:00');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_comment`
--

CREATE TABLE `ticket_comment` (
  `id_comment` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `jabatan` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `name`, `email`, `password`, `status`, `jabatan`, `created_at`) VALUES
(1, 'dedy dantry', 'dedydantry@gmail.com', 'sha1$1628b3e3$1$56efd1f5e24e9fd6db0f4236d5dc03b950d1572d', 1, '', '2018-03-30 05:10:21'),
(4, 'Jhon Doe', 'jhondoe@email.com', 'sha1$04cdd995$1$041fe91604ca6dc37a377a726eee536d8ae285c6', 1, 'Admin', '2018-04-23 13:36:54'),
(5, 'Admin', 'admin@email.com', 'sha1$28448d25$1$3ac0fa8f449cfa0d09fb6424653b1da826544b9f', 1, 'Admin', '2018-05-12 10:19:29'),
(6, 'Member', 'member@email.com', 'sha1$855a9727$1$f1036a87cf31cd8abad18652d76db27c21243561', 1, 'Member', '2018-05-12 10:20:50'),
(7, 'Agus Wijiyanto', 'Aguswijiyanto@email.com', 'sha1$daa56763$1$54536da1075d90e2cb73430d35826477a4af8e28', 1, 'Staff IT', '2018-05-29 12:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 2),
(3, 4, 2),
(4, 5, 1),
(5, 6, 3),
(6, 7, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notif`
--
ALTER TABLE `notif`
  ADD PRIMARY KEY (`id_notif`),
  ADD KEY `ticket_id` (`ticket_code`),
  ADD KEY `notif_from` (`notif_from`),
  ADD KEY `notif_too` (`notif_too`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id_rating`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id_role`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id_ticket`),
  ADD KEY `ticket_code` (`ticket_code`);

--
-- Indexes for table `ticket_comment`
--
ALTER TABLE `ticket_comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `author` (`author`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notif`
--
ALTER TABLE `notif`
  MODIFY `id_notif` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id_rating` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id_ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `ticket_comment`
--
ALTER TABLE `ticket_comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `notif`
--
ALTER TABLE `notif`
  ADD CONSTRAINT `notif_ibfk_1` FOREIGN KEY (`ticket_code`) REFERENCES `ticket` (`ticket_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id_ticket`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket_comment`
--
ALTER TABLE `ticket_comment`
  ADD CONSTRAINT `ticket_comment_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id_ticket`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_comment_ibfk_2` FOREIGN KEY (`author`) REFERENCES `users` (`id_users`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
