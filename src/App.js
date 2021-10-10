import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import CountryDetails from './containers/CountryDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/country/:countryId" component={CountryDetails} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
