import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleDeleteNote,  } from "../../store/notesSlice";
import DateFnsAdapter from "@date-io/date-fns";

interface ArchivedNotesProps {
    rightIcon: (category: string) => any
}

const DeletedNotes: React.FC<ArchivedNotesProps> = ({rightIcon}) => {

    const dispatch = useAppDispatch();
    const dateFns = new DateFnsAdapter(); 

    const notes = useAppSelector(state => state.notes.list);
    const deletedNotes = notes.filter(note => note.deleted === true);

    const toFormatDate = (date: string): string => {
        const initialDateFnsDate = dateFns.date(date);
        let myDate = dateFns.format(initialDateFnsDate, "fullDate");
        return myDate
    }

    return (
        <tbody className="deleted-notes__tbody">
            {deletedNotes.map((noteRow, index) => <tr key={index}>
                <td>{rightIcon(noteRow.note.category)}{noteRow.note.name}</td>
                <td>{toFormatDate(noteRow.note.created)}</td>
                <td>{noteRow.note.category}</td>
                <td>{noteRow.note.content}</td>
                <td>{noteRow.note.dates}</td>
                <td>
                    <i className='fa-solid fa-trash-can-arrow-up fa-lg' 
                        title='pull out of the basket'
                        onClick={() => dispatch(toggleDeleteNote(noteRow.id))}
                    ></i>
                </td>
            </tr>)}
        </tbody>
    );
}
  
export default DeletedNotes;