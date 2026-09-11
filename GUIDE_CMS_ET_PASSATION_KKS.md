# 📘 GUIDE D''ADMINISTRATION CMS & LIVRAISON CLIENT (HANDOVER)
### **KKS Groupe Électrique SARLU** — Propulsé par le Framework MOKILI

Ce document est le guide officiel de passation remis à la direction et aux gestionnaires de **KKS Groupe Électrique SARLU** pour administrer, mettre à jour les médias et piloter le contenu de leur site vitrine en totale autonomie et sans compétences en programmation.

---

## 🔑 1. IDENTIFIANTS & ACCÈS CMS

- **Adresse d''administration (URL discrète) :**  
  `https://[votre-domaine]/admin.html` *(ou `http://localhost:3000/admin.html` en local)*
- **Code secret d''accès (PIN par défaut) :**  
  `kks2026@kin` *(code de secours : `kks2026`)*
- **Règle de sécurité MOKILI :** Aucun lien vers cette page d''administration n''apparaît publiquement sur le site vitrine afin d''éviter toute intrusion.

---

## 📸 2. CHARGER, MODIFIER & SUPPRIMER DES MÉDIAS (PHOTOS / VIDÉOS)

Le CMS intègre un système de téléversement direct sans serveur qui transforme instantanément vos fichiers en médias web haute performance.

### A. Remplacer les Médias Principaux (Logo, Photo d''Accueil, Photo À Propos, Vidéo)
1. Rendez-vous dans l''onglet **« Médiathèque & Médias »** de la barre latérale du CMS.
2. Pour chaque élément (Logo, Image Accueil, Image À Propos, Vidéo MP4 ou Poster) :
   - Cliquez sur **« 📁 Charger un fichier »**.
   - Sélectionnez la photo ou vidéo depuis votre ordinateur ou smartphone.
   - L''aperçu s''actualise immédiatement !
3. Cliquez sur **« 💾 Sauvegarder les Médias Clés »** en bas de page.

### B. Mettre à Jour les Chantiers & Réalisations
1. Rendez-vous dans l''onglet **« Réalisations & Chantiers »**.
2. **Pour modifier la photo d''un chantier :**
   - Cliquez sur **« 📁 Charger une photo »** sur la carte du chantier désiré.
   - Sélectionnez votre nouvelle photo prise sur le terrain.
3. **Pour modifier les textes d''un chantier :**
   - Modifiez le Titre, la Localisation (ex: *Ngaliema, Kinshasa*), le Client (*SNEL / Privé*), le Badge et la Description technique.
   - Renseignez les points clés séparés par des virgules (ex: *Cellule 24kV, Câble 150mm², Agrément SNEL*).
4. **Pour ajouter un nouveau chantier :**
   - Cliquez sur le bouton **« + Ajouter une réalisation »** en haut à droite.
5. **Pour supprimer un chantier :**
   - Cliquez sur le bouton rouge **« Supprimer ce projet »**.
6. Cliquez impérativement sur **« 💾 Enregistrer toutes les réalisations »**.

---

## 📝 3. MODIFIER LES COORDONNÉES, TÉLÉPHONES, EMAIL & TEXTES

1. Rendez-vous dans l''onglet **« Coordonnées & Textes »**.
2. Modifiez directement :
   - **Téléphone affiché :** `+243 983 030 088`
   - **Numéro WhatsApp international (sans espace) :** `+243983030088`
   - **Email officiel :** `kksgroupeelectric@gmail.com`
   - **Adresse physique :** `Huilerie, avenue Luvungi N°158, Q/Dialo, C/Kinshasa`
   - **Horaires :** `Lundi – Samedi : 08h00 – 17h30 (Permanence dépannage)`
   - **Textes Hero & Paragraphes À Propos.**
3. Cliquez sur **« 💾 Enregistrer Coordonnées & Textes »**.
4. Le site public, les boutons d''appel et les liens WhatsApp sont mis à jour instantanément !

---

## 💾 4. SAUVEGARDE & RESTAURATION (EXPORT / IMPORT JSON)

Toutes vos données sont stockées de façon sécurisée et autonome. Il est recommandé de faire une sauvegarde après chaque mise à jour majeure.

### A. Exporter une Sauvegarde
1. Rendez-vous dans l''onglet **« Sauvegarde & Export »**.
2. Cliquez sur le bouton vert **« 📥 Exporter la sauvegarde complète (JSON) »**.
3. Un fichier `kks_cms_backup_[date].json` est immédiatement téléchargé sur votre appareil. Conservez-le précieusement.

### B. Restaurer une Sauvegarde
1. Cliquez sur **« Choisir un fichier »** dans la zone de restauration.
2. Sélectionnez votre fichier `.json` préalablement sauvegardé.
3. Vos textes, photos et réglages sont immédiatement restaurés.

### C. Réinitialisation d''Usine
- En cas d''erreur, le bouton rouge **« ⚠️ Réinitialiser aux données officielles du portfolio »** recharge les données d''origine validées par MOKILI.

---

## 🔒 5. MODIFIER LE CODE SECRET D''ACCÈS (PIN)

1. Rendez-vous dans l''onglet **« Code PIN & Sécurité »**.
2. Saisissez votre nouveau mot de passe / code PIN (au moins 4 caractères).
3. Cliquez sur **« Mettre à jour le code PIN »**.
4. Notez bien votre nouveau code.

---

## 📍 6. INDEXATION & RÉFÉRENCEMENT LOCAL À KINSHASA (SEO)

Pour maximiser les appels et demandes de devis à Kinshasa :

### A. Fiche Google Business Profile (Google Maps) — *À faire en priorité*
1. Créez / revendiquez la fiche sur [https://business.google.com](https://business.google.com).
2. **Nom d''établissement :** `KKS Groupe Électrique SARLU - Ingénierie & Travaux MT/BT`
3. **Catégorie principale :** *Électricien / Entreprise d''ingénierie électrique*
4. **Adresse :** `Avenue Luvungi N°158, Quartier Dialo, Huilerie, Commune de Kinshasa`
5. **Numéro de téléphone :** `+243 983 030 088`
6. **Site web :** `https://kksgroupeelectrique.com` (ou l''URL déployée)

### B. Google Search Console
1. Rendez-vous sur [https://search.google.com/search-console](https://search.google.com/search-console).
2. Ajoutez la propriété de votre domaine.
3. Soumettez le sitemap : `https://[votre-domaine]/sitemap.xml`.
4. Le site sera indexé sous 24 à 48 heures pour les mots-clés :
   - *Électricien Kinshasa*
   - *Cabine privée SNEL Kinshasa*
   - *Tableau électrique TGBT RDC*
   - *Ingénierie électrique Huilerie Kinshasa*

---

**Propulsé par le Framework MOKILI**  
*MOKILI SAS / KreAtyva — https://mokili.io*