import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Links from './components/links';
import Splash from './components/splash';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

function App() {
    return (
        <div className="grey lighten-5 full-height">
            <Header />
            <main>
                <Switch>
                    <Route path="/" exact component={Splash} />
                    <Route path="/links" component={Links} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
