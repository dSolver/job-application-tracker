import './App.css';

import { Stack } from '@mui/material';
import React from 'react';

import { Dashboard } from './components/dashboard';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Stack direction={'column'}>
        <Header title={'Applications Manager'} />
        <Dashboard />
      </Stack>
    </div>
  );
}

export default App;
