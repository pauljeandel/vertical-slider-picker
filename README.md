# Script Mon sport a la maison

## Install Script
Works on : `Linux Shell`
#### Clone the repo in $HOME/bin :
```
cd $HOME/bin && git clone https://github.com/pauljeandel/msalmScript.git
```

#### Create a config_perso.txt file :
```
cd $HOME/bin/msalmScript && touch config_perso.txt
```
[Options et exemples plus bas](#config)
#### Add $HOME/bin/msalmScript to your PATH :
```
export PATH=$PATH:$HOME/bin/msalmScript
```
Pour rendre la modification permanente, ajouter la commande dans le fichier texte caché .bashrc se trouvant dans votre dossier personnel ainsi que dans le dossier /root.
Aide : <a href=https://doc.ubuntu-fr.org/tutoriel/script_shell>Doc Ubuntu</a>
## Contribuer :
 Via ***issue github***. Trois options :
 - `Rapport de bug`
 - `Nouvelle fonctionnalité`
 - `Amélioration`
</br></br>***Creer une branche du même nom que l'issue puis une Pull Request liée à l'issue.***</br></br>
<a href=https://github.com/pauljeandel/msalmScript/contribute>***Good first issues***</a>
## Usage
#### Basic Usage :
- `:~$ bash msalm.sh [COMMAND] <ARGS> --[OPTION]`
#### Exemples :
- `:~$ bash msalm.sh -iu --open` / `bash msalm.sh ionicupdate --open`
- `:~$ bash msalm.sh -iu -ie`
-
#### Basics commands :
- `help, -v` :             Affiche les commandes
- `update, -u` :               Met à jour le script
- `editScript, -es` :      Edite le script
- `editConig, -ec` :       Edite le fichier de config personnel
- `version, -v` :          Affiche la version
- `--testdev, --dev` :     Lance la fonction dev
<a name="config"></a>
#### Config options :
- `autoUpdate` : Maj Majeures auto et notifications de Maj Mineures
- `port` : Port utilisé pour le partage de fichiers
- `portDefaultIonicRemote` :              Port ionic
- `sharedFolderDirectory` :      Emplacement du dossier partagé par default $HOME/bin<PATH>
- `sharedFolderName` :       Nom du dosier partagé
- `ionicAppFolder` :          Chemin du projet ionic
- `symphonyAppFolder` :     Chemin du projet Symphony
##### Exemple `config_perso.txt`:

```
autoupdate=true
polypane=false
barrier=false
port=3200
portDefaultIonicRemote=8100

sharedFolderDirectory=/Project
sharedFolderName=Shared

gitRepoIonic=http://ionic-repo
gitRepoSymphony=http://sf-repo
ionicAppFolder=/web/www/mon-sport-maison/appli-msalm
symphonyAppFolder=/web/www/mon-sport-maison/mon-sport-maison-sf

```

