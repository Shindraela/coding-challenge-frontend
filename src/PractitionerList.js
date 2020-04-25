import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';
import { connect } from 'react-redux';
import { fetchPractitioners } from './actions/index';
import { Link } from "react-router-dom";

export class PractitionerList extends Component {
  renderPractitioners() {
    const { practitioners } = this.props;

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

    const onlyUniquePractitioners = uniqBy(practitionersFormatted, 'name');
    
    return onlyUniquePractitioners && onlyUniquePractitioners.length > 0 ?
      <ul>
        {
        onlyUniquePractitioners.map((practitioner) => (
        <li key={practitioner.id}><Link to={`/practitioner/${practitioner.id}`}>{practitioner.name}</Link></li>
        ))}
      </ul> : <div>No Practitioners</div>;
  }

  getPreviousItems() {
    const {urlPreviousPage, fetchPractitioners } = this.props;

    fetchPractitioners(urlPreviousPage);
  }

  getNextItems() {
    const { urlNextPage, fetchPractitioners } = this.props;

    fetchPractitioners(urlNextPage);
  }

  render() {
    const { error, loading, urlPreviousPage, urlNextPage } = this.props;

    if (error) return <div>Error! {error.message}</div>;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Practitioners List</h1>
        {this.renderPractitioners()}
        {urlPreviousPage && <button type="button" onClick={() => this.getPreviousItems()}>Précedent</button>}
        {urlNextPage && <button type="button" onClick={() => this.getNextItems()}>Suivant</button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  urlNextPage: state.practitioners.urlNextPage,
  urlPreviousPage: state.practitioners.urlPreviousPage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPractitioners: (url) => dispatch(fetchPractitioners(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PractitionerList);
