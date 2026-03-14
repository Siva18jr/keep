var title = document.getElementById("addn_title");
var details = document.getElementById("add_detail");
var addnote = document.getElementById("add_note");

function add() {
  let notes = localStorage.getItem("notes");
  if (title.value == "" || details.value == "") {
    return alert("Please add Note Title and Details");
  }

  let notesobj = [];
  if (notes != null) {
    notesobj = JSON.parse(notes);
  }

  let myobj = {
    title: title.value,
    text: details.value,
    date: new Date().toLocaleString()
  }

  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  title.value = "";
  details.value = "";

  showNotes();
}

function showNotes() {
  let notes = localStorage.getItem("notes");
  let noview = document.getElementById("no_notes");
  let view = document.getElementById("view_notes");

  let notesobj = [];
  if (notes != null) {
    notesobj = JSON.parse(notes);
  }

  let html = `<div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="nthree__title m-0">My Notes</h4>
                <span class="badge badge-primary badge-pill shadow-sm py-2 px-3" style="background: linear-gradient(135deg, #FFD60A, #E6C200); border: none; color: #0f172a !important; font-family: var(--body-font); font-weight: 500;">
                    ${notesobj.length} Note${notesobj.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div class="note-grid">`;

  notesobj.forEach(function (element, index) {
    // Generate a subtle color based on the title
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
    const accentColor = colors[index % colors.length];

    html += `
      <div class="note" style="--accent-color: ${accentColor}" onclick="window.viewNote(${index})">
        <div class="card">
          <div class="card-body">
            <div class="note-header">
               <h5 class="card-title notes_title">${element.title}</h5>
               <span class="note-date">${element.date || 'Just now'}</span>
            </div>
            <div class="card-text">${element.text}</div>
            <div class="card-actions" onclick="event.stopPropagation();">
              <button class="btn-action edit" title="Edit Note" onclick="window.editNote(${index})">
                <i class="uil uil-pen"></i>
              </button>
              <button class="btn-action delete" title="Delete Note" onclick="window.deleteNote(${index})">
                <i class="uil uil-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  });

  html += `</div>`;

  if (notesobj.length != 0) {
    view.innerHTML = html;
    noview.style.display = 'none';
  } else {
    view.innerHTML = '';
    noview.style.display = 'block';
  }
}

function deleteNote(index) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes != null) {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

function editNote(index) {
  let notes = localStorage.getItem("notes");
  let noimg = document.getElementById('no_notes_img');
  let notext = document.getElementById("noText");

  if (noimg) noimg.style.display = 'none';
  if (notext) notext.style.display = 'none';

  if (title.value !== "" || details.value !== "") {
    return alert("Please clear the form before editing a note");
  }

  let notesObj = [];
  if (notes != null) {
    notesObj = JSON.parse(notes);
  }

  title.value = notesObj[index].title;
  details.value = notesObj[index].text;

  // Scroll to top smoothly so user sees the form
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Focus on the title input for immediate typing
  title.focus();

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function viewNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = JSON.parse(notes);
  let note = notesObj[index];

  document.getElementById('noteViewTitle').innerText = note.title;
  document.getElementById('noteViewDate').innerText = note.date || 'Just now';
  document.getElementById('noteViewContent').innerText = note.text;
  
  const editBtn = document.getElementById('editFromModal');
  editBtn.onclick = () => {
    $('#viewNoteModal').modal('hide');
    editNote(index);
  };

  $('#viewNoteModal').modal('show');
}

function search() {
  let notes = localStorage.getItem("notes");
  let searchInput = document.getElementById("search_note");
  let searchVal = searchInput.value.toLowerCase();

  let notesObj = [];
  if (notes != null) {
    notesObj = JSON.parse(notes);
  }

  if (searchVal.trim() === '') {
    showNotes();
    return;
  }

  let view = document.getElementById("view_notes");
  let add = document.getElementById("add_now");
  let noview = document.getElementById("no_notes");

  let html = `<div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="nthree__title m-0">Search Results for <span style="color: var(--primary-color);">"${searchVal}"</span></h4>
                <button class="btn btn-outline-secondary rounded-pill btn-sm shadow-sm" onclick="clearSearch()" style="font-weight: 600; padding: 0.25rem 1rem;">
                  <i class="uil uil-times mr-1"></i> Clear Selection
                </button>
              </div>
              <div class="note-grid">`;

  let matchCount = 0;
  notesObj.forEach(function (element, index) {
    if (element.title.toLowerCase().includes(searchVal) || element.text.toLowerCase().includes(searchVal)) {
      matchCount++;
      const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
      const accentColor = colors[index % colors.length];

      html += `
        <div class="note" style="--accent-color: ${accentColor}" onclick="window.viewNote(${index})">
          <div class="card">
            <div class="card-body">
              <div class="note-header">
                 <h5 class="card-title notes_title">${element.title}</h5>
                 <span class="note-date">${element.date || 'Just now'}</span>
              </div>
              <div class="card-text">${element.text}</div>
              <div class="card-actions" onclick="event.stopPropagation();">
                <button class="btn-action edit" title="Edit Note" onclick="window.editNote(${index})">
                  <i class="uil uil-pen"></i>
                </button>
                <button class="btn-action delete" title="Delete Note" onclick="window.deleteNote(${index})">
                  <i class="uil uil-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>`;
    }
  });

  html += `</div>`;

  if (matchCount === 0) {
    html += `
    <div class="text-center py-5">
      <i class="uil uil-search-minus" style="font-size: 4rem; color: var(--placeholder-color);"></i>
      <h5 class="mt-3 font-weight-bold" style="color: var(--text-color);">No matching notes found.</h5>
      <p style="color: var(--placeholder-color);">Try adjusting your search query.</p>
      <button class="btn btn-primary rounded-pill mt-3 shadow-sm px-4" onclick="clearSearch()">Go Back</button>
    </div>`;
  }

  view.innerHTML = html;
  if (add) add.style.display = 'none';
  if (noview) noview.style.display = 'none';
}

