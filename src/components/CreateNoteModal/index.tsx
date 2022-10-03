import { useAppDispatch } from "../../hooks";
import { addNote } from "../../store/notesSlice";
import CategorySelect from "../CategorySelect";
import { useState } from "react";

interface CreateNoteModalProps {
    handleModal: (item: string, value: Boolean) => void;
    checkNoteForDates: (note : string) => string
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({handleModal, checkNoteForDates}) => {
    const dispatch = useAppDispatch();

    const [note, setNote] = useState({
        name: "",
        created: "",
        category: "Task",
        content: "",
        dates: ""
    });

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
        <div className="modal">
            <div className="modal__content">
                <span className="close" onClick={() => handleModal("create", true)}>&times;</span>
                <form className="form">
                    <label htmlFor="category-select">Choose a note category:</label>
                    <CategorySelect setNote={setNote} category={note.category} />
                    <br/>
                    <label htmlFor="name">
                        <input className="input-text" 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="The theme of note" 
                            onChange={(e) => inputChange(e.target.value, "name")}
                        required/>
                    </label><br/>
                    <textarea className="textarea" 
                        name="content" 
                        id="content" required 
                        placeholder="Enter your note..."
                        onChange={(e) => inputChange(e.target.value, "content")}    
                    ></textarea>
                    <div className="form__button">
                        <button type="submit" id="addNote" className="btn" 
                            onClick={() => {dispatch(addNote(note)); handleModal("create", true)}}
                        >Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
  
export default CreateNoteModal;