import { useAppDispatch } from "../../hooks";
import { clearTheBasket } from "../../store/notesSlice";
import DeletedNotes from "./DeletedNotes";

interface BasketProps {
  handleModal: (item: string, value: Boolean) => void;
  THEMES: Array<string>,
  rightIcon: (category: string) => any
}

const Basket: React.FC<BasketProps> = ({handleModal, THEMES, rightIcon}) => {

  const dispatch = useAppDispatch();

  return (
    <div id="basketModal" className="modal">
      <div className="modal__content basket">
        <div className="deleted-notes">
          <table>
            <thead className="deleted-notes__thead">
              <tr className="themes" id="basket__themes">
                {THEMES.map((item, index) => <th key={index}>{item}</th>)}
                <th key={6}></th>
              </tr>
            </thead>
            <DeletedNotes rightIcon={rightIcon}/>
          </table>
        </div>
        <div className="button__container">
          <button className="btn" id="clear-basket" onClick={() => dispatch(clearTheBasket(true))}>Clear the basket</button>
          <button className="btn" id="close-basket" onClick={() => handleModal("basket", true)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Basket;