import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import {connect} from 'react-redux';
import DateHeader from '../components/date';
import TextButton from '../components/resetBtn';
import Sliders from '../components/slider';
import Steppers from '../components/steppers';
import { removeActivity, submitActivity } from '../utils/api';
import {getMetricMetaInfo, timeToString, getDailyEntryRemainder} from '../utils/helpers'
import {addEntry} from '../redux/actions/index'
import {white, purple} from '../utils/colors'


const SubmitButton =({ onPress })=>{
    return(
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn} onPress={onPress} >
            <Text style={styles.submitBtnText} >
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
        const entry=state;

        setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        });

        props.dispatch(addEntry({
            [key]: entry
        }))
        submitActivity(key, entry)
    }
    const reset=()=>{
        const key=timeToString();

        props.dispatch(addEntry({
            [key]: getDailyEntryRemainder()
        }))

        removeActivity(key)
    }
    if(props.loggedIn){
        return(
            <View style={styles.center}>
                <Ionicons name="checkmark-circle-outline" size={100} color="green" />
                <Text>You already created activity for today</Text>
                <TextButton onPress={reset}>
                    Reset
                </TextButton>
            </View>
        )
    }

    console.log(state)
    const metaInfo=getMetricMetaInfo();
    const date=(new Date()).toLocaleDateString();
    return (
        <View style={styles.container}>
            <DateHeader date={date} />
            {Object.keys(metaInfo).map((metric)=>{
                const {type, getIcon, ...rest}=metaInfo[metric];
                const value=state[metric];
                return(
                    <View key={metric} style={styles.row} >
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
  })

const mapStateToProps=(state)=>{
    const key=timeToString();
    return{
        loggedIn: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry);
