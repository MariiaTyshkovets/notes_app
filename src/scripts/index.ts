import DateFnsAdapter from "@date-io/date-fns";
export {};

const THEMES1 : Array<string> = ["Name", "Created", "Category", "Content", "Dates", "<button class='open-archive'><i class='fa-solid fa-box-archive fa-lg'></i></button> <button class='open-basket'><i class='fa-solid fa-trash fa-lg'></i></button>"];
const THEMES2 : Array<string> = ["Note Category", "Active", "Archived"];
const ARCHIVE : Array<string> = ["Name", "Created", "Category", "Content", "Dates", ""];
const DELETEDNOTES : Array<string> = ["Name", "Created", "Category", "Content", "Dates", ""];
 
const themesOfNotes = (document.getElementById("notes__themes")) as HTMLTableRowElement;
const themesOfCatelories = (document.getElementById("info__themes")) as HTMLTableRowElement;
const themesOfArchive = (document.getElementById("archive__themes")) as HTMLTableRowElement;
const themesOfBasket = (document.getElementById("basket__themes")) as HTMLTableRowElement;

function createThOrTd (content: string, tag: HTMLTableRowElement, element: string) {
    let el = document.createElement(element);
    el.innerHTML = content;
    tag.appendChild(el);
}

THEMES1.forEach((theme) => {
    createThOrTd(theme, themesOfNotes, "th");
})

THEMES2.forEach((theme) => {
    createThOrTd(theme, themesOfCatelories, "th");
})

ARCHIVE.forEach((theme) => {
    createThOrTd(theme, themesOfArchive, "th");
})

DELETEDNOTES.forEach((theme) => {
    createThOrTd(theme, themesOfBasket, "th");
})

const mainNotes = (document.getElementById("main-notes")) as HTMLElement;
const deletedNotes = (document.getElementById("deleted-notes")) as HTMLElement;
const archivedNotes = (document.getElementById("archived-notes")) as HTMLElement;
const lastColumn : string = "<i class='fa-solid fa-pen fa-lg' title='rewrite'></i> <i class='fa-solid fa-box-archive fa-lg' title='to archive'></i> <i class='fa-solid fa-trash fa-lg' title='remove'></i>";
const modal = document.getElementById("myModal") as HTMLDivElement;
const rewriteModal = document.getElementById("rewriteModal") as HTMLDivElement;
const archiveModal = document.getElementById("archiveModal") as HTMLDivElement;
const basketModal = document.getElementById("basketModal") as HTMLDivElement;
const btn = document.getElementById("create") as HTMLButtonElement;
const span = document.querySelector(".close") as HTMLSpanElement;
const spanCancel = document.getElementById("cancel") as HTMLSpanElement;
const btnOpenBasket = document.querySelector(".open-basket") as HTMLButtonElement;
const btnOpenArchive = document.querySelector(".open-archive") as HTMLButtonElement;
const btnClearBasket = document.getElementById("clear-basket") as HTMLButtonElement;
const btnCloseBasket = document.getElementById("close-basket") as HTMLButtonElement;
const btnCloseArchive = document.getElementById("close-archive") as HTMLButtonElement;
const addNoteBtn = document.getElementById("addNote") as HTMLButtonElement;
const updateNoteBtn = document.getElementById("rewrite-btn") as HTMLButtonElement;
const theme = document.getElementById("name") as HTMLInputElement;
const rewriteTheme = document.getElementById("rewrite-name") as HTMLInputElement;
const note = document.getElementById("note") as HTMLTextAreaElement;
const rewriteNote = document.getElementById("rewrite-note") as HTMLTextAreaElement;
const select = document.getElementById("category-select") as HTMLSelectElement;
const rewriteSelect = document.getElementById("rewrite-select") as HTMLSelectElement;
const contentOfTable = [
    ["<i class='fa-solid fa-basket-shopping fa-lg'></i>Shoping list", "April 20, 2021", "Task", "Tomatoes, bread", "", lastColumn], 
    ["<i class='fa-solid fa-brain fa-lg'></i>The theory of evolution", "April 27, 2021", "Random Thought", "The evolution...", "", lastColumn], 
    ["<i class='fa-solid fa-lightbulb fa-lg'></i>New Feature", "May 05, 2021", "Idea", "Implement new ...", "3/5/2021, 5/5/2021", lastColumn], 
    ["<i class='fa-solid fa-basket-shopping fa-lg'></i>Books", "May 14, 2021", "Task", "Frontend", "", lastColumn], 
    ["<i class='fa-solid fa-basket-shopping fa-lg'></i>Shoping list", "December 20, 2021", "Task", "Toys, presents", "", lastColumn], 
    ["<i class='fa-solid fa-brain fa-lg'></i>The love", "April 10, 2022", "Random Thought", "Love is kind and hopefull", "", lastColumn], 
    ["<i class='fa-solid fa-lightbulb fa-lg'></i>New project", "June 21, 2022", "Idea", "Create the app with Redux Toolkit", "", lastColumn]
]
const notesCategories = (document.getElementById("notes-categories")) as HTMLElement;
const CATEGORIES : Array<string> = ["Task", "Random Thought", "Idea"];
let icon : string = "";
let rewriteRow : HTMLTableRowElement; 

