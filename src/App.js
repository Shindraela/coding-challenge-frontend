import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchPractitioners } from './actions/index';
import PractitionerList from "./PractitionerList";
import PractitionerPage from "./PractitionerPage";
import './App.css';
import './Tablet.css';
import './Laptop.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPractitioners();
  }

  render() {
    const { practitioners } = this.props;

    return (
      <section className="container-fluid">
        <Router basename="">
          <Route exact path="/"><PractitionerList practitioners={practitioners} /></Route>
          <Route
            exact path="/practitioner/:id"
            render={(routeProps) => practitioners && practitioners.length > 0 && (
              <PractitionerPage practitioner={practitioners.find(practitioner => routeProps.match.params.id === practitioner.id)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);