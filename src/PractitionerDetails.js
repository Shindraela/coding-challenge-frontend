import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPractitioner } from './actions/index';

export class PractitionerDetails extends Component {
  render() {
    const { practitioner } = this.props;

    return (
      <section>
        <h1>Practitioners Details</h1>

        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Fax</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {practitioner.lastName && <td>{practitioner.lastName}</td>}
                {practitioner.firstName && <td>{practitioner.firstName}</td>}
                {practitioner.address && practitioner.address.length > 0 && <td>{practitioner.address}</td>}
                {practitioner.phone && practitioner.phone.length > 0 && practitioner.phone.map((phone, idx) => (
                  <td key={`phone${idx}`}>{phone}</td>
                ))}
                {practitioner.fax && practitioner.fax.length > 0 && practitioner.fax.map((fax, idx) => (
                  <td key={`fax${idx}`}>{fax}</td>
                ))}
                {practitioner.email && practitioner.email.length > 0 && practitioner.email.map((email, idx) => (
                  <td key={`email${idx}`}>{email}</td>
                ))}
              </tr>
            </tbody>
          </table>
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
