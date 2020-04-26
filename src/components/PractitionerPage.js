import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PractitionerDetails from "./PractitionerDetails";
import PractitionerEditForm from "./PractitionerEditForm";

export class PractitionerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }

    this.setIsEditing = this.setIsEditing.bind(this);
  }

  setIsEditing(isEditing) {
    this.setState({
      isEditing
    });
  }

  render() {
    const { isEditing } = this.state;
    const { practitioner, i18n, t } = this.props;

    return (
      <section>
        <div key={practitioner.id}>
          {
            isEditing ?
            <PractitionerEditForm practitioner={practitioner} setIsEditing={this.setIsEditing} i18n={i18n} t={t} /> :
            <PractitionerDetails practitioner={practitioner} i18n={i18n} t={t} />
          }
        </div>

        {
          isEditing ?
          <div className="d-flex justify-content-start">
            <button type="button" className="btn btn-danger" onClick={() => this.setIsEditing(false)}>{t("cancelButton")}</button>
          </div> :
          <div className="d-flex justify-content-end">
            <Link to="/" className="btn btn-secondary">{t("goBackButton")}</Link>
            <button type="button" className="btn btn-info" onClick={() => this.setIsEditing(true)}>{t("editButton")}</button>
          </div>
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  practitioners: state.practitioners.items,
});

export default connect(mapStateToProps)(PractitionerPage);