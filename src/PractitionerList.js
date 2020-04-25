import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';
import { connect } from 'react-redux';
import { fetchPractitioners } from './actions/index';
import { Link } from "react-router-dom";

export class PractitionerList extends Component {
  constructor() {
    super();

    this.state = {
      term: ''
    }
  }

  componentDidMount() {
    this.props.fetchPractitioners();
  }

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
      <div className="row">
        <ul>
          {
          onlyUniquePractitioners.map((practitioner) => (
          <li key={practitioner.id}><Link to={`/practitioner/${practitioner.id}`}>{practitioner.name}</Link></li>
          ))}
        </ul>
      </div> : <div className="row">Pas de praticiens sur cette page.</div>;
  }

  getPreviousItems() {
    const {urlPreviousPage, fetchPractitioners } = this.props;
    fetchPractitioners(urlPreviousPage);
  }

  getNextItems() {
    const { urlNextPage, fetchPractitioners } = this.props;
    fetchPractitioners(urlNextPage);
  }

  handleTermSearch(term) {
    const { fetchPractitioners } = this.props;
    const searchUrl = `http://hapi.fhir.org/baseDstu3/Practitioner?given=${term}&_format=json&_pretty=true`;
    
    this.setState({
      term
    });

    return term ? fetchPractitioners(searchUrl) : fetchPractitioners();
  }

  render() {
    const { error, loading, urlPreviousPage, urlNextPage } = this.props;
    const { term } = this.state;

    if (error) return <div>Error! {error.message}</div>;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <section className="container">
        <h1>Liste des praticiens</h1>
        <div className="row">
          <span>Recherchez un nom :</span>
          <input name="term" type="text" value={term} onChange={(e) => this.handleTermSearch(e.target.value)} />
        </div>

        {this.renderPractitioners()}
        <div className="row position-btn">
          {urlPreviousPage && <button type="button" className="btn btn-primary" onClick={() => this.getPreviousItems()}>Précedent</button>}
          {urlNextPage && <button type="button" className="btn btn-primary" onClick={() => this.getNextItems()}>Suivant</button>}
        </div>
      </section>
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
