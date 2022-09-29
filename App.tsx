import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NativeRouter, Route, Link, Routes } from "react-router-native";

const Home = () => <Text style={styles.header} accessibilityLabel="HOME-PAGE">Home Page</Text>;

const HelloWorld = () => <Text style={styles.header} accessibilityLabel="HELLO-WORLD-PAGE">Hello World Page</Text>;

export function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
            <Link to="/" style={styles.navItem} accessibilityLabel="HOME"> 
                <Text style={styles.navItemText}>Home</Text>
            </Link>
          
            <Link to="/hello-world" style={styles.navItem} accessibilityLabel="HELLO-WORLD"> 
                <Text style={styles.navItemText}>Hello World</Text>
            </Link>
          
        </View>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello-world" element={<HelloWorld />} />
        </Routes>

      </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20,
    color: "#000",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    backgroundColor: "#eee",
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  navItemText: {
    color: "#000",
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});