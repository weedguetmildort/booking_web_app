-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: albertslist
-- ------------------------------------------------------
-- Server version	8.4.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `albertslist`
--

/*!40000 DROP DATABASE IF EXISTS `albertslist`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `albertslist` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `albertslist`;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `bID` bigint NOT NULL AUTO_INCREMENT,
  `sID` bigint NOT NULL,
  `pID` bigint NOT NULL,
  `uID` bigint NOT NULL,
  `StartTime` varchar(26) NOT NULL,
  `status` varchar(100) NOT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`bID`),
  KEY `Bookings_users_FK` (`uID`),
  KEY `Bookings_partners_FK` (`pID`),
  KEY `Bookings_services_FK` (`sID`),
  CONSTRAINT `Bookings_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`),
  CONSTRAINT `Bookings_users_FK` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (4,2,2,30,'2024-08-05 18:00:00','approved',NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoursofoperation`
--

DROP TABLE IF EXISTS `hoursofoperation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoursofoperation` (
  `pID` bigint NOT NULL,
  `day` int NOT NULL,
  `open` bigint DEFAULT NULL,
  `close` bigint DEFAULT NULL,
  KEY `HoursOfOperation_partners_FK` (`pID`),
  CONSTRAINT `HoursOfOperation_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoursofoperation`
--

LOCK TABLES `hoursofoperation` WRITE;
/*!40000 ALTER TABLE `hoursofoperation` DISABLE KEYS */;
INSERT INTO `hoursofoperation` VALUES (2,1,540,1110),(2,2,540,1110),(2,3,540,1110),(2,4,540,1110),(2,5,540,1110),(1,1,540,1110),(1,2,540,1110),(1,3,540,1110),(1,4,540,1110),(1,5,540,1110),(3,1,540,1110),(3,2,540,1110),(3,3,540,1110),(3,4,540,1110),(3,5,540,1110),(4,1,540,1110),(4,2,540,1110),(4,3,540,1110),(4,4,540,1110),(4,5,540,1110),(5,1,540,1110),(5,2,540,1110),(5,3,540,1110),(5,4,540,1110),(5,5,540,1110);
/*!40000 ALTER TABLE `hoursofoperation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ispartner`
--

DROP TABLE IF EXISTS `ispartner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ispartner` (
  `uID` bigint NOT NULL,
  `pID` bigint NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`uID`),
  KEY `isPartner_partners_FK` (`pID`),
  CONSTRAINT `isPartner_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`),
  CONSTRAINT `isPartner_users_FK` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ispartner`
--

LOCK TABLES `ispartner` WRITE;
/*!40000 ALTER TABLE `ispartner` DISABLE KEYS */;
INSERT INTO `ispartner` VALUES (2,1,0),(3,1,1),(14,2,1),(33,4,1),(35,5,1),(45,10,1),(46,11,1),(47,14,1),(48,13,1),(49,12,1);
/*!40000 ALTER TABLE `ispartner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `pID` bigint NOT NULL AUTO_INCREMENT,
  `BusinessName` varchar(100) NOT NULL,
  `Category` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `State` char(2) NOT NULL,
  `ZIP` varchar(10) NOT NULL,
  `AboutUs` text,
  `City` varchar(100) NOT NULL,
  PRIMARY KEY (`pID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'Tech Shop','Computer','support@tech.com','555 Main St.','FL','32601','We are a company that specializes in repairing computers and stuff like that.','Gainesville'),(2,'HNM Construction','Contractor','support@HNM.com','123 1st St','FL','34275','Come get your construction needs taken care of at HNM!!!','Nokomis'),(3,'CoTest','None','test@test.com','123 Add St','GA','32605','This one is a test. It\'s a really good test, but still a test nonetheless. I don\'t like to bragg, but my tests are some of the best tests, no really, they are. Better than any other test out there.','Atlanta'),(4,'Plumbers, Inc.','Plumbing','jj@plumbing.com','860 Peachtree St NE','GA','30308','We are','Atlanta'),(5,'The Electrics','Electric','bdoe@gmail.com','555 Main St','FL','32601','Electric','Gaineville'),(6,'1 Inc','Plumbing','1BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(7,'2 Inc','Hair Salon','2BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(8,'3 Inc','Nail Salon','3BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(9,'4 Inc','Electric','4BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(10,'5 Inc','AC','5BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(11,'6 Inc','Contractor','6BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(12,'7 Inc','Plumbing','7BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(13,'8 Inc','Plumbing','8BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(14,'9 Inc','Plumbing','9BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(15,'10 Inc','Plumbing','10BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(16,'11 Inc','Plumbing','11BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(17,'12 Inc','Plumbing','12BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(18,'13 Inc','Plumbing','13BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville'),(19,'14 Inc','Plumbing','14BB@B.com','001 Main St','FL','32609','We are a business and we like customers.','Gainesville');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `uID` bigint NOT NULL,
  `pID` bigint NOT NULL,
  `ReviewText` text,
  `Score` int NOT NULL,
  `ResponseText` text,
  `AddedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ResponseDate` datetime DEFAULT NULL,
  `rID` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rID`),
  KEY `Reviews_users_FK` (`uID`),
  KEY `Reviews_partners_FK` (`pID`),
  CONSTRAINT `Reviews_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`),
  CONSTRAINT `Reviews_users_FK` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'Blah Blah',4,NULL,'2024-07-28 18:20:28',NULL,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `sID` bigint NOT NULL AUTO_INCREMENT,
  `pID` bigint NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Duration` int NOT NULL,
  `Cost` decimal(10,2) NOT NULL,
  `Description` text,
  PRIMARY KEY (`sID`),
  KEY `Services_partners_FK` (`pID`),
  CONSTRAINT `Services_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,1,'Computer',60,150.00,'Computer Repair Services'),(2,2,'Construction',60,250.00,'General Construction'),(3,1,'Phone',30,150.00,'Phone Repair');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uID` bigint NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ZIP` varchar(10) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`uID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Reg','Ruser','reg.Ruser@albertslist.com','11111','password'),(2,'Par','Puser','Par.Puser@tech.com','22222','i;juebvihyetbvibetrkhvbekhvtbekjht'),(3,'Adm','Auser','Adm.Auser@tech.com','33333','password'),(14,'test','tester','test@test.com','11111','password'),(30,'Imma','Tester','imma.tester@gmail.com','32601','U2FsdGVkX1/jy5m3b9VhPNZL+BKTR7l9PWGty+VfwDE='),(31,'Wendy','Smith','wendy.smith@gmail.com','34275','U2FsdGVkX18RNQItu/TgHOccuQaaxak/3W/eUbANwSU='),(32,'Burry','Smoth','bs@gmail.com','32605','U2FsdGVkX18hetvcaWt+QXWvuMVxmaKOzOXWzw4Mg9A='),(33,'John','Jacob','jj@plumbing.com','30308','U2FsdGVkX1+PHENQRmK2q9XZ5AA4srHsyL0E+b9uTko='),(34,'Jerry','West','jwest@gmail.com','32605','U2FsdGVkX1/yYWGi2t7LOWxj0TBKUWd/VmntLVrjUnw='),(35,'Bob','Doe','bdoe@gmail.com','32601','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(36,'Karen','Smith','ksmith@gmail.com','32606','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(37,'Aohn','Aohnson','AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(38,'Bohn','Aohnson','2AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(39,'Cohn','Aohnson','3AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(40,'Dohn','Aohnson','4AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(41,'Eohn','Aohnson','5AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(42,'Fohn','Aohnson','6AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(43,'Gohn','Aohnson','7AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(44,'Hohn','Aohnson','8AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(45,'Iohn','Aohnson','9AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(46,'John','Aohnson','10AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(47,'Kohn','Aohnson','11AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(48,'Lohn','Aohnson','12AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(49,'Mohn','Aohnson','13AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(50,'Nohn','Aohnson','14AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(51,'Oohn','Aohnson','15AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(52,'Pohn','Aohnson','16AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(53,'Qohn','Aohnson','17AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(54,'Rohn','Aohnson','18AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4='),(55,'Sohn','Aohnson','19AA@A.com','32609','U2FsdGVkX1+nFblTf1xofKlZG2IQgN79PfjYlEPUBX4=');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'albertslist'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 23:22:53
