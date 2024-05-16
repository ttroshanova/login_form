import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import { ContextProvider } from './components/UserContext';
import './App.css'
import { Suspense, lazy } from 'react';
import DotLoader from "react-spinners/DotLoader";
const LazyTable = lazy(() => import('./components/Table'))

function App() {
  return (
    <div className='app'>
      <ContextProvider>
          <Router>
            <Routes>
                <Route path='/' element={<Form/>}/>
                <Route path='/table' element={
                <Suspense fallback={<DotLoader color="#36d7b7"/>}>
                  <LazyTable/>
                </Suspense>}/>
            </Routes>
          </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
