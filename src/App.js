import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Forecast } from './pages/Forecast'
import { Start } from './pages/Start'

function App() {

  return (
    <div className="main-container">
      <header>
        <h1>PWA Weather App</h1>
        <ul>
          <li><a href="/start">Forside</a></li>
          <li><a href="/forecast">5 døgns prognose</a></li>
        </ul>
      </header>
      <Router>
        <Switch>
          <Route exact path="/start">
            <Start />
          </Route>
          <Route exact path="/forecast">
            <Forecast />
          </Route>
          <Route exact path="/">
            <Redirect to="/start" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
