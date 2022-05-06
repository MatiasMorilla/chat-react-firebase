import './App.css';
import AppRouter from './appRouter/appRouter';
import { UserProvider } from './components/context/userProvider';

function App() {
  return (
    <div className="App">
      <UserProvider>
          <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