const openRewriteNote = (row : HTMLTableRowElement) => {
    rewriteRow = row;
    rewriteModal.style.display = "block";
    rewriteSelect.value = `${row.children[2].innerHTML}`;
    rewriteTheme.value = `${row.children[0].childNodes[1].nodeValue}`;
    rewriteNote.value = `${row.children[3].innerHTML}`;
}

const toArchiveOrBasket = (row: HTMLTableRowElement, tbody: HTMLElement , addClass: string) => {
    let tr = document.createElement("tr");
    tr.innerHTML = row.innerHTML;
    if (addClass === "archived") {
        tr.children[tr.children.length-1].innerHTML = "<i class='fa-solid fa-file-arrow-up fa-lg' title='unzip the note'></i>";
    } else {
        tr.children[tr.children.length-1].innerHTML = "<i class='fa-solid fa-trash-can-arrow-up fa-lg' title='pull out of the basket'></i>";
    }
    tr.classList.add(addClass);
    tbody.appendChild(tr);
}

const eventRewriteArchiveBasket = (e : Event, tr: HTMLTableRowElement) => {
    let elem = e.target as HTMLElement;
    switch (elem.classList[1]) {
        case "fa-pen":
            openRewriteNote(tr);
            break;
        case "fa-box-archive":
            tr.classList.remove("active");
            toArchiveOrBasket(tr, archivedNotes, "archived");
            categoriesTable();
            displayMainTable();
            break;
        case "fa-trash":
            tr.classList.remove("active");
            toArchiveOrBasket(tr, deletedNotes, "deleted"); 
            categoriesTable();
            displayMainTable();              
            break;
        default:
            break;
    }
}

const sortMainTable = () => {
    let rows = [].slice.call(mainNotes.querySelectorAll(".active"));
    rows.sort(function (a:HTMLTableRowElement, b:HTMLTableRowElement) : any {
        let dateA : number = new Date(a.cells[1].innerHTML).valueOf();
        let dateB : number = new Date(b.cells[1].innerHTML).valueOf();
        return dateA - dateB;
    });
    createTable(rows, mainNotes, "active");
} 

const eventRow = (e : Event, tr: HTMLTableRowElement) => {
    let elem = e.target as HTMLElement;
    if (elem.classList[1] === "fa-file-arrow-up") {
        tr.classList.remove("archived");
        tr.classList.add("active");
        displayMainTable();
        sortMainTable();
        categoriesTable();
    }
    if (elem.classList[1] === "fa-trash-can-arrow-up") {
        tr.classList.remove("deleted");
        tr.classList.add("active");
        displayMainTable();
        sortMainTable();
        categoriesTable();
    }
}

contentOfTable.forEach((block) => {
    let tr = document.createElement("tr");
    block.forEach((td) => {
        createThOrTd(td, tr, "td")
    })
    tr.classList.add("active");
    tr.addEventListener("click", (e) => {
        eventRewriteArchiveBasket(e, tr)
    })
    mainNotes.appendChild(tr);
})

const chooseRightIcon = (category: string) => {
    switch (category) {
        case "Task":
            icon = "<i class='fa-solid fa-basket-shopping fa-lg'></i>";
            break;
        case "Random Thought":
            icon = "<i class='fa-solid fa-brain fa-lg'></i>";
            break;
        default:
            icon = "<i class='fa-solid fa-lightbulb fa-lg'></i>";
            break;
    }
}

function categoriesTable() {
    let active = mainNotes.getElementsByClassName("active");
    let archived = archivedNotes.getElementsByClassName("archived");
    notesCategories.innerHTML = "";
    CATEGORIES.forEach((category) => {
        let tr = document.createElement("tr");
        chooseRightIcon(category);
        let activeCategory = 0;
        let archivedCategory = 0;
        for (let i = 0; i < active.length; i++) {
            if (active[i].children[2].innerHTML === category) {
                activeCategory += 1; 
            }
        }
        for (let i = 0; i < archived.length; i++) {
            if (archived[i].children[2].innerHTML === category) {
                archivedCategory += 1; 
            }
        }
        tr.innerHTML = `<td>${icon} ${category}</td><td>${activeCategory}</td><td>${archivedCategory}</td>`;
        notesCategories.appendChild(tr);
    })
}

