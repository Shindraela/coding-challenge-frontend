import i18n from 'i18next';

i18n
  .init({
    lng: "fr",
    fallbackLng: "fr",
    keySeparator: false,
    resources: {
      fr: {
        translation: {
          "practitionersListTitle": 'Liste des praticiens',
          "practitionerDetailsTitle": 'Détail du praticien',
          "editPractitionerTitle": 'Editer le praticien',
          "noPractitioners": 'Pas de praticiens sur cette page',
          "searchInput": 'Recherchez par nom',
          "previousButton": 'Précédent',
          "nextButton": 'Suivant',
          "editButton": 'Editer',
          "validateButton": 'Valider',
          "cancelButton": 'Annuler',
          "goBackButton": 'Retour',
          "lastName": 'Nom',
          "firstName": 'Prénom',
          "address": 'Adresse',
          "phone": 'Phone',
          "fax": 'Fax',
          "email": 'Email'
        },
      },
      en: {
        translation: {
          "practitionersListTitle": 'Practitioners List',
          "practitionerDetailsTitle": 'Practitioners Details',
          "editPractitionerTitle": 'Edit Practitioner',
          "noPractitioners": 'No practitioners on this page',
          "searchInput": 'Find by name',
          "previousButton": 'Previous',
          "nextButton": 'Next',
          "editButton": 'Edit',
          "validateButton": 'Validate',
          "cancelButton": 'Cancel',
          "goBackButton": 'Go Back',
          "lastName": 'Last name',
          "firstName": 'First name',
          "address": 'Adress',
          "phone": 'Phone',
          "fax": 'Fax',
          "email": 'Email'
        },
      },
    },
  })

export default i18n;
