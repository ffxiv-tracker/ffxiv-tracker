import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Links from './components/links';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    {/* <Route path="/" exact component={Home} /> */}
                    <Route path="/links" component={Links} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
