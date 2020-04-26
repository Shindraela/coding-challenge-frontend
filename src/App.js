import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchPractitioners } from './actions/index';
import PractitionerList from "./components/PractitionerList";
import PractitionerPage from "./components/PractitionerPage";
import { withTranslation } from 'react-i18next';
import france_icon from './assets/france_icon.png';
import uk_icon from './assets/uk_icon.png';
import './css/App.css';
import './css/Tablet.css';
import './css/Laptop.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPractitioners();
  }

  render() {
    const { practitioners, i18n, t } = this.props;

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
      <section className="container-fluid">
        <div className="row d-flex flex-row-reverse">
          <button type="button" className="btn btn-link lng-btn" onClick={() => changeLanguage("fr")}>
            <img src={france_icon} alt="france icon" />
          </button>
          <button type="button" className="btn btn-link lng-btn" onClick={() => changeLanguage("en")}>
            <img src={uk_icon} alt="uk icon" />
          </button>
        </div>
        <Router basename="">
          <Route exact path="/"><PractitionerList practitioners={practitioners} i18n={i18n} t={t} /></Route>
          <Route
            exact path="/practitioner/:id"
            render={(routeProps) => practitioners && practitioners.length > 0 && (
              <PractitionerPage practitioner={practitioners.find(practitioner => routeProps.match.params.id === practitioner.id)} i18n={i18n} t={t} />
            )}
          />
        </Router>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  practitioners: state.practitioners.items,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPractitioners: () => dispatch(fetchPractitioners()),
});

const translationComponent = withTranslation()(App);
export default connect(mapStateToProps, mapDispatchToProps)(translationComponent);