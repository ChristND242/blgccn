#CCN

[Anglais](./README.md) | Chinois simplifié


![Couverture](https://repository-images.githubusercontent.com/803866357/958bc2c1-1703-4127-920c-853291495bdc)

![Activité de validation GitHub](https://img.shields.io/github/commit-activity/w/openRin/Rin?style=for-the-badge)
![Exécution de la vérification de la branche GitHub](https://img.shields.io/github/check-runs/openRin/Rin/main?style=for-the-badge)
![Langage principal de GitHub](https://img.shields.io/github/linguals/top/openRin/Rin?style=for-the-badge)
![Licence GitHub](https://img.shields.io/github/license/openRin/Rin?style=for-the-badge)
![État du flux de travail des actions GitHub](https://img.shields.io/github/actions/workflow/status/openRin/Rin/deploy.yaml?style=for-the-badge)

# introduire

Rin est un blog basé sur les buckets de la famille Cloudflare Pages + Workers + D1 + R2. Il ne nécessite ni serveur ni enregistrement, et n'a besoin que d'un nom de domaine résolu par Cloudflare pour être déployé.

## Adresse de démonstration

[xeu.life](https://xeu.life)


## Caractéristiques
1. Prise en charge de la connexion Github OAuth Par défaut, le premier utilisateur connecté dispose de droits d'administrateur et les autres utilisateurs sont des utilisateurs ordinaires.
2. Soutenir la rédaction et l'édition d'articles
3. Prend en charge l'enregistrement local en temps réel des modifications/modifications de n'importe quel article sans interférer avec plusieurs articles.
4. Prend en charge le paramètre pour être visible uniquement par vous-même, ce qui peut servir de brouillon pour la synchronisation dans le cloud ou enregistrer du contenu hautement privé.
5. Prend en charge le glisser/coller des images téléchargées vers des compartiments de stockage prenant en charge le protocole S3 et la génération de liens.
6. Prend en charge la définition d'alias d'articles et vous pouvez accéder aux articles via des liens tels que https://xeu.life/about
7. Les articles d'assistance ne sont pas répertoriés dans la liste de la page d'accueil
8. Prend en charge l'ajout de liens d'amis, et le backend vérifie et met régulièrement à jour l'état d'accessibilité des liens d'amis toutes les 20 minutes.
9. Prise en charge de la réponse aux articles de commentaires/suppression de commentaires
10. Prise en charge de l'envoi de notifications de commentaires via Webhook
11. Prend en charge l'identification automatique de la première image d'un article et son affichage comme image d'en-tête dans la liste d'articles
12. Prend en charge la saisie du texte des balises sous la forme de "#blog # déployer #Cloudflare" et l'analyse automatiquement en balises
13. Pour plus de fonctionnalités, veuillez vous référer à https://xeu.life

# document

[rin-docs.xeu.life](https://rin-docs.xeu.life)

## Star History

<a href="https://star-history.com/#openRin/Rin&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=openRin/Rin&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=openRin/Rin&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=openRin/Rin&type=Date" />
 </picture>
</a>

# License
```
MIT License

Copyright (c) 2024 Xeu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
