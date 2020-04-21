import React, { Component } from 'react';

export class PractitionerDetails extends Component {
  render() {
    const { practitioner } = this.props;

    return (
      <section>
        <h1>Practitioners Details</h1>
        <div>
          <ul>
            {practitioner.name.firstName && <li>First name : {practitioner.name.firstName}</li>}
            {practitioner.name.lastName && <li>Last name : {practitioner.name.lastName}</li>}
            {practitioner.address && practitioner.address.length > 0 && practitioner.address.map((address) => (
              <li key={address}>Address : {address}</li>
            ))}
            {practitioner.phone && practitioner.phone.length > 0 && practitioner.phone.map((phone) => (
              <li key={phone}>Phone : {phone}</li>
            ))}
            {practitioner.fax && practitioner.fax.length > 0 && practitioner.fax.map((fax) => (
              <li key={fax}>Fax : {fax}</li>
            ))}
            {practitioner.email && practitioner.email.length > 0 && practitioner.email.map((email) => (
              <li key={email}>Email : {email}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default PractitionerDetails;
