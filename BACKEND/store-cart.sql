-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 20-Dez-2021 às 02:45
-- Versão do servidor: 10.4.10-MariaDB
-- versão do PHP: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `store-cart`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `amount` int(11) NOT NULL,
  `perishable` tinyint(1) NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  `last_edition` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `amount`, `perishable`, `created_at`, `last_edition`) VALUES
(1, 'CHICLETES', 'doces', 0.89, 5, 1, NULL, 1639763657),
(8, 'CELULAR', 'ELETRONICOS', 899.9, 3, 0, 1639708816, 1639709738),
(9, 'LIVRO', 'CULTURA', 10.98, 1, 0, 1639708917, 1639531603),
(10, 'TECLADO', 'eletrônicos', 10, 1, 0, 1639752572, 1639763634),
(11, 'MICROFONE', 'eletrônicos', 6.99, 6, 0, 1639752600, 1639763581),
(12, 'ARROZ', 'comida', 17.99, 4, 1, 1639752891, 1639753505),
(13, 'HORTELÃ', 'temperos', 1.99, 11, 1, 1639752953, 1639752953),
(14, 'FEIJÃO', 'comidas', 6.89, 1, 1, 1639753037, 1639763679),
(16, 'CLIPS DE PAPEL', 'escritório', 0.99, 26, 0, 1639755503, 1639755503),
(17, 'NESCAU', 'achocolatados', 9.98, 4, 1, 1639756403, 1639756403),
(18, 'COCA', 'bebidas', 7.5, 4, 1, 1639756472, 1639756472),
(19, 'SUCO', 'bebidas', 3.5, 2, 1, 1639757409, 1639757409),
(20, 'CANETA', 'escritório', 0.8, 6, 0, 1639758047, 1639758047),
(21, 'BOLO', 'comida', 30.77, 2, 1, 1639758195, 1639758195),
(22, 'LEITE', 'bebidas', 3.99, 16, 1, 1639758601, 1639758601),
(23, 'COENTRO', 'temperos', 1, 7, 1, 1639758798, 1639758798),
(24, 'CARNE MOÍDA', 'comidas', 23.8, 3, 1, 1639761538, 1639761538),
(25, 'AÇUCAR', 'comidas', 3.99, 2, 1, 1639762295, 1639762295),
(26, 'LARANJA', 'frutas', 2.7, 1, 1, 1639762318, 1639762318),
(27, 'MAIZENA', 'comidas', 2, 1, 1, 1639762367, 1639762367),
(28, 'TELEVISÃO', 'eletrônicos', 1890, 1, 0, 1639762436, 1639762436),
(29, 'PENDRIVE', 'eletrônicos', 39.9, 1, 0, 1639762486, 1639762486),
(30, 'MAÇA', 'frutas', 3.4, 5, 1, 1639763708, 1639763708),
(31, 'TESOURA', 'escritório', 12.45, 2, 0, 1639763760, 1639763760),
(32, 'FONE DE OUVIDO', 'eletrônicos', 9.99, 1, 0, 1639764973, 1639764973),
(33, 'DESODORANTE', 'perfumaria', 6.7, 6, 0, 1639765042, 1639765042),
(34, 'PAPEL TOALHA', 'cozinha', 7.6, 6, 0, 1639967678, 1639967678);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
