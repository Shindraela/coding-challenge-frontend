import axios from 'axios';
import { FETCH_PRACTITIONERS_SUCCESS } from './types';

const formatPractitioners = (practitioners) =>
  practitioners.map(({ resource }) => ({
    id: resource.id,
    name: {
      firstName: resource.name && resource.name[0] ? resource.name[0].given : undefined,
      lastName: resource.name && resource.name[0] ? resource.name[0].family : undefined,
      lastNameComposed: resource.name && resource.name[0] && resource.name[0]._family && resource.name[0]._family.extension[1] && resource.name[0]._family.extension[2]
        ? [
            resource.name[0]._family.extension[1].valueString,
            resource.name[0]._family.extension[2].valueString,
          ]
        : undefined,
    }
  }));

export const fetchPractitioners = () => (dispatch) =>
  axios.get('http://hapi.fhir.org/baseDstu3/Practitioner').then((res) => {
    let practitionersFormatted = [];

    if (res.data && res.data.entry && res.data.entry.length > 0) {
      // console.log("res.data.entry :", res.data.entry);
      practitionersFormatted = formatPractitioners(res.data.entry);
    }

    dispatch({ type: FETCH_PRACTITIONERS_SUCCESS, payload: practitionersFormatted });
  });
