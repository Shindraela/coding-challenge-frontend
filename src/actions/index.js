import axios from 'axios';
import { FETCH_PRACTITIONERS_SUCCESS, EDIT_PRACTITIONER, UPDATE_PRACTITIONER } from './types';

const formatPractitioners = (practitioners) =>
  practitioners.map(({ resource }) => ({
    id: resource.id,
    firstName: resource.name && resource.name[0].given && resource.name[0].given.length > 0 ? resource.name[0].given.join(' ') : undefined,
    lastName: resource.name && resource.name[0].family,
    address: resource.address ? resource.address.map(address => address.text) : undefined,
    phone: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom.system === 'phone').map(phone => phone.value) : undefined,
    fax: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom.system === 'fax').map(fax => fax.value) : undefined,
    email: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom.system === 'email').map(email => email.value) : undefined
  }));

export const fetchPractitioners = (url) => (dispatch) => {
  const requestUrl = url || 'https://hapi.fhir.org/baseDstu3/Practitioner';

  axios.get(requestUrl).then((res) => {
    let practitionersFormatted = [];
    let urlNextPage = null;
    let urlPreviousPage = null;

    if (res.data && res.data.entry && res.data.entry.length > 0) {
      practitionersFormatted = formatPractitioners(res.data.entry);

      const nextPage = res.data.link.find(link => link.relation === 'next');
      urlNextPage = nextPage ? nextPage.url : null;

      const previousPage = res.data.link.find(link => link.relation === 'previous');
      urlPreviousPage = previousPage ? previousPage.url : null;
    }

    dispatch({ type: FETCH_PRACTITIONERS_SUCCESS, payload: { practitioners: practitionersFormatted, urlPreviousPage, urlNextPage }});
  });
}

export const editPractitioner = (practitioner) => (dispatch) =>
  dispatch({ type: EDIT_PRACTITIONER, payload: practitioner });


export const updatePractitioner = (practitioner) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/fhir+json'
  }

  const formatUpdatedPractitioner = {
    "resourceType": "Practitioner",
    "id": practitioner.id,
    "identifier": [
      {
        "system": "http://fhir.de/NamingSystem/kbv/lanr",
        "value": practitioner.id
      }
    ],
    "name": [
      {
        "use": "usual",
        "family": practitioner.lastName,
        "given": practitioner.firstName,
        "prefix": [ "Dr." ]
      },
      {
        "_family": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-name",
              "valueString": "Test 3"
            }
          ]
        }
      }
    ],
    "telecom": [
      {
        "system": "phone",
        "value": practitioner.phone
      },
      {
        "system": "fax",
        "value": practitioner.fax
      },
      {
        "system": "email",
        "value": practitioner.email
      }
    ],
    "address": [
      {
        "text": practitioner.address
      }
    ]
  }

  axios.put(`https://hapi.fhir.org/baseDstu3/Practitioner/${practitioner.id}`, formatUpdatedPractitioner, { headers: headers }).then((res) => {
    dispatch({ type: UPDATE_PRACTITIONER, payload: practitioner });
  });
}
