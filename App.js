import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import AddEntry from './views/addEntry';

function App (){
  return (
      <View>
        <Text>Fitness app</Text>
        <AddEntry />
      </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
