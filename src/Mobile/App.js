import { createStackNavigator, createAppContainer } from 'react-navigation'
import ConnectPage from './pages/connect/connect'
import LoginPage from './pages/login/login'
import SchoolPage from './pages/school/school'
import LogPage from './pages/log/log'

const MainNavigator = createStackNavigator({
    Connect: ConnectPage,
    Login: LoginPage,
    School: SchoolPage,
    Log: LogPage
});

const App = createAppContainer(MainNavigator);

export default App;
