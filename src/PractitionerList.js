import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';
import { Link } from "react-router-dom";

export class PractitionerList extends Component {
  renderPractitioners() {
    const { practitioners } = this.props;

    if (!practitioners || practitioners.length === 0) {
      return null;
    }

    const practitionersFiltered = practitioners.reduce((accumulate = [], practitioner) => {
      const { id, firstName, lastName } = practitioner;

      const practitionerFormatted = {
        id,
        firstName: firstName || null,
        lastName: lastName || null,
      };

      if (practitionerFormatted.firstName && practitionerFormatted.lastName) {
        accumulate = [...accumulate, practitionerFormatted];
      }

      return accumulate;
    }, []);

    const practitionersFormatted = practitionersFiltered.map(({ id, firstName, lastName }) => ({
      id,
      name: `${firstName} ${lastName}`,
    }));

    const onlyUniquePractitioner = uniqBy(practitionersFormatted, 'name');

    return onlyUniquePractitioner.map((practitioner) => (
      <li key={practitioner.id}><Link to={`/practitioner/${practitioner.id}`}>{practitioner.name}</Link></li>
    ));
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

export default PractitionerList;