const createTable = (collection: HTMLCollection | never[], tbody: HTMLElement, addClass: string) => {
    let newTable : Array<string> = [];
    for (let i = 0; i < collection.length; i++) {
        let row : string = collection[i].innerHTML;
        if(addClass === 'active') {
            const lastTd = "<td>";
            let index = row.lastIndexOf(lastTd);
            row = row.substring(0,index) + `<td>${lastColumn}</td>`;
        }
        newTable.push(row);
    }   
    tbody.innerHTML = "";
    newTable.forEach(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = item;
        tr.classList.add(addClass);
        if (addClass === "active") {
            tr.addEventListener("click", (e) => {
                eventRewriteArchiveBasket(e, tr);
            })
        } else {
            tr.addEventListener("click", (e) => {
                eventRow(e, tr);
            })
        }
        tbody.appendChild(tr);
    })
}

function displayMainTable () {
    let active = document.getElementsByClassName("active");
    let archived = archivedNotes.getElementsByClassName("archived");
    let deleted = deletedNotes.getElementsByClassName("deleted");
    createTable(active, mainNotes, "active");
    createTable(archived, archivedNotes, "archived");
    createTable(deleted, deletedNotes, "deleted");
}

categoriesTable();

const dateFns = new DateFnsAdapter(); 

btn.addEventListener("click", () => {
    modal.style.display = "block";
});

btnOpenArchive.addEventListener("click", () => {
    archiveModal.style.display = "block";
});

btnOpenBasket.addEventListener("click", () => {
    basketModal.style.display = "block";
});

btnCloseBasket.addEventListener("click", () => {
    basketModal.style.display = "none";
});

btnCloseArchive.addEventListener("click", () => {
    archiveModal.style.display = "none";
});

btnClearBasket.addEventListener("click", () => {
    deletedNotes.innerHTML = ""; 
})

span.onclick = function() {
    modal.style.display = "none";
}

spanCancel.onclick = function() {
    rewriteModal.style.display = "none";
}

const closeTheForm = () => {
    theme.value = "";
    note.value = "";
    modal.style.display = "none";
}

let myDate = "";
let datesInNote = "";

const createDate = () => {
    let date = new Date().toISOString();
    const initialDateFnsDate = dateFns.date(date);
    myDate = dateFns.format(initialDateFnsDate, "fullDate");
}

const checkNoteForDates = (note : string) => {
    const pattern = new RegExp("(([0-2][0-9]|(3)[0-1])(-|/|.)(((0)[0-9])|((1)[0-2]))(-|/|.)([0-9][0-9][0-9][0-9]))|((((0)[0-9])|((1)[0-2]))(-|/|.)([0-2][0-9]|(3)[0-1])(-|/|.)([0-9][0-9][0-9][0-9]))", "g");
    let match = note.match(pattern);
    console.log(match);
    if (match?.length) {
        datesInNote = match.toString().replace(/,/g, ", ");
    } else {
        datesInNote = "";
    }
}

addNoteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createDate();
    checkNoteForDates(note.value);
    chooseRightIcon(select.value);
    let newArray : Array<string> = [`${icon} ${theme.value}`, myDate, select.value, note.value, datesInNote, lastColumn];
    let tr = document.createElement("tr");
    newArray.forEach(name => {
        let td = document.createElement("td");
        td.innerHTML = name;
        tr.appendChild(td);
    })
    closeTheForm();
    tr.classList.add("active");
    mainNotes.appendChild(tr);
    categoriesTable();
})

updateNoteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createDate();
    checkNoteForDates(rewriteNote.value);
    chooseRightIcon(rewriteSelect.value);
    rewriteRow.classList.remove("active");
    let newArray : Array<string> = [`${icon} ${rewriteTheme.value}`, myDate, rewriteSelect.value, rewriteNote.value, datesInNote, lastColumn];
    let tr = document.createElement("tr");
    newArray.forEach(name => {
        let td = document.createElement("td");
        td.innerHTML = name;
        tr.appendChild(td);
    })
    rewriteModal.style.display = "none";
    tr.classList.add("active");
    mainNotes.appendChild(tr);
    categoriesTable();
    displayMainTable();
})