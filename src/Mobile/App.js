import { createStackNavigator, createAppContainer } from 'react-navigation'
import ConnectPage from './pages/connect/connect'
import SchoolPage from './pages/school/school'

const MainNavigator = createStackNavigator({
    Connect: ConnectPage,
    School: SchoolPage
});

const App = createAppContainer(MainNavigator);

export default App;