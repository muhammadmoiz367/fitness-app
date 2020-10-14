import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo'

function Steppers(props) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={props.onDecrement}>
                    <FontAwesome name="minus" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onIncrement}>
                    <FontAwesome name="plus" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{props.value}</Text>
                <Text>{props.unit}</Text>
            </View>
        </View>
    )
}

export default Steppers
