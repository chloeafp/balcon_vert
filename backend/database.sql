-- Supprimer les tables si elles existent déjà
DROP TABLE IF EXISTS `balcony`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `plant`;

-- Créer la table `plant`
CREATE TABLE `plant` (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(200) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description VARCHAR(1000),
    water VARCHAR(200) NOT NULL,
    sun VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL
);

-- Créer la table `user`
CREATE TABLE `user` (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL
);

-- Créer la table `balcony`
CREATE TABLE `balcony` (
    user_id INT NOT NULL,
    plant_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE,
    FOREIGN KEY (plant_id) REFERENCES `plant` (id) ON DELETE CASCADE
);

-- Insérer des données dans la table `plant`
INSERT INTO `plant` (name, image, description, water, sun, region)
VALUES ('Monstera', 'https://www.willemsefrance.fr/cdn/shop/products/WIL_18129_1.jpg?v=1682495878', 'La plante Monstera est une espèce de plante grimpante tropicale aux grandes feuilles découpées, appréciée pour sa beauté et sa capacité à purifier l\'air', 'beaucoup', 'moyen', 'Amérique Centrale');

-- Insérer des données dans la table `user`
INSERT INTO `user` (name, email, hashedPassword)
VALUES ('chloe', 'chloeafp@gmail.com', 'chloe'), ('tom', 'tom@gmail.com', 'tom');
