import { defineStore } from 'pinia'
import { collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy } from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionQuery 
let notesCollectionRef

let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init(){
      const storeAuth = useStoreAuth()
      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false

      if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from any active listener

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          };
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = true
      }, error => {
        console.log('error message:', error.message)
      })
    },
    clearNotes(){
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() // unsubscribe from active listener on logout
    },
    async addNote(newNoteContent) {
      let date = new Date().getTime().toString()

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async updateNote(savedNoteContent, id) {
      await updateDoc(doc(notesCollectionRef, id), {
        content: savedNoteContent
    })
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note =>  note.id == id)[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
     return state.notes.reduce((a, b) => a += b.content.length, 0)
    }
  }
})