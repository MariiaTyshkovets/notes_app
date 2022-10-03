import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Note = {
    name: string,
    created: string,
    category: string,
    content: string,
    dates: string
};

type Rewrite = {
    rewriteId: string,
    note: Note
}

export type NoteRow = {
    id: string,
    note: Note,
    active: boolean,
    archived: boolean,
    deleted: boolean
};

type NotesState = {
    list: Array<NoteRow>;
};

const initialState : NotesState = {
    list: [
        {id: new Date("April 20, 2021").toISOString(), note: {name: "Shoping list", created: new Date("April 20, 2021").toISOString(), category: "Task", content: "Tomatoes, bread", dates: ""}, active: true, archived: false, deleted: false},
        {id: new Date("April 27, 2021").toISOString(), note: {name: "The theory of evolution", created: new Date("April 27, 2021").toISOString(), category: "Random Thought", content: "The evolution...", dates: ""}, active: true, archived: false, deleted: false},
        {id: new Date("May 05, 2021").toISOString(), note: {name: "New Feature", created: new Date("May 05, 2021").toISOString(), category: "Idea", content: "Implement new 03/05/2021, 05/05/2021", dates: "03/05/2021, 05/05/2021"}, active: true, archived: false, deleted: false},
        {id: new Date("May 14, 2021").toISOString(), note: {name: "Books", created: new Date("May 14, 2021").toISOString(), category: "Task", content: "Frontend", dates: ""}, active: true, archived: false, deleted: false},
        {id: new Date("December 20, 2021").toISOString(), note: {name: "Shoping list", created: new Date("December 20, 2021").toISOString(), category: "Task", content: "Toys, presents", dates: ""}, active: true, archived: false, deleted: false},
        {id: new Date("April 10, 2022").toISOString(), note: {name: "The love", created: new Date("April 10, 2022").toISOString(), category: "Random Thought", content: "Love is kind and hopefull", dates: ""}, active: true, archived: false, deleted: false},
        {id: new Date("June 21, 2022").toISOString(), note: {name: "New project", created: new Date("June 21, 2022").toISOString(), category: "Idea", content: "Create the app with Redux Toolkit", dates: ""}, active: true, archived: false, deleted: false}
    ]
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<Note>) {
            if (action.payload.content.length > 0 || action.payload.name.length > 0) {
                state.list.push({
                    id: new Date().toISOString(),
                    note: {
                        name: action.payload.name, 
                        created: new Date().toISOString(),
                        category: action.payload.category,
                        content: action.payload.content,
                        dates: action.payload.dates
                    },
                    active: true,
                    archived: false,
                    deleted: false
                })
            }
        },
        rewriteNote(state, action: PayloadAction<Rewrite>) {
            const note = state.list.find(note => note.id === action.payload.rewriteId);
            if (note) {
                note.note.category = action.payload.note.category;
                note.note.content = action.payload.note.content;
                note.note.created = new Date().toISOString();
                note.note.dates = action.payload.note.dates;
                note.note.name = action.payload.note.name;
            }
            state.list = state.list.sort((a, b) : any => {
                let dateA : number = new Date(a.note.created).valueOf();
                let dateB : number = new Date(b.note.created).valueOf();
                return dateA - dateB;
            });
        },
        toggleArchiveNote(state, action: PayloadAction<string>) {
            const archivedNote = state.list.find(note => note.id === action.payload);
            if (archivedNote) {
                archivedNote.archived = !archivedNote.archived;
                archivedNote.active = !archivedNote.active;
            }
        },
        toggleDeleteNote(state, action: PayloadAction<string>) {
            const deletedNote = state.list.find(note => note.id === action.payload);
            if (deletedNote) {
                deletedNote.deleted = !deletedNote.deleted;
                deletedNote.active = !deletedNote.active;
            }
        },
        clearTheBasket(state, action: PayloadAction<boolean>) {
            if (action) {
                state.list = state.list.filter(note => note.deleted === false)
            }
        }
    }
});

export const { addNote, rewriteNote, toggleArchiveNote, toggleDeleteNote, clearTheBasket } = notesSlice.actions;

export default notesSlice.reducer;