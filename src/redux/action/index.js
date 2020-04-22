import {fetchNotes,deleteNote,addNote,updateNote} from './notesCreator'
import {fetchLabel,addlabel,deleteAll} from './labelCreator'

const allActions = {
    fetchNotes,
    deleteNote,
    addNote,
    updateNote,
    fetchLabel,
    addlabel,
    deleteAll
}
export default allActions