function clearSearch() {
  document.getElementById("search_note").value = '';
  document.getElementById("add_now").style.display = 'block';
  showNotes();
}

function download(content, fileName, contentType) {
  const file = new Blob([content], { type: contentType });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function backup() {
  let data = localStorage.getItem("notes");
  if (!data || data === "[]") {
    return alert("No notes available to export!");
  }
  download(data, "notes.json", "application/json");
}

function restore() {
  let sure = confirm("\\t\\t\\tWarning...!\\n\\nYou will lose your current data if not backed up.\\n\\nAre you ready to import?");

  if (sure == true) {
    let fileImport = document.createElement('input');
    fileImport.type = 'file';
    fileImport.multiple = false;
    fileImport.accept = 'application/json';

    fileImport.oninput = function (e) {
      if (!fileImport.files.length) return;

      let reader = new FileReader();
      reader.onload = function () {
        try {
          // validate parsed JSON
          let parsed = JSON.parse(reader.result);
          if (Array.isArray(parsed)) {
            let oldData = localStorage.getItem("notes");
            localStorage.setItem("imported", oldData || "[]");
            localStorage.setItem("notes", reader.result);
            alert("Notes imported successfully! ✨");
            showNotes();
          } else {
            alert("Invalid notes format.");
          }
        } catch (e) {
          alert("Failed to read JSON file. Data may be corrupted.");
        }
      };
      reader.readAsText(fileImport.files[0]);
    }
    fileImport.click();
  }
}

// Ensure functions are available globally for onclick events in HTML
window.add = add;
window.showNotes = showNotes;
window.deleteNote = deleteNote;
window.editNote = editNote;
window.viewNote = viewNote;
window.search = search;
window.clearSearch = clearSearch;
window.backup = backup;
window.restore = restore;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  showNotes();

  // Theme functionality
  const themeButton = document.getElementById('theme-button');
  const themeFloat = document.getElementById('theme-float');
  const darkTheme = 'dark-theme';
  const iconTheme = 'uil-sun';

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
  const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

  if (selectedTheme === 'dark') {
    document.body.classList.add(darkTheme);
    themeButton.classList.add(iconTheme);
    themeButton.classList.remove('uil-moon');
  }

  themeFloat.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle(darkTheme);

    if (themeButton.classList.contains('uil-moon')) {
      themeButton.classList.remove('uil-moon');
      themeButton.classList.add('uil-sun');
    } else {
      themeButton.classList.remove('uil-sun');
      themeButton.classList.add('uil-moon');
    }

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
});