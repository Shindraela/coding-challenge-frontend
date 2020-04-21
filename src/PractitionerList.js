import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPractitioners } from './actions/index';

export class PractitionerList extends Component {
  componentDidMount() {
    this.props.fetchPractitioners();
  }

  renderPractitioners() {
    const { practitioners } = this.props;
    // console.log("practitioners :", practitioners);

    if (!practitioners || practitioners.length === 0) {
      return null;
    }

    const practitionersName = practitioners.reduce((accumulate = [], practitioner) => {
      const { name } = practitioner;
      const namePractitioner =  {
        firstName: null,
        lastName: null
      };

      // In case where practitioner has many firstname
      if (name.firstName && name.firstName.length > 0) {
        namePractitioner.firstName = name.firstName.join(' ');
      }

      if (name.lastName && !name.lastNameComposed) {
        namePractitioner.lastName = name.lastName;
      } else if (name.lastNameComposed) {
        const prefixLastName = name.lastNameComposed[0];
        const lastName = name.lastNameComposed[1];
        namePractitioner.lastName = `${prefixLastName} ${lastName}`;
      }

      accumulate = [...accumulate, name];

      return accumulate;
    }, []);

    const namePractitionersFormatted = practitionersName
      .filter((name) => name.firstName && name.lastName)
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`);

    const onlyUniquePractitioner = [...new Set(namePractitionersFormatted)];
    // console.log("onlyUniquePractitioner :", onlyUniquePractitioner);

    return onlyUniquePractitioner.map((name, idx) => <li key={idx}>{name}</li>);
  }

  render() {
    const { error, loading } = this.props;

    if (error) return <div>Error! {error.message}</div>;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Practitioners List</h1>
        <ul>{this.renderPractitioners()}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  practitioners: state.practitioners.items,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPractitioners: () => dispatch(fetchPractitioners()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PractitionerList);
