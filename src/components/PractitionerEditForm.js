import React from 'react';
import { connect } from 'react-redux';
import { updatePractitioner } from '../actions/index';

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
    const multiData = this.state[type];
    multiData[index] = value;
    this.handleValue(type, multiData);
  }

  handleValue = (value, type) => {
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
    const { practitioner, t } = this.props;
    const { firstName, lastName, address, phone, fax, email } = this.state;

    return (
      <section>
        <h1>{t("editPractitionerTitle")}</h1>

        <div key={practitioner.id} className="container">
          <form method="PUT" className="form" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="bold-font">{t("lastName")}</label>
              <input name="lastName" type="text" className="form-control" value={lastName} onChange={(e) => this.handleValue(e.target.value, 'lastName')} />
            </div>
            <div className="form-group">
              <label className="bold-font">{t("firstName")}</label>
              <input name="firstName" type="text" className="form-control" value={firstName} onChange={(e) => this.handleValue(e.target.value, 'firstName')} />
            </div>
            <div className="form-group">
              <label className="bold-font">{t("address")}</label>
              {
                address && address.length > 0 ? address.map((address, idx) => (
                    <input type="text" className="form-control" key={`address${idx}`} value={address} placeholder="Edit address" onChange={(e) => this.handleMultiValue(e.target.value, 'address', idx)} />
                  )) :
                  <input type="text" className="form-control" placeholder="Edit address" />
              }
            </div>
            <div className="form-group">
              <label className="bold-font">{t("phone")}</label>
              {
                phone && phone.length > 0 ? phone.map((phone, idx) => (
                    <input type="text" className="form-control" key={`phone${idx}`} value={phone} placeholder="Edit phone" onChange={(e) => this.handleMultiValue(e.target.value, 'phone', idx)} />
                  )) :
                  <input type="text" className="form-control" placeholder="Edit phone" />
              }
            </div>
            <div className="form-group">
              <label className="bold-font">{t("fax")}</label>
              {
                fax && fax.length > 0 ? fax.map((fax, idx) => (
                    <input type="text" className="form-control" key={`fax${idx}`} value={fax} placeholder="Edit fax" onChange={(e) => this.handleMultiValue(e.target.value, 'fax', idx)} />
                  )) :
                  <input type="text" className="form-control" placeholder="Edit fax" />
              }
            </div>
            <div className="form-group">
              <label className="bold-font">{t("email")}</label>
              {
                email && email.length > 0 ? email.map((email, idx) => (
                    <input type="text" className="form-control" key={`email${idx}`} value={email} placeholder="Edit email" onChange={(e) => this.handleMultiValue(e.target.value, 'email', idx)} />
                  )) :
                  <input type="text" className="form-control" placeholder="Edit email" />
              }
            </div>

            <button className="btn btn-success">{t("validateButton")}</button>
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