import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Links from './components/links';
import Home from './components/home';
import Login from './components/login';
import Tasks from './components/tasks/tasks';
import ProtectedRoute from './components/protectedRoute';
import MasterTasks from './components/tasks/masterTasks';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/links" component={Links} />
                    <ProtectedRoute path="/tasks" component={Tasks} />
                    <ProtectedRoute path="/master-tasks" component={MasterTasks} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
