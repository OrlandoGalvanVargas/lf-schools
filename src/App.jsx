import { Toaster } from 'react-hot-toast';
import { Router } from './features/routing/Router';

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
