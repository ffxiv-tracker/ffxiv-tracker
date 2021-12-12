import { Route, Switch } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react"
import Header from './components/header';
import Links from './components/links';
import Home from './components/home';
import Tasks from './components/tasks/tasks';
import TasksTest from './components/tasks/tasks-test';
import ProtectedRoute from './components/protectedRoute';
import MasterTasks from './components/tasks/masterTasks';
import theme from "./theme"
import './App.css';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <div>
                <Header />
                <main>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/links" component={Links} />
                        <ProtectedRoute path="/tasks" component={Tasks} />
                        <ProtectedRoute path="/tasks-test" component={TasksTest} />
                        <ProtectedRoute path="/master-tasks" component={MasterTasks} />
                    </Switch>
                </main>
            </div>
        </ChakraProvider>
    );
}

export default App;
