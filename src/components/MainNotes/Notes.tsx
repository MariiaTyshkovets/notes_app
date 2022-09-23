import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleArchiveNote, toggleDeleteNote } from "../../store/notesSlice";
import DateFnsAdapter from "@date-io/date-fns";

interface NotesProps {
    rightIcon: (category: string) => any;
    openRewriteModal: (id: string) => void
}

const Notes: React.FC<NotesProps> = ({rightIcon, openRewriteModal}) => {

    const dispatch = useAppDispatch();
    const dateFns = new DateFnsAdapter(); 

    const notes = useAppSelector(state => state.notes.list);
    const mainNotes = notes.filter(note => note.active === true);

    const toFormatDate = (date: string): string => {
        const initialDateFnsDate = dateFns.date(date);
        let myDate = dateFns.format(initialDateFnsDate, "fullDate");
        return myDate;
    }

    return (
        <tbody className="table-notes__tbody" id="main-notes">
            {mainNotes.map((noteRow, index) => <tr key={index}>
                <td>{rightIcon(noteRow.note.category)}{noteRow.note.name}</td>
                <td>{toFormatDate(noteRow.note.created)}</td>
                <td>{noteRow.note.category}</td>
                <td>{noteRow.note.content}</td>
                <td>{noteRow.note.dates}</td>
                <td>
                    <i className='fa-solid fa-pen fa-lg' title='rewrite' onClick={() => openRewriteModal(noteRow.id)}></i>
                    <i className='fa-solid fa-box-archive fa-lg' title='to archive' onClick={() => dispatch(toggleArchiveNote(noteRow.id))}></i>
                    <i className='fa-solid fa-trash fa-lg' title='remove' onClick={() => dispatch(toggleDeleteNote(noteRow.id))}></i>
                </td>
            </tr>)}
        </tbody>
    );
}
  
export default Notes;