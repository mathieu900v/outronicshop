# Compte-rendu journalier du stage

### Jeudi 8/04

-   Découverte de l'outil XMind pour créer une sorte de schéma du site
-   [Schéma FrontEnd](FrontEnd.png)

### Vendredi 9/04

-   [Schéma BackEnd](BackEnd.png)
-   Réunion 17h

---

### Lundi 12/04

-   Découverte de l'outil Wireframe [Whimsical](http://whimsical.com)
-   Début du Wireframe (Header, Footer, page de produit et page des catégories) -> [Wireframe du site](https://whimsical.com/outronic-shop-GbDf55uoJrajhd3KwUpWHw)

### Mardi 13/04

-   Wireframe Catégories et pages Produits
-   Début du MCD

### Mercredi 14/04

-   Fin du [MCD](MCD.svg) version 1
-   Wireframe Compte et Connexion
-   Réunion 14h

### Jeudi 15/04

-   PostgreSQL installation et mise en place

### Vendredi 16/04

-   Node.js installation et mise en place
-   début modèle, controlleur et routes de Brand
-   Réunion 14h

---

### Lundi 19/04

-   Difficultés avec Node et remise en question du framework
-   Début liste des routes

### Mardi 20/04

-   Réflexions sur le changement de Framework -> ASP.NET Core
-   Swagger fonctionnel sur OpenAPI

### Mercredi 21/04

-   Brands en Backend ASP.NET Core

### Jeudi 22/04

-   Categories et Products en Backend

### Vendredi 23/04

-   Début du React vace Next.JS Agile

---

### Lundi 26/04

-   Routes, Layouts et et Affichage pour Brands [Aperçu](BrandsWebPage.png)

### Mardi 27/04

-   Réunion 11h
-   Amélioration des boutons, routes et mise en forme du code

### Mercredi 28/04

-   Backend pour Products et Categories

### Jeudi 29/04

-   Difficultés avec les components React et leur mise en place
-   Formulaire d'ajout d'une brand

### Vendredi 30/04

-   Réunion 11h30
-   Amélioration des components et de la gestion de l'API

---

### Lundi 03/05

-   Reprise totale du code et pas mal de difficultés sur React et les Components
-   BackEnd avec plus de tests et vérifications

### Mardi 04/05

-   List Categories retravaillée
-   List Products fonctionnelle mais pas encore définitive
-   Backend qui renvoie un message d'erreur et un code (200 OK, 201 Created)

### Mercredi 05/05

-   Réunion 11h
-   Découverte preventDefault()
-   Création du Component AddButton qui sert à lancer un Form avec isNew

### Jeudi 06/05

-   Création du Component ReturnButton qui sert à rafraichir la route ou en changer
-   Création du Component EditButton qui sert à lancer un Form sans isNew
-   FormBrand fonctionnel, avec retour d'erreur API et pré-remplissage des champs à l'édition
-   FormCategory visuel fait

### Vendredi 07/05

-   Réunion 14h
-   Reprise de l'organisation des Listes et Formulaires : La page Index de chaque route doit avoir 3 états : List, FormCreate et FormUpdate

---

### Lundi 10/05

-   Au final il y aura 3 états : List, Form et Loading. le component Form reçoit des données d'édition si il y en a, sinon il considère une création. Le fait d'avoir un Loading permet un retour visuel sans clignotement lors de la suppression.

### Mardi 11/05

-   Simplification du code avec Brand qui contient maintenant les components List, Form,, Edit et Add (CRUD).
-   Les components Form contiennent eux les components AlertMessage et ReturnButton.

### Mecrcredi 12/05

-   Début de la refonte du Form Product et de la liste associée
-   Liste et Index pour Products optimisés (Comme pour Brand et Category)

---

### Lundi 17/05

-   Menu dropdown sur le Form Category pour la catégorie parente fonctionnel, ainsi que la possibilité d'une Main Category
-   Find pour trouver la catégorie parente (découverte du Find)
-   Réunion 16h

### Mardi 18/05

-   Remise en forme du Product Form avec :
-   Dropdown menus pour choisir la Catégorie et la Brand
-   Radio Button pour le Highlighted

### Mercredi 19/05

-   Form Product fonctionnel pour le create et icones d'éditions dans la liste
-   Bug : ID product n'est pas reconnu à l'Update

### Jeudi 20/05

-   BackEnd pour Carriers fait avec les 5 : List, Create, Delete, Count et Update

### Vendredi 21/05

-   Carriers fonctionnel, j'ai effectué des tests sur toutes les routes pour revérifier les champs obligatoires etc : En gros optimisation Backend pour ne pas autoriser des données non voulues
-   Champ recherche dans la listCategory (Gestion d'un isOrder et champ search BackEnd)

---

### Mardi 25/05

-   Site public avec une liste de produits et un aperçus à travailler
-   Réunion 14h

### Mercredi 26/05

-   Correction de bugs et ajouts : Champs obligatoires notés, SKU en 00-000 ou 00-0000, Highlighted à revoir
-   Page d'accueil : Ajout de la TopBar

### Jeudi 27/05

-   Page d'accueil : Ajout de la NavBar
-   Difficultés sur le routage : Comment affecter des components à plusieurs routes ?

### Vendredi 28/05

-   Fonctionnement de la topBar avec propriété Link de Next JS, affectation des routes (paths dans getStaticPaths)
-   Tests sur Title.js dans les catégories pour comprendre le routeur Next et s'en servir

---

### Lundi 31/05

-   Toute la gestion des queries pour Product en Back-end : trouver les produits d'une catégorie, d'une marque, d'une recherche dans le title ou le sku et aussi obtenir les Highlighted

### Mardi 01/06

-   Gestion des pages /categories/\* pour avoir toutes les produits des catégories affichées
-   Quelques difficultés à comprendre Next et l'usage de GetStaticPaths et GetStaticProps

### Mercredi 02/06

-   Réunion 14h
-   Résolutions de bugs sur la partie admin, vérification complète du code et suppression de redondances

### Jeudi 03/06

-   Améliorations sur les routes des catégories, elles s'affichent maintenant comme voulu (les routes catégories affiche les produits correspondant, sans savoir d'où elle est appellée)
-   Pas mal de changements correspondants, avec les queries qui son,t mieux gérées également et qui "S'Intersectent". Par exemple si l'on cherche les produits d'une catégorie, d'une brand et qui contiennent une lettre, on trouve ce produit. On peut avoir 1, 2 ou les 3 champs de recherche.

### Vendredi 04/06

-   Encore des petites améliorations pour éviter de faire trop de requêtes à la DB et au backend pour les recherches
-   Front-End de carriers dans le coté admin, on peut les afficher et les supprimer pour l'instant

---

### Lundi 07/06

-   Réunion 14h avec M.Krähenbühl et M.Gossa

Liste de bugs connus ou features manquantes :

Bug searchbar admin qui ne refresh pas
Affichage produits par marques
Superadmin
