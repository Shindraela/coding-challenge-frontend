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
    const { practitioner } = this.props;

    return (
      <section>
        <div key={practitioner.id}>
          {
            isEditing ?
            <PractitionerEditForm practitioner={practitioner} setIsEditing={this.setIsEditing} /> :
            <PractitionerDetails practitioner={practitioner} />
          }
        </div>

        {
          isEditing ?
          <button type="button" onClick={() => this.setIsEditing(false)}>Cancel</button> :
          <div>
            <Link to="/">Go Back</Link>
            <button type="button" onClick={() => this.setIsEditing(true)}>Edit</button>
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