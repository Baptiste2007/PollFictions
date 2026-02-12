-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+deb12u1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 12 fév. 2026 à 13:32
-- Version du serveur : 10.11.14-MariaDB-0+deb12u2
-- Version de PHP : 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Poll Fictions`
--

-- --------------------------------------------------------

--
-- Structure de la table `Oeuvres`
--

CREATE TABLE `Oeuvres` (
  `Id` int(50) NOT NULL,
  `Titre` varchar(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Durée` varchar(50) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Oeuvres`
--

INSERT INTO `Oeuvres` (`Id`, `Titre`, `Type`, `Durée`, `Description`) VALUES
(1, 'Film', '2h05', 'fantasy/dragon', 'Sur l\'île accidentée de Berk, où les Vikings et les dragons sont des ennemis acharnés depuis des générations, Harold, le fils inventif mais maltraité de son père le chef Stoïk La Brute, défie des siècles de pratique traditionnelle de combat contre les dragons lorsqu\'il se lie d\'amitié avec Krokmou, un Furie Nocturne.\r\n\r\nLeur lien improbable révèle la véritable nature des dragons, remettant en question les fondements mêmes de la société viking.');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `Id` int(50) NOT NULL,
  `Login` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`Id`, `Login`, `Password`) VALUES
(1, 'Baptiste', '4444'),
(2, '', ''),
(3, '', ''),
(4, 'sgdgd', 'dfgdgfd');

-- --------------------------------------------------------

--
-- Structure de la table `Votes`
--

CREATE TABLE `Votes` (
  `Id` int(11) NOT NULL,
  `Note` int(11) NOT NULL,
  `Avis` int(11) NOT NULL,
  `IdUsers` int(11) NOT NULL,
  `IdOeuvres` int(11) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Oeuvres`
--
ALTER TABLE `Oeuvres`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `Votes`
--
ALTER TABLE `Votes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdUsers` (`IdUsers`,`IdOeuvres`),
  ADD KEY `IdOeuvres` (`IdOeuvres`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Oeuvres`
--
ALTER TABLE `Oeuvres`
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Votes`
--
ALTER TABLE `Votes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Votes`
--
ALTER TABLE `Votes`
  ADD CONSTRAINT `Votes_ibfk_1` FOREIGN KEY (`IdUsers`) REFERENCES `Users` (`Id`),
  ADD CONSTRAINT `Votes_ibfk_2` FOREIGN KEY (`IdOeuvres`) REFERENCES `Oeuvres` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
