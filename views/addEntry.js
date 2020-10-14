import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import DateHeader from '../components/date';
import ResetButton from '../components/resetBtn';
import Sliders from '../components/slider';
import Steppers from '../components/steppers';
import {getMetricMetaInfo, timeToString} from '../utils/helpers'

const SubmitButton =({ onPress })=>{
    return(
        <TouchableOpacity style={{backgroundColor: 'red', padding: 5, width: 100, marginLeft: 150}} onPress={onPress} >
            <Text style={{textAlign: 'center', color: 'white'}}>
                Submit
            </Text>
        </TouchableOpacity>
    )
}

function AddEntry(props) {
    const [state, setState]=useState({
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    });
    const increment=(metric)=>{
        const {max, step}=getMetricMetaInfo(metric);
        setState(prevState=>{
            const count=prevState[metric] + step;
            return{
                ...prevState,
                [metric]: count > max ? max : count
            }
        })
    }
    const decrement=(metric)=>{
        const {step}= getMetricMetaInfo(metric)
        setState(prevState=>{
            const count=prevState[metric]-step;
            return{
                ...prevState,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    const slide=(metric, value)=>{
        setState((prevState)=>{
            return{
                ...prevState,
                [metric]: value
            }
        })
    }
    const submit=()=>{
        const key=timeToString();
        
        setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })
    }
    const reset=()=>{
        const key=timeToString();
    }
    if(props.loggedIn){
        return(
            <View>
                <Ionicons name="checkmark-circle-outline" size={100} />
                <Text>You already created activity for today</Text>
                <ResetButton onPress={reset}>
                    Reset
                </ResetButton>
            </View>
        )
    }

    console.log(state)
    const metaInfo=getMetricMetaInfo();
    const date=(new Date()).toLocaleDateString();
    return (
        <View>
            <DateHeader date={date} />
            {Object.keys(metaInfo).map((metric)=>{
                const {type, getIcon, ...rest}=metaInfo[metric];
                const value=state[metric];
                return(
                    <View key={metric}>
                        {getIcon()}
                        {type==='stepper'
                            ? <Steppers value={value} onIncrement={()=>increment(metric)} onDecrement={()=>decrement(metric)} {...rest} />
                            : <Sliders value={value} onChange={(val)=>slide(metric, val)} {...rest} />
                        }
                    </View>
                )
            })}
            <SubmitButton onPress={submit} />
        </View>
    )
}

export default AddEntry
