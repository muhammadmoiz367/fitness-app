import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import AddEntry from './components/addEntry';

function App (){
  console.log('app running')
  return (
      <View>
        <AddEntry />
      </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
