import React from 'react';
import { connect } from 'react-redux';
import { updatePractitioner } from './actions/index';

export class PractitionerEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.practitioner.firstName,
      lastName: props.practitioner.lastName,
      address: props.practitioner.address,
      phone: props.practitioner.phone,
      fax: props.practitioner.fax,
      email: props.practitioner.email
    }
  }

  handleMultiValue = (value, type, index) => {
    // récup liste des téléphones
    const multiData = this.state[type];
    multiData[index] = value;
    this.handleEdit(type, multiData);
  }

  handleEdit = (value, type) => {
    this.setState({
      [type]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updatePractitioner({id: this.props.practitioner.id, ...this.state});
    this.props.setIsEditing(false);
  }

  render() {
    const { practitioner } = this.props;
    const { firstName, lastName, address, phone, fax, email } = this.state;

    return (
      <section>
        <h1>Edit Practitioner</h1>

        <div key={practitioner.id} className="practitioner">
          <form method="PUT" className="form" onSubmit={this.onSubmit}>
            <input required name="firstName" type="text" value={firstName} onChange={(e) => this.handleValue(e.target.value, 'firstName')} />

            <input required name="lastName" type="text" value={lastName} onChange={(e) => this.handleValue(e.target.value, 'lastName')} />

            {
              address && address.length > 0 ? address.map((address, idx) => (
                  <input required type="text" key={`address${idx}`} value={address} placeholder="Edit address" onChange={(e) => this.handleMultiValue(e.target.value, 'address', idx)} />
                )) :
                <input required type="text" placeholder="Edit address" />
            }

            {
              phone && phone.length > 0 ? phone.map((phone, idx) => (
                  <input required type="text" key={`phone${idx}`} value={phone} placeholder="Edit phone" onChange={(e) => this.handleMultiValue(e.target.value, 'phone', idx)} />
                )) :
                <input required type="text" placeholder="Edit phone" />
            }

            {
              fax && fax.length > 0 ? fax.map((fax, idx) => (
                  <input required type="text" key={`fax${idx}`} value={fax} placeholder="Edit fax" onChange={(e) => this.handleMultiValue(e.target.value, 'fax', idx)} />
                )) :
                <input required type="text" placeholder="Edit fax" />
            }

            {
              email && email.length > 0 ? email.map((email, idx) => (
                  <input required type="text" key={`email${idx}`} value={email} placeholder="Edit email" onChange={(e) => this.handleMultiValue(e.target.value, 'email', idx)} />
                )) :
                <input required type="text" placeholder="Edit email" />
            }

            <button>Update</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  practitioners: state.practitioners.items,
});

const mapDispatchToProps = (dispatch) => ({
  updatePractitioner: (practitionerUpdated) => dispatch(updatePractitioner(practitionerUpdated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PractitionerEditForm);