import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/Home';
import { Login } from './src/pages/Login';
import Routes from "./src/routes/"


export default function App() {
  return (
    <Routes/>
  );
}
