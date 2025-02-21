import { AppRegistry } from "react-native";
import Main from "../Components/MainComponent";   
import appConfig from "../app.json";
const appName = appConfig.expo.name;



const App = () => <Main />;


AppRegistry.registerComponent(appName, () => App);
export default App;
