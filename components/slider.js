import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider';
import {gray} from '../utils/colors'

function Sliders(props) {
    return (
        <View style={styles.row}>
            <Slider
                style={{flex: 1}}
                value={props.value}
                minimumValue={0}
                maximumValue={props.max}
                step={props.step}
                onValueChange={props.onChange}
            />
            <View style={styles.metricCounter} >
                <Text style={{fontSize: 24, textAlign: 'center'}} >{props.value}</Text>
                <Text style={{fontSize: 18, color: gray}} >{props.unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    metricCounter: {
      width: 85,
      justifyContent: 'center',
      alignItems: 'center'
    },
  })

export default Sliders