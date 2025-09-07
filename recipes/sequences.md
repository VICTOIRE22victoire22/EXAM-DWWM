# Diagrammes de séquences

Représentation des séquences de l'application MediaLibrary.

## Les actions des utilisateurs (rôle utilisateur)

```mermaid

sequenceDiagram
    actor Utilisateur
    participant InterfaceRecherche
    participant GestionnaireRecettes
    participant BaseDeDonnees

    rect rgb(255,240,240)
        Utilisateur->>+InterfaceRecherche: saisirMotCle()
        activate InterfaceRecherche
        InterfaceRecherche->>+GestionnaireRecettes: rechercherRecettes(motCle)
        GestionnaireRecettes->>+BaseDeDonnees: getRecettes(motCle)
        BaseDeDonnees-->>-GestionnaireRecettes: listeRecettes
        GestionnaireRecettes-->>-InterfaceRecherche: afficherSuggestions(listeRecettes)
        InterfaceRecherche-->>Utilisateur: afficherResultats()
    end


sequenceDiagram
    actor Utilisateur
    participant InterfaceFormulaire
    participant GestionnaireRecettes
    participant BaseDeDonnees

    rect rgb(180,245,220)
        Utilisateur->>+InterfaceFormulaire: saisirInformations()
        activate InterfaceFormulaire
        InterfaceFormulaire->>InterfaceFormulaire: validerChamps()
        alt Données valides
            InterfaceFormulaire->>+GestionnaireRecettes: ajouterRecette(donneesRecette)
            GestionnaireRecettes->>+BaseDeDonnees: saveRecette(donneesRecette)
            BaseDeDonnees-->>-GestionnaireRecettes: confirmationEnregistrement
            GestionnaireRecettes-->>-InterfaceFormulaire: afficherMessageSucces()
            InterfaceFormulaire-->>Utilisateur: afficherConfirmation()
        else Données invalides
            InterfaceFormulaire-->>Utilisateur: afficherErreursValidation()
        end
    end

