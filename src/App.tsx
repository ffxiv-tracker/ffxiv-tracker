import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Links from './components/links';
import Splash from './components/splash';
import Tasks from './components/tasks/tasks';
import MasterTasks from './components/tasks/masterTasks';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route path="/" exact component={Splash} />
                    <Route path="/links" component={Links} />
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/master-tasks" component={MasterTasks} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
