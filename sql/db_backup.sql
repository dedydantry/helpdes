-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: helpdesk
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alat`
--

DROP TABLE IF EXISTS `alat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alat` (
  `id_alat` int(11) NOT NULL AUTO_INCREMENT,
  `code_alat` varchar(250) NOT NULL,
  `nama_alat` varchar(250) NOT NULL,
  `deskripsi` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_alat`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alat`
--

LOCK TABLES `alat` WRITE;
/*!40000 ALTER TABLE `alat` DISABLE KEYS */;
INSERT INTO `alat` VALUES (1,'PC-01','PC Dekstop SER','Devisi Akuntansi HRD','2018-04-04 07:37:16'),(2,'PC-02','PC-Devi','Devisi admin gudang','2018-04-04 07:41:18'),(3,'PC-03','PC Kevin','Devisi Gudang','2018-04-04 07:42:53'),(4,'PC-04','PC Andri','Devisi Gudang','2018-04-04 07:43:32'),(5,'PC-05','PC Dedy Sirait','Devisi IT','2018-04-04 07:44:32');
/*!40000 ALTER TABLE `alat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigment`
--

DROP TABLE IF EXISTS `assigment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assigment` (
  `id_assigment` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id_assigment`),
  KEY `ticket_id` (`ticket_id`,`user_id`),
  KEY `ticket_id_2` (`ticket_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigment`
--

LOCK TABLES `assigment` WRITE;
/*!40000 ALTER TABLE `assigment` DISABLE KEYS */;
INSERT INTO `assigment` VALUES (3,2,1),(4,2,3),(5,3,1);
/*!40000 ALTER TABLE `assigment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notif`
--

DROP TABLE IF EXISTS `notif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notif` (
  `id_notif` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_code` varchar(20) NOT NULL,
  `notif_from` int(11) NOT NULL,
  `notif_too` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `notif_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_notif`),
  KEY `ticket_id` (`ticket_code`),
  KEY `notif_from` (`notif_from`),
  KEY `notif_too` (`notif_too`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notif`
--

LOCK TABLES `notif` WRITE;
/*!40000 ALTER TABLE `notif` DISABLE KEYS */;
INSERT INTO `notif` VALUES (1,'1527315178393',6,1,3,1,'2018-05-27 11:33:51'),(2,'1526126228969',6,1,3,1,'2018-05-27 16:24:23'),(3,'1526709615416',1,6,2,0,'2018-05-29 12:15:20'),(4,'1526709615416',6,1,3,1,'2018-05-29 12:18:01');
/*!40000 ALTER TABLE `notif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `id_rating` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rating`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (1,1,10,3,'2018-05-27 11:33:51'),(2,1,8,4,'2018-05-27 16:24:23'),(3,1,9,4,'2018-05-29 12:18:00');
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'administrator','Administrator'),(2,'operator','Operator'),(3,'member','Member');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (2,'1524488316656',1,4,'Mengenal Skincare Halal, Apa Saja Sih Kriterianya?','Example',1,'2018-04-27','TANAKA BIO WHITE ADVANCED WHITENING CLEANSER.png',0,'2018-04-23 12:58:36'),(3,'1524492007817',4,4,'This is my first ticket','Example ticket',1,'2018-04-17','TANAKA BIO WHITE ADVANCED WHITENING NIGHT CREAM.png',0,'2018-04-25 14:00:07'),(4,'1525700470020',1,1,'example texts','Hello mother fuckers',2,'2018-05-08','IMG-20170612-WA0004.jpg',0,'2018-05-07 13:41:10'),(5,'1525700853796',1,1,'hello Monther funcker','lorem ipsum',2,'2018-05-10','',2,'2018-05-07 13:47:33'),(6,'1525702668127',1,4,'Hello Man','Hello helo there',1,'2018-05-15','IMG-20170614-WA0000.jpg',0,'2018-05-07 14:17:48'),(8,'1526126228969',6,1,'Masalah Besar','Pokoknya masalah ini Besar',1,'2018-05-14','',1,'2018-05-12 11:57:08'),(9,'1526709615416',6,1,'membuat masalah','saya tidak tau cara membuat masalah',1,'2018-05-21','',1,'2018-05-19 06:00:15'),(10,'1527315178393',6,1,'masalah baru','saya memiliki banyak masalah',1,'0000-00-00','',1,'2018-06-27 06:12:58');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_comment`
--

DROP TABLE IF EXISTS `ticket_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_comment` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comment`),
  KEY `author` (`author`),
  KEY `ticket_id` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_comment`
--

LOCK TABLES `ticket_comment` WRITE;
/*!40000 ALTER TABLE `ticket_comment` DISABLE KEYS */;
INSERT INTO `ticket_comment` VALUES (1,3,4,'Hello there gt','2018-04-23 14:56:27'),(2,3,1,'Oke oce deh','2018-04-23 15:00:56'),(3,9,6,'kapan saya bisa membuat masalah ?\r\n','2018-05-19 06:02:07'),(4,10,6,'kapan masalah ini akan selesai ?','2018-05-26 06:29:25'),(5,10,6,'Komentar','2018-05-29 12:11:15'),(6,9,1,'bagaimana?','2018-06-18 17:26:08'),(7,9,1,'Oke oce','2018-06-18 17:39:54'),(8,10,6,'Oke oce','2018-06-18 17:43:45'),(9,10,1,'mantap jiwa','2018-06-18 17:45:14'),(10,10,6,'Oke oce bosku','2018-06-18 17:49:27'),(11,10,1,'Mantap bro','2018-06-18 17:58:53'),(12,10,6,'Oke oce','2018-06-18 17:59:14'),(13,10,1,'Mantap\r\n','2018-06-18 19:25:58');
/*!40000 ALTER TABLE `ticket_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,2),(3,4,2),(4,5,1),(5,6,3),(6,7,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `jabatan` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dedy dantry','dedydantry@gmail.com','sha1$1628b3e3$1$56efd1f5e24e9fd6db0f4236d5dc03b950d1572d',1,'','2018-03-30 05:10:21'),(4,'Jhon Doe','jhondoe@email.com','sha1$04cdd995$1$041fe91604ca6dc37a377a726eee536d8ae285c6',1,'Admin','2018-04-23 13:36:54'),(5,'Admin','admin@email.com','sha1$28448d25$1$3ac0fa8f449cfa0d09fb6424653b1da826544b9f',1,'Admin','2018-05-12 10:19:29'),(6,'Member','member@email.com','sha1$855a9727$1$f1036a87cf31cd8abad18652d76db27c21243561',1,'Member','2018-05-12 10:20:50'),(7,'Agus Wijiyanto','Aguswijiyanto@email.com','sha1$daa56763$1$54536da1075d90e2cb73430d35826477a4af8e28',1,'Staff IT','2018-05-29 12:52:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-26 22:52:04
