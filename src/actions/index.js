import axios from 'axios';
import { FETCH_PRACTITIONERS_SUCCESS } from './types';

const formatPractitioners = (practitioners) =>
  practitioners.map(({ resource }) => ({
    id: resource.id,
    name: {
      firstName: resource.name && resource.name[0].given && resource.name[0].given.length > 0 ? resource.name[0].given.join(' ') : undefined,
      lastName: resource.name && resource.name[0].family,
    },
    address: resource.address ? resource.address.text : undefined,
    phone: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom.system === 'phone').map(phone => phone.value) : undefined,
    fax: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom === 'fax').map(fax => fax.value) : undefined,
    email: resource.telecom && resource.telecom ? resource.telecom.filter(dataCom => dataCom === 'email').map(email => email.value) : undefined
  }));

export const fetchPractitioners = () => (dispatch) =>
  axios.get('http://hapi.fhir.org/baseDstu3/Practitioner').then((res) => {
    let practitionersFormatted = [];

    if (res.data && res.data.entry && res.data.entry.length > 0) {
      practitionersFormatted = formatPractitioners(res.data.entry);
    }

    dispatch({ type: FETCH_PRACTITIONERS_SUCCESS, payload: practitionersFormatted });
  });
