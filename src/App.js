import React from 'react'
import { CssBaseline } from '@material-ui/core';
import './App.css'
import {Route} from 'react-router-dom'
import MultistepForm from './components/MultistepForm';

function App() {
  return (
    <div>
      <Route path='/' component={MultistepForm} />
      <CssBaseline />
    </div>
  );
}

export default App;
