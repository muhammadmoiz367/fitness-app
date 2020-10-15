import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import AddEntry from './views/addEntry';
import reducer from './redux/reducers'

const store=createStore(reducer)

function App (){
  return (
      <Provider store={store}>
          <View style={{flex: 1}}>
            <Text>Fitness app</Text>
            <AddEntry />
        </View>
      </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
