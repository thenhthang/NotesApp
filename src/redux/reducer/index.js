import notes from './notesReducer'
import user from './userReducer'
import {combineReducers} from 'redux'

const rootReducer =  combineReducers({
    notes,user
})
export default rootReducer


