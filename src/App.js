import {CurrencyConverter} from './pages/CurrencyConverter/CurrencyConverter'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import {Header} from "../src/components/common/Header/Header"
import './App.scss'

function App() {
  return (
		<Router>
			<div>
				<Header />
        <Switch>
					<Route path="/services">
						<div className="not-implemented">Not implemented</div>
          </Route>
					<Route path="/calculate-credit">
						<div className="not-implemented">Not implemented</div>
          </Route>
					<Route path="/currency-conversion">
						<CurrencyConverter />
          </Route>
					<Route path="/contacts">
						<div className="not-implemented">Not implemented</div>
          </Route>
					<Route path="/ask-question">
						<div className="not-implemented">Not implemented</div>
          </Route>
					<Route path="/">
						<div className="not-implemented">Not implemented</div>
          </Route>
        </Switch>
      </div>
		</Router>
  );
}

export default App;
