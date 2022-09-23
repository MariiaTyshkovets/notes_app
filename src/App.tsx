import MainNotes from "./components/MainNotes";
import Summary from "./components/Summary";

function App() {

  const rightIcon = (category: string) : any => {
    let icon = "";
    switch (category) {
        case "Task":
            icon = "fa-basket-shopping";
            break;
        case "Random Thought":
            icon = "fa-brain";
            break;
        default:
            icon = "fa-lightbulb";
            break;
    }

    return <i className={`fa-solid ${icon} fa-lg`}></i>
  }

  return (
    <div className="wrapper">
      <MainNotes rightIcon={rightIcon}/>
      <Summary rightIcon={rightIcon}/>
    </div>
  );
}

export default App;
