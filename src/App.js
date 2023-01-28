import Container from "./componenets/Container";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <div className="container mt-2">
      <WeatherProvider>
        <Container />
      </WeatherProvider>
    </div>
  );
}

export default App;
