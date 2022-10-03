import { useAppSelector } from "../../hooks";

interface SummeryProps {
  rightIcon: (category: string) => any
}

const Summary: React.FC<SummeryProps> = ({rightIcon}) => {

  const notes = useAppSelector(state => state.notes.list);

  const THEMES : Array<string> = ["Note Category", "Active", "Archived"];
  const CATEGORIES : Array<string> = ["Task", "Random Thought", "Idea"];

  const activeCategory = (category: string) : number => {
    let activeNotes = 0;
    notes.forEach(note => {
      if (note.active && note.note.category === category) {
        activeNotes += 1;
      }
    });
    return activeNotes;
  }

  const archivedCategory = (category: string) : number => {
    let archivedNotes = 0;
    notes.forEach(note => {
      if (note.archived && note.note.category === category) {
        archivedNotes += 1;
      }
    });
    return archivedNotes;
  }

  return(
    <div className="info">
        <table>
          <thead className="info__thead">
            <tr className="themes" id="info__themes">
              {THEMES.map((item, index) => <th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody className="info__tbody" id="notes-categories">
            {CATEGORIES.map((category, index) => <tr key={index}>
              <td>{rightIcon(category)}{category}</td>
              <td>{activeCategory(category)}</td>
              <td>{archivedCategory(category)}</td>
            </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}

export default Summary;