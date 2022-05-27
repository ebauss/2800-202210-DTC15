-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (arm64)
--
-- Host: localhost    Database: sustainably
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipts` (
  `receipt_id` int unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int unsigned DEFAULT NULL,
  `notes` varchar(50) DEFAULT NULL,
  `picture` varchar(500) NOT NULL,
  `owner_id` int unsigned NOT NULL,
  `reward_points` int unsigned DEFAULT NULL,
  `verified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`receipt_id`),
  KEY `admin_id` (`admin_id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipts`
--

LOCK TABLES `receipts` WRITE;
/*!40000 ALTER TABLE `receipts` DISABLE KEYS */;
INSERT INTO `receipts` VALUES (1,NULL,NULL,'https://picsum.photos/id/237/200',2,60000,'2022-05-25 00:00:00'),(2,1,'Good to go, whoo','https://picsum.photos/id/237/200',2,419000,'1991-06-23 00:00:00');
/*!40000 ALTER TABLE `receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rewards` (
  `reward_id` int unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `photo` varchar(512) NOT NULL,
  `value` int unsigned NOT NULL,
  `points_cost` int unsigned NOT NULL,
  PRIMARY KEY (`reward_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (1,'Bestbuy','Expert service. Unbeatable price.','https://iabcanada.com/content/uploads/2016/12/Best_Buy_Logo-1024x768.png',100,10000),(2,'Apple','Think Different','https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',1000,100000),(3,'Bed Bath and Beyond','Home, Happier.','https://1000logos.net/wp-content/uploads/2017/08/Font-Bed-Bath-and-Beyond-Logo.jpg',100,10000),(4,'Tesla','One step to sustainable energy','https://cdn.mos.cms.futurecdn.net/BQwukuZwwwXrg27B9Le2Q6.png',10000,1000000),(5,'Nike','Just Do It','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/800px-Logo_NIKE.svg.png',50,5000),(6,'Adidas','Adidas is all in','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Adidas_isologo.svg/1200px-Adidas_isologo.svg.png',50,5000),(7,'Lululemon','Yoga clothes & running gear for sweaty workouts','https://www.pngitem.com/pimgs/m/233-2338934_lululemon-logo-lululemon-logo-high-res-hd-png.png',25,2500),(8,'BCIT','The best post-secondary in Canada','https://seeklogo.com/images/B/british-columbia-institute-of-technology-bcit-logo-56A5FAA0B2-seeklogo.com.png',3500,350000);
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `country` varchar(32) NOT NULL,
  `age` int unsigned NOT NULL,
  `profile_icon` varchar(512) DEFAULT NULL,
  `reward_points` int unsigned NOT NULL,
  `monthly_total_points` int unsigned NOT NULL,
  `monthly_goal_points` int unsigned NOT NULL,
  `compass_id` varchar(20) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `last_login` varchar(6) DEFAULT NULL,
  `quiz_highscore` int unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'$2b$10$rI.X57jCaUYLI65clEfGpOI6nvmAk/0v2uQaMPxVuQuiXBaGhy2pu','AC-130','Spectre','deathfromabove@freedom.co','USA',40,NULL,0,0,0,NULL,1,NULL,NULL),(2,'$2b$10$Z4BTn.vf3YbYSBDo7f2ZDehY6F9x51ynCAME6DseROYDbBF9bmF1y','Tsubasa','Kazanari','tsubasa@zweiwing.co','Japan',19,NULL,6900,1500,1000,'12345678901234567890',0,NULL,NULL),(3,'$2b$10$QQXmHllOPTKrHpT1XdRvVu.GCZHB2FWB4CR8WtweBfgPowe21fCHW','Evon','Bausa','evon.bausa@gmail.com','Canada',28,NULL,0,0,0,NULL,1,NULL,NULL),(4,'$2b$10$3po6wUytRACj0Amdbbl0pufhgT//TNm30C1CAHkCUpD4rOmkewE1G','Josh','Hart','josh.hart@gmail.com','USA',35,NULL,2000,300,10000,'09876543210987654321',0,NULL,NULL),(5,'$2b$10$hPuuFQta9pvjxWik7XadbOynR2YqxSIkzEcew0nEh6K2DzXCnRngK','Alexie','Narciso','alexie.narciso@admin.me','Canada',68,NULL,0,0,0,NULL,1,NULL,NULL),(6,'$2b$10$NQwvS99JoJbeQHBC/jRqaOtRlh12l6mk8V6wsAl8f/5BbUqDRqFKS','Mary','Jane','mj@user.me','Mexico',22,NULL,3300,3300,10000,'09123456789087654321',0,NULL,NULL),(7,'$2b$10$phPsLbpSP5NI4ltxWqEqsuAQShFsSmeDgFpW7jt6BUeNw5RkypAfq','Joshua','Dela Cruz','Joushua@0123@gmail.com','Greece',10,NULL,0,0,0,NULL,1,NULL,NULL),(8,'$2b$10$p1moPpIt1WGkhrFowMFOsODhG0qkBAHtJj9bN8ApFT5ytjTvDByG6','Jake','Jimenez','JJimenez@gmail.com','UK',20,NULL,200,200,10000,'43214321432143214321',0,NULL,NULL),(9,'$2b$10$j8cuXkJ9w3SAVSeGA1sZGeHgA6.jVWKbtdqFmx13MxXtUS0Nmd90a','Chris','Yukine','yukine@song.jp','Japan',18,NULL,0,0,0,NULL,1,'197001',0),(10,'$2b$10$j8cuXkJ9w3SAVSeGA1sZGeHgA6.jVWKbtdqFmx13MxXtUS0Nmd90a','John','MacTavish','soap@sas.uk','UK',30,NULL,20000,1500,3000,NULL,0,'202205',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_rewards`
--

DROP TABLE IF EXISTS `users_rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_rewards` (
  `user_id` int unsigned NOT NULL,
  `reward_id` int unsigned NOT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_rewards`
--

LOCK TABLES `users_rewards` WRITE;
/*!40000 ALTER TABLE `users_rewards` DISABLE KEYS */;
INSERT INTO `users_rewards` VALUES (2,1,'2022-02-28 00:00:00','2024-12-25 00:00:00'),(4,3,'2022-03-01 00:00:00','2024-12-26 00:00:00');
/*!40000 ALTER TABLE `users_rewards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 18:34:30
