import React from 'react'
import {View, Text } from 'react-native'
import Slider from '@react-native-community/slider';

function Sliders(props) {
    return (
        <View>
            <Slider
                value={props.value}
                minimumValue={0}
                maximumValue={props.max}
                step={props.step}
                onValueChange={props.onChange}
            />
            <View>
                <Text>{props.value}</Text>
                <Text>{props.unit}</Text>
            </View>
        </View>
    )
}

export default Sliders