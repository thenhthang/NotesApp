import * as actionType from '../action/actionType'

export default function notes(state = [],action){
    switch(action.type){
        case actionType.FETCH_NOTES:{
            return action.notes
        }
        case actionType.ADD_NOTES:{
            let note = action.note
            let newnotes = [note,...state]
            return newnotes
        }
        case actionType.DELETE_NOTE:{
            let note = action.note
            let newnotes = state.filter((item,index)=>{
                if(item.id != note.id){
                    return true
                }
                else{
                    return false
                }
            })
            return newnotes
        }
        case actionType.UPDATE_NOTE:{
            let note = action.note
            let newnotes = state.map((item)=>{
                if(item.id === note.id){
                    return {...item,body:note.body,color:note.color,label:note.label,title:note.title}
                }
                else{
                    return item
                }
            })
            return newnotes
        }
        default:{
            return state
        }
    }
}