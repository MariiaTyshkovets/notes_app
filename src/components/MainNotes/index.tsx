import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks";
// import { toArchiveNote, toDeleteNote } from "../../store/notesSlice";
import Archive from "../Archive";
import Basket from "../Basket";
import CreateNoteModal from "../CreateNoteModal";
import RewriteNoteModal from "../RewriteNoteModal";
import Notes from "./Notes";
// import RewriteNoteModal from "../RewriteNoteModal";

interface MainNotesProps {
  rightIcon: (category: string) => any
}

const MainNotes: React.FC<MainNotesProps> = ({rightIcon}) => {

  const [isModalOpen, setIsModalOpen] = useState({
    create: false,
    basket: false,
    archive: false,
    rewrite: false
  });
  const [rewriteId, setRewriteId] = useState("")
 
  const THEMES : Array<string> = ["Name", "Created", "Category", "Content", "Dates"];
  
  const handleModal = (item: string, value: Boolean): void => {
    setIsModalOpen((prevState) => {
      return {
        ...prevState,
        [item]: !value
      }
    })
  }

  const openRewriteModal = (id: string): void => {
    setRewriteId(id);
    handleModal("rewrite", isModalOpen.rewrite);
  }

  const checkNoteForDates = (note : string) : string => {
    const pattern = new RegExp("(([0-2][0-9]|(3)[0-1])(-|/|.)(((0)[0-9])|((1)[0-2]))(-|/|.)([0-9][0-9][0-9][0-9]))|((((0)[0-9])|((1)[0-2]))(-|/|.)([0-2][0-9]|(3)[0-1])(-|/|.)([0-9][0-9][0-9][0-9]))", "g");
    let match = note.match(pattern);
    let dates = "";
    if (match?.length) {
        dates = match.toString().replace(/,/g, ", ");
    }
    return dates; 
  }

  return (
    <div className="notes">
      <table className="notes__table">
        <thead className="notes__thead">
          <tr className="themes" id="notes__themes">
            {THEMES.map((item, index) => <th key={index}>{item}</th>)}
            <th key={6}>
              <button className='open-archive' onClick={() => handleModal("archive", isModalOpen.archive)}>
                <i className='fa-solid fa-box-archive fa-lg' title='archive'></i>
              </button>
              <button className='open-basket' onClick={() => handleModal("basket", isModalOpen.basket)}>
                <i className='fa-solid fa-trash fa-lg' title='basket'></i>
              </button>
            </th>
          </tr>
        </thead>
        <Notes rightIcon={rightIcon} openRewriteModal={openRewriteModal}/>
      </table>
      <button className="btn" id="create" onClick={() => handleModal("create", isModalOpen.create)}>Create Note</button>
      {isModalOpen.create ? <CreateNoteModal handleModal={handleModal} checkNoteForDates={checkNoteForDates}/> : undefined}
      {isModalOpen.rewrite ? <RewriteNoteModal handleModal={handleModal} rewriteId={rewriteId} checkNoteForDates={checkNoteForDates}/> : undefined}
      {isModalOpen.archive ? <Archive handleModal={handleModal} THEMES={THEMES} rightIcon={rightIcon}/> : undefined}
      {isModalOpen.basket ? <Basket handleModal={handleModal} THEMES={THEMES} rightIcon={rightIcon}/> : undefined}
    </div>
  );
}
  
export default MainNotes;
