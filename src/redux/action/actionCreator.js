import * as actionType from './actionType'
import DBService from '../../storage/services'
import Note from '../../model/note'
import { DateFormat } from '../../util/dateFormat'
export function fetchNotes(){
    return (dispatch) =>{
        new Promise((resolve,reject)=>{
            try{
            var notes = DBService.objects("Note")
            let result = [];
            for (let item of notes) {
              let note = new Note(
                item.id,
                item.title,
                [],
                item.body,
                'Date',
                item.color,
              );
              if (item.label) {
                for (let label of item.label) {
                  note.label.unshift(label.name);
                }
              }
              note.created = DateFormat.toddMMyyyy(item.created);
              result.unshift({...note});
            }
            resolve(result)
        }catch(err){
            reject("Loi truy van: " + JSON.stringify(err.message))
        }
        }).then(notes => dispatch({type:actionType.FETCH_NOTES,notes})
        ).catch(message=>{
            console.log(message)
        })
    }
}
export function deleteNote(note){
    return (dispatch)=>{
        new Promise((resolve,reject)=>{
            try{
                DBService.delete('Note',note)
                resolve(note)
            }
            catch(err){
                reject("Loi truy van "+ err.message)
            }
        }).then(note=>dispatch({type:actionType.DELETE_NOTE,note}))
        .catch(message=>{
            console.log(message)
        })
    }
}
export function updateNote(note){
    return (dispatch)=>{
        new Promise((resolve,reject)=>{
            try {
                DBService.update('Note',note)
                resolve(note)
            } catch (err) {
                reject('Loi truy van :'+err.message)
            }
        }).then(note=>dispatch({type:actionType.UPDATE_NOTE,note}))
        .catch(message=>{
            console.log(message)
        })
    }
}
export function addNote(note){
    return (dispatch)=>{
        new Promise((resolve,reject)=>{
            try {
                DBService.insertOne('Note',note)
                resolve(note)
            } catch (error) {
                reject("Loi truy van :", error.message)
            }
        }).then(note=>dispatch({type:actionType.ADD_NOTES,note}))
        .catch(message=>{
            console.log(message)
        })
    }
}