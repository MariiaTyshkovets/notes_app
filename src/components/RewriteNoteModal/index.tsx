import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { rewriteNote } from "../../store/notesSlice";
import CategorySelect from "../CategorySelect";


interface RewriteNoteModalProps {
  handleModal: (item: string, value: Boolean) => void,
  rewriteId: string,
  checkNoteForDates: (note : string) => string
}

const RewriteNoteModal: React.FC<RewriteNoteModalProps> = ({handleModal, rewriteId, checkNoteForDates}) => {

  const dispatch = useAppDispatch();
  const notes = useAppSelector(state => state.notes.list);

  const [note, setNote] = useState({name: "", created: "", category: "Task", content: "", dates: ""})

  const findNote = notes.find(note => note.id === rewriteId);

  useEffect(() => {
    if (findNote) {
      setNote({
        name: findNote.note.name,
        created: findNote.note.created,
        category: findNote.note.category,
        content: findNote.note.content,
        dates: findNote.note.dates
      });
    }
  }, []);

  const inputChange = (value: string, name: string) => {
    let content = "content" ? value : note.content;
    setNote((prevState) => {
        return {
            ...prevState,
            [name]: value,
            dates: checkNoteForDates(content),  
        }
    })
  }

  return (
    <div id="rewriteModal" className="modal">
      <div className="modal__content">
        <span className="close" id="cancel" onClick={() => handleModal("rewrite", true)}>&times;</span>
        <form className="form">
          <label htmlFor="category-select">Choose a note category:</label>
          <CategorySelect setNote={setNote} category={note.category}/>
          <br/>
          <label htmlFor="name">
            <input className="input-text" 
              type="text" 
              name="name" 
              id="rewrite-name" 
              placeholder="The theme of note"
              value={note.name} 
              onChange={(e) => inputChange(e.target.value, "name")}
            required/>
          </label><br/>
          <textarea className="textarea" 
            name="note" 
            id="rewrite-note" 
            required 
            placeholder="Enter your note..."
            value={note.content}
            onChange={(e) => inputChange(e.target.value, "content")}
          ></textarea>
          <div className="form__button">
            <button 
              type="submit" 
              id="rewrite-btn" 
              className="btn" 
              onClick={() => {dispatch(rewriteNote({rewriteId, note})); handleModal("rewrite", true)}}
            >Update Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
  
export default RewriteNoteModal;