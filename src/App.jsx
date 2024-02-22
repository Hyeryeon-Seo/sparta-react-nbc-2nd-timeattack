import { Provider } from "react-redux";
import store from "./app/store";
import Router from "./route/Router";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
