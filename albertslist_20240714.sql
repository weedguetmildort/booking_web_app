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
  `bID` bigint NOT NULL,
  `sID` bigint NOT NULL,
  `pID` bigint NOT NULL,
  `uID` bigint NOT NULL,
  `Start` datetime NOT NULL,
  PRIMARY KEY (`bID`),
  KEY `Bookings_users_FK` (`uID`),
  KEY `Bookings_partners_FK` (`pID`),
  KEY `Bookings_services_FK` (`sID`),
  CONSTRAINT `Bookings_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`),
  CONSTRAINT `Bookings_services_FK` FOREIGN KEY (`sID`) REFERENCES `services` (`sID`),
  CONSTRAINT `Bookings_users_FK` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
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
INSERT INTO `ispartner` VALUES (2,1,0),(3,1,1),(14,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'Tech Shop','Computer','support@tech.com','555 Main St.','FL','32601','We are a company that specializes in repairing computers and stuff like that.','Gainesville'),(2,'HNM Construction','Contractor','support@HNM.com','123 1st St','FL','34275',NULL,'Nokomis');
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
  KEY `Reviews_users_FK` (`uID`),
  KEY `Reviews_partners_FK` (`pID`),
  CONSTRAINT `Reviews_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`),
  CONSTRAINT `Reviews_users_FK` FOREIGN KEY (`uID`) REFERENCES `users` (`uID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `sID` bigint NOT NULL,
  `pID` bigint NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Duration` int NOT NULL,
  `Cost` decimal(10,0) NOT NULL,
  `Description` text,
  PRIMARY KEY (`sID`),
  KEY `Services_partners_FK` (`pID`),
  CONSTRAINT `Services_partners_FK` FOREIGN KEY (`pID`) REFERENCES `partners` (`pID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
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
  `authID` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ZIP` varchar(10) NOT NULL,
  PRIMARY KEY (`uID`),
  UNIQUE KEY `users_authID_IDX` (`authID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'559789877874ebnetkbne','Reg','Ruser','reg.Ruser@albertslist.com','11111'),(2,'35135b1v3e5t1b3e5t1be','Par','Puser','Par.Puser@tech.com','22222'),(3,'531rv35wre1v56wr1e','Adm','Auser','Adm.Auser@tech.com','33333'),(14,'b6tre1b65rt1b56','test','tester','test@test.com','11111');
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

-- Dump completed on 2024-07-14  0:11:26
