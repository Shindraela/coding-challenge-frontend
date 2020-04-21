import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PractitionerList from "./PractitionerList";
import PractitionerDetails from "./PractitionerDetails";
import { connect } from 'react-redux';
import { fetchPractitioners } from './actions/index';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPractitioners();
  }

  render() {
    const { practitioners } = this.props;

    return (
      <section className="App">
        <Router basename="">
          <Route exact path="/"><PractitionerList practitioners={practitioners} /></Route>
          <Route
            exact path="/practitioner/:id"
            render={(routeProps) => practitioners && practitioners.length > 0 && (
              <PractitionerDetails practitioner={practitioners.find(practitioner => routeProps.match.params.id === practitioner.id)} />
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