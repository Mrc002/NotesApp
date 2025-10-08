// Note constructor
function Note(title, content) {
    this.id = Date.now() + Math.random();
    this.title = title;
    this.content = content;
    this.timestamp = new Date().toLocaleString();
}

// Variables
const inputTitle = document.getElementById("txtTitle");
const inputContent = document.getElementById("txtContent");
const btnAddNote = document.getElementById("btnAddNote");
const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

// Add note function
function addNote(e) {
    e.preventDefault();
    
    const title = inputTitle.value.trim();
    const content = inputContent.value.trim();
    
    if (title && content) {
        const newNote = new Note(title, content);
        save(newNote);
        displayNotes();
        noteForm.reset();
    }
}

// Display notes function
function displayNotes() {
    const notes = readAll();
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <p>No notes yet. Create your first note above</p>
            </div>
        `;
        return;
    }
    
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <h3>${escapeHtml(note.title)}</h3>
            <p class="timestamp">${note.timestamp}</p>
            <p>${escapeHtml(note.content)}</p>
            <button class="btn-delete" onclick="handleDelete(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(noteCard);
    });
}

// Delete handler
function handleDelete(id) {
    if (confirm('Are you sure you want to delete this note?')) {
        deleteNote(id);
        displayNotes();
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
function init() {
    noteForm.addEventListener("submit", addNote);
    displayNotes();
}

window.onload = init;