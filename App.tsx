import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';
import dbInit from './src/database/dbInit';

export default function App() {

  const db:dbInit = new dbInit()
  db.DbInit()

  return (
    <NativeBaseProvider>
      <StatusBar
      style='inverted'
      backgroundColor='transparent'
      translucent />
      <Routes />
    </NativeBaseProvider>
  );
}

