-- phpMyAdmin SQL Dump
-- version 5.2.2deb1+deb13u1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 01 mars 2026 à 02:43
-- Version du serveur : 11.8.3-MariaDB-0+deb13u1 from Debian
-- Version de PHP : 8.4.16

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
  `Description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Oeuvres`
--

INSERT INTO `Oeuvres` (`Id`, `Titre`, `Type`, `Durée`, `Description`) VALUES
(1, 'Dragon', 'Film, Fantasy', '2h05', 'Sur l\'île accidentée de Berk, où les Vikings et les dragons sont des ennemis acharnés depuis des générations, Harold, le fils inventif mais maltraité de son père le chef Stoïk La Brute, défie des siècles de pratique traditionnelle de combat contre les dragons lorsqu\'il se lie d\'amitié avec Krokmou, un Furie Nocturne.\r\n\r\nLeur lien improbable révèle la véritable nature des dragons, remettant en question les fondements mêmes de la société viking.'),
(2, 'Le portrait de Dorian Gray', 'Film, Drame, Fantastique, Thriller', '1h52', 'À la fin du XIXe siècle, à Londres, le jeune et très beau Dorian Gray arrive en ville après avoir hérité de la fortune de son grand-père. Il devient le modèle du peintre Basil Hallward, qui réalise son portrait. Lors d’une soirée, Dorian rencontre le cynique et charismatique Lord Henry Wotton, qui lui expose une philosophie hédoniste : la jeunesse et la beauté sont les seules choses qui comptent dans la vie. Influencé par ces idées, Dorian formule un vœu insensé : que le portrait vieillisse à sa place, tandis que lui resterait éternellement jeune. Son souhait se réalise. Alors que Dorian s’abandonne à une vie de plaisirs, de manipulation et de débauche, son visage reste intact et magnifique. En revanche, le portrait caché révèle progressivement les marques de ses péchés, devenant de plus en plus monstrueux.'),
(3, 'Opéra Poussière', 'Livre, Drame historique, Théâtre politique', 'indéterminé', 'la pièce de théâtre écrite par Jean d’Amérique raconte l’histoire de Sanité Bélair, jeune femme combattante haïtienne de la guerre d’indépendance, capturée et exécutée par les troupes françaises. Revenant du monde des morts, elle prend la parole pour rappeler son combat et celui des femmes dans l’histoire. À travers des scènes poétiques mêlant passé et présent, mythe et modernité, elle interagit avec des figures historiques et contemporaines pour dénoncer l’oubli des héroïnes et inviter à repenser les récits dominants. La pièce combine poésie, humour et engagement politique, reliant l’histoire haïtienne à des enjeux actuels sur la mémoire et la résistance.'),
(4, 'Mouthwashing', 'Jeu vidéo, Aventure', 'indéterminé', 'Mouthwashing est un jeu d’aventure horrifique psychologique en vue à la première personne, raconté de façon non linéaire. Il met le joueur à bord du Tulpar, un vaisseau cargo spatial dont l’équipage se retrouve coincé au milieu de nulle part après un crash mystérieux. Au début, le capitaine Curly est gravement blessé, incapable de parler ou de bouger, et les autres membres d’équipage le blâment d’avoir provoqué l’accident. Alors que les provisions diminuent et que l’oxygène et les rations commencent à manquer, la tension monte entre les survivants. Les joueurs explorent le Tulpar, découvrent des flashbacks qui révèlent ce qui s’est passé avant et après le crash, interagissent avec les autres personnages, résolvent quelques énigmes et assemblent les fragments du récit. La cargaison mystérieuse ne contient que… du bain de bouche (mouthwash), ce qui ajoute une touche absurde et désespérée à la situation. Au fil de l’histoire, l’isolement, la peur, la faim et la paranoïa poussent l’équipage à perdre pied : des hallucinations, des choix traumatisants et des conflits internes mènent à des événements de plus en plus sombres, jusqu’à une conclusion tragique qui laisse planer le doute sur l’issue pour l\'un des survivants.'),
(5, 'Un garçon c’est presque rien', 'Livre, Drame', 'indéterminé', 'Un garçon c’est presque rien raconte l’histoire de Roméo, un adolescent différent, souvent moqué par ses camarades pour ne pas correspondre aux stéréotypes de la virilité. Allongé dans un lit d’hôpital, dans le coma, il se remémore sa vie et les événements qui l’ont conduit là. À travers ses souvenirs, le lecteur découvre ses doutes sur l’identité, la masculinité et sa place dans le monde. Roméo se lie d’amitié avec Justine, et ensemble ils affrontent le harcèlement et les jugements de la société, cherchant à trouver leur liberté et leur identité. Écrit en vers libres, le roman explore avec sensibilité des thèmes universels comme l’acceptation de soi, la différence et le respect des autres, offrant un portrait touchant et poétique de l’adolescence.'),
(6, 'The Black Phone', 'Film, Epouvante-horreur, Thriller', '1h42', 'The Black Phone se déroule en 1978 dans une banlieue de Denver. Finney, un garçon de 13 ans timide et souvent harcelé à l’école, devient la prochaine victime d’un tueur en série masqué surnommé The Grabber. Celui-ci l’enlève et l’enferme dans un sous-sol insonorisé, où Finney est seul, terrifié, et incapable de se faire entendre. Dans ce sous-sol, il y a un ancien téléphone noir apparemment débranché au mur. Un jour, celui-ci commence à sonner malgré tout, et Finney découvre qu’il peut entendre les voix des anciens enfants kidnappés par le tueur. Ces voix, qui appartiennent aux enfants déjà morts, le guident, lui donnent des conseils et des indices qui pourraient l’aider à s’échapper. Pendant ce temps, la sœur de Finney, Gwen, dotée de rêves prémonitoires, sent que quelque chose ne va pas et tente de comprendre ce qui arrive à son frère, ce qui finit par l’entraîner, elle aussi, dans la lutte contre le monstre qui terrorise leur ville. Avec l’aide des voix et de sa propre détermination, Finney essaie de trouver un moyen de survivre et de se libérer, transformant sa peur en courage dans une lutte désespérée pour sa vie.'),
(7, 'Les Carnets de l\'apothicaire', 'Manga, Drame, enquête', 'indéterminé', 'À 17 ans, Mao Mao a une vie compliquée. Formée dès son jeune âge par un apothicaire du quartier des plaisirs, elle se retrouve enlevée et vendue comme servante dans le quartier des femmes du palais impérial ! Entouré de hauts murs, il est coupé du monde extérieur. Afin de survivre dans cette prison de luxe grouillant de complots et de basses manœuvres, la jeune fille tente de cacher ses connaissances pour se fondre dans la masse. Mais, quand les morts suspectes de princes nouveau-nés mettent la cour en émoi, sa passion pour les poisons prend le dessus. Elle observe, enquête... et trouve la solution! En voulant bien faire, la voilà repérée... Jinshi, haut fonctionnaire aussi beau que calculateur, devine son talent et la promeut goûteuse personnelle d\'une des favorites de l\'empereur. Au beau milieu de ce nid de serpents, le moindre faux pas peut lui être fatal !'),
(8, 'Harry Potter à l\'école des sorciers', 'Livre, Aventure, Amitié, Action, Fantastique', 'indéterminé', 'Harry Potter est un garçon ordinaire. Mais le jour de ses onze ans, son existence bascule : un géant vient le chercher pour l\'emmener dans une école de sorciers. Quel mystère entoure donc sa naissance et qui est l\'effroyable V..., le mage dont personne n\'ose prononcer le nom ? Voler à cheval des balais magique, jeter des sorts, combattre les Trolls : Harry Potter se révèle un sorcier vraiment doué. Quand il décide, avec ses amis, d\'explorer les moindres recoins de son école, il va se trouver entraîné dans d\'extraordinaires aventures.'),
(9, 'Titanic', 'Film, Mélodrame, romance, catastrophe', '195 min', 'En 1912, le Titanic quitte l’Angleterre pour son voyage vers New York. À bord, Rose, une jeune femme de la haute société malheureuse dans ses fiançailles, rencontre Jack, un artiste sans fortune voyageant en troisième classe. Malgré leurs différences sociales, ils tombent amoureux. Leur romance se développe secrètement, mais le navire heurte un iceberg dans l’Atlantique Nord. Le paquebot commence à couler, provoquant panique et chaos parmi les passagers. Alors que l’évacuation s’organise, les inégalités sociales réapparaissent : les passagers de première classe sont privilégiés. Jack aide Rose à survivre dans les conditions dramatiques du naufrage. Le film se conclut sur une fin tragique et émouvante, où l’amour et le sacrifice marquent profondément la vie de Rose.');

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
(4, 'sgdgd', 'dfgdgfd'),
(5, 'geoffrey', 'je_suis_bo'),
(6, 'geo', '1234'),
(7, 'GMorelle-2412', '1234'),
(8, 'GOEFFREY.MERELLE', '4564');

