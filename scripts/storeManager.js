function save(note) {
    let notes = readAll();
    notes.push(note);
    let val = JSON.stringify(notes);
    localStorage.setItem("notes", val);
}

function readAll() {
    let data = localStorage.getItem("notes");
    if (!data) {
        return [];
    } else {
        return JSON.parse(data);
    }
}

function deleteNote(id) {
    let notes = readAll();
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
}