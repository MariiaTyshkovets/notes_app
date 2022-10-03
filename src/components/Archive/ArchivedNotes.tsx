import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleArchiveNote } from "../../store/notesSlice";
import DateFnsAdapter from "@date-io/date-fns";

interface ArchivedNotesProps {
    rightIcon: (category: string) => any
}

const ArchivedNotes: React.FC<ArchivedNotesProps> = ({rightIcon}) => {

    const dispatch = useAppDispatch();
    const dateFns = new DateFnsAdapter(); 

    const notes = useAppSelector(state => state.notes.list);
    const archivedNotes = notes.filter(note => note.archived === true);

    const toFormatDate = (date: string): string => {
        const initialDateFnsDate = dateFns.date(date);
        let myDate = dateFns.format(initialDateFnsDate, "fullDate");
        return myDate
    }

    return (
        <tbody className="archived-notes__tbody" id="archived-notes">
            {archivedNotes.map((noteRow, index) => <tr key={index}>
                <td>{rightIcon(noteRow.note.category)}{noteRow.note.name}</td>
                <td>{toFormatDate(noteRow.note.created)}</td>
                <td>{noteRow.note.category}</td>
                <td>{noteRow.note.content}</td>
                <td>{noteRow.note.dates}</td>
                <td>
                    <i className='fa-solid fa-file-arrow-up fa-lg' 
                        title='unarchive the note' 
                        onClick={() => dispatch(toggleArchiveNote(noteRow.id))}
                    ></i>
                </td>
            </tr>)}
        </tbody>
    );
}
  
export default ArchivedNotes;