interface CategorySelectProps {
    setNote: React.Dispatch<React.SetStateAction<{
        name: string;
        created: string;
        category: string;
        content: string;
        dates: string;
    }>>,
    category: string
}

const CategorySelect: React.FC<CategorySelectProps> = ({setNote, category}) => {

    const changeSelect = (value: string) => {
        setNote((prevState) => {
            return{
                ...prevState, 
                category: value
            }
        })
    }

    return (
        <select className="category-select" 
            name="category-select" 
            id="category-select" 
            onChange={(e) => changeSelect(e.target.value)}
            value={category}
        >
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
        </select>        
    );
}
  
export default CategorySelect;