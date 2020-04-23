import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPractitioner } from './actions/index';

export class PractitionerDetails extends Component {
  render() {
    const { practitioner } = this.props;

    return (
      <section>
        <h1>Practitioners Details</h1>
        <div>
          <ul>
            {practitioner.firstName && <li>First name : {practitioner.firstName}</li>}
            {practitioner.lastName && <li>Last name : {practitioner.lastName}</li>}
            {practitioner.address && practitioner.address.length > 0 && <li key={practitioner.address}>Address : {practitioner.address}</li>}
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

const mapStateToProps = (state) => ({
  practitioners: state.practitioners.items,
});

const mapDispatchToProps = (dispatch) => ({
  editPractitioner: () => dispatch(editPractitioner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PractitionerDetails);
