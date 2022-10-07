import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable, Modal} from 'react-native';
import {NativeRouter, Route, Link, Routes} from 'react-router-native';

const Home = () => {
  const [text, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text style={styles.header} testID="HOME-PAGE">
        Home Page
      </Text>

      <Text>
        Lorem ipsum
      </Text>

      <TextInput
        testID="TEXT-INPUT"
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        testID="SUBMIT-BUTTON"
        onPress={() => setModalVisible(!modalVisible)}
      ><Text style={styles.textStyle}>Submit</Text></Pressable>

      <Modal  
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.redText]} testID="RESULT-TEXT">You have typed: {text}!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              testID="SUBMIT-MODAL"
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HelloWorld = () => (
  <Text style={styles.header} testID="HELLO-WORLD-PAGE">
    Hello World Page
  </Text>
);

export function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/" style={styles.navItem} testID="HOME">
            <Text style={styles.navItemText}>Home</Text>
          </Link>

          <Link
            to="/hello-world"
            style={styles.navItem}
            testID="HELLO-WORLD">
            <Text style={styles.navItemText}>Hello World</Text>
          </Link>
        </View>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello-world" element={<HelloWorld />} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
    color: '#000',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  navItemText: {
    color: '#000',
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
  input: {
    height: 50,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  redText: {
    color: "red",
  }
});
