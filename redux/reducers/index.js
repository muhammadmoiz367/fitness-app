import {ADD_ENTRY, RECEIVE_ENTRIES} from '../constants'

const Entries=(state={}, action)=>{
    switch(action.type){
        case RECEIVE_ENTRIES:
            return{
                ...state,
                ...action.entries
            }
        case ADD_ENTRY:
            return{
                ...state,
                ...action.entry
            }
        default:
            return state
    }
}

export default Entries