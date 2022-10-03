import ArchivedNotes from "./ArchivedNotes";

interface ArchiveProps {
  handleModal: (item: string, value: Boolean) => void,
  THEMES: Array<string>,
  rightIcon: (category: string) => any
}

const Archive: React.FC<ArchiveProps> = ({handleModal, THEMES, rightIcon}) => {

  return (
    <div className="modal">
      <div className="modal__content archive">
        <div className="archived-notes">
          <table>
            <thead className="archived-notes__thead">
              <tr className="themes">
                {THEMES.map((item, index) => <th key={index}>{item}</th>)}
                <th key={6}></th>
              </tr>
            </thead>
            <ArchivedNotes rightIcon={rightIcon} />
          </table>
        </div>
        <div className="button__container">
          <button className="btn" id="close-archive" onClick={() => handleModal("archive", true)}>Close</button>
        </div>
      </div>
    </div>
  );
}
  
export default Archive;