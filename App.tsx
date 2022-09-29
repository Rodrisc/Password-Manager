import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';





export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
      style='auto'
      backgroundColor='transparent'
      translucent />
      <Routes />
    </NativeBaseProvider>
  );
}