-- --------------------------------------------------------

--
-- Structure de la table `Votes`
--

CREATE TABLE `Votes` (
  `Id` int(50) NOT NULL,
  `Note` int(50) NOT NULL,
  `Avis` varchar(500) NOT NULL,
  `IdUsers` int(50) NOT NULL,
  `IdOeuvres` int(50) NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Votes`
--

INSERT INTO `Votes` (`Id`, `Note`, `Avis`, `IdUsers`, `IdOeuvres`, `Date`) VALUES
(2, 5, '4', 1, 1, '2026-02-23'),
(3, 5, '4', 1, 1, '2026-02-23'),
(4, 5, '4', 1, 1, '2026-02-23'),
(5, 5, '4', 1, 1, '2026-02-23'),
(6, 0, '0', 7, 1, '2026-02-23'),
(7, 0, '0', 7, 1, '2026-02-23'),
(8, 5, '4', 1, 1, '2026-02-23'),
(9, 0, '0', 7, 1, '2026-02-23'),
(10, 0, 'trop cool', 7, 1, '2026-02-23'),
(11, 4, 'super', 7, 1, '2026-02-24'),
(12, 4, 'test', 7, 1, '2026-02-24'),
(13, 0, '', 7, 1, '2026-02-24'),
(14, 5, 'je suis bo', 7, 1, '2026-02-26'),
(15, 5, 'c\'est coul', 7, 1, '2026-02-26'),
(16, 5, 'oui', 7, 1, '2026-02-27'),
(17, 3, 'cc', 7, 1, '2026-03-01');

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
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Votes`
--
ALTER TABLE `Votes`
  MODIFY `Id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
