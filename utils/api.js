import AsyncStorage from '@react-native-community/async-storage';
import {CALENDAR_STORAGE_KEY} from './calender'

export function submitActivity({key, entry}){
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeActivity(key){
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(result=>{
            const data=JSON.parse(result);
            data[key]=undefined;
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
        })
}
