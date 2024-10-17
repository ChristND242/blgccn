# Contribuer à Rin

[Français](./CONTRIBUTING.md) | Chinois simplifié

Nous serions ravis d'accepter vos correctifs et vos contributions à ce projet. Il vous suffit de suivre quelques petites directives.

# Hook de message de validation

Nous avons un exemple de hook commit-msg dans `scripts/commit-msg.sh`. Veuillez exécuter la commande suivante pour le configurer :

``` merde
ln -s ../../scripts/commit-msg.sh ./.git/hooks/commit-msg
```

Sous Windows, veuillez copier directement le fichier `commit-msg.sh` dans `.git/hooks/commit-msg`.

```powershell
cp .\scripts\commit-msg.sh .\.git\hooks\commit-msg
```

Cela exécutera les vérifications suivantes avant chaque validation :

1. `tsc` vérifie le code pour les erreurs de syntaxe et les variables et références inutilisées
2. Vérifiez si le message de validation commence par l'un des éléments suivants : feat|chore|fix|docs|ci|style|test|pref

Si vous souhaitez ignorer le hook, exécutez `git commit` avec l'option `--no-verify`.

# Mettre en place l'environnement de développement

1. Dépôt Fork & Clone

2. Installez [Node](https://nodejs.org/en/download/package-manager) & [Bun](https://bun.sh/)

3. Installer les dépendances
 ``` merde
 chignon je
 ```

4. Copiez le fichier `wrangler.example.toml` dans `wrangler.toml` et remplissez les informations nécessaires
 > [!ASTUCE]
 > Normalement, il vous suffit de renseigner `database_name` et `database_id`\
 > La configuration liée à S3 n'est pas requise, mais si vous souhaitez utiliser la fonction de téléchargement d'images, vous devez remplir la configuration S3

5. Copiez le fichier `client/.env.example` dans `client/.env` et modifiez la configuration nécessaire
 > [!ASTUCE]
 > Normalement, il vous suffit de renseigner `AVATAR`, `NAME` et `DESCRIPTION`

6. Effectuer la migration de la base de données
 > [!ASTUCE]
 > Si le nom de votre base de données (`database_name` dans `wrangler.toml`) n'est pas `rin`\
 > Veuillez modifier le champ `DB_NAME` dans `scripts/dev-migrator.sh` avant d'effectuer la migration
 ``` merde
 chignon m
 ```

7. Configurez le fichier `.dev.vars`
 Copiez `.dev.example.vars` dans `.dev.vars` et remplissez les informations nécessaires
 > [!ASTUCE]
 > Normalement, vous devez remplir `RIN_GITHUB_CLIENT_ID` et `RIN_GITHUB_CLIENT_SECRET` et `JWT_SECRET` trois éléments \
 > Dans l'environnement de développement, vous devez créer un service Github OAuth distinct et l'adresse de rappel est `http://localhost:11498/user/github/callback` \
 > Si vous avez modifié manuellement le port d'écoute du serveur, veuillez également modifier le numéro de port dans l'adresse de rappel.

8. Démarrez le serveur de développement
 ``` merde
 développeur de chignon
 ```

9. Pour mieux contrôler le serveur de développement, vous pouvez exécuter les commandes de développement client et serveur respectivement dans deux terminaux :
 ``` merde
 #tty1
 bundev:client

 #tty2
 bundev:serveur
 ```

# Soumettre les modifications

1. Les correctifs simples peuvent généralement être examinés dans les 10 minutes pendant les heures de clarté dans le fuseau horaire UTC+8.

2. Ne forcez pas de petits changements jusqu'à ce que le PR soit prêt à être examiné. Cela oblige le responsable à relire l'intégralité de votre PR, retardant ainsi le processus de révision.

3. Gardez CI vert à tout moment.

4. Si CI échoue sur votre PR, n'insistez pas. Même si vous pensez que ce n'est pas la faute du patch. Si le CI est cassé pour d'autres raisons, aidez à corriger la cause première avant de pousser.

*Commencez à coder joyeusement ! *

# Révision des codes
Toutes les soumissions, y compris celles des membres du projet, sont sujettes à examen. Nous utilisons les pull request GitHub pour y parvenir. Pour plus d’informations sur l’utilisation des demandes d’extraction, consultez l’aide de GitHub.