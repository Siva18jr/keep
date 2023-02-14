var title = document.getElementById("addn_title");
var details = document.getElementById("add_detail");
var addnote = document.getElementById("add_note");
let noview = document.getElementById("no_notes");

function add(){
  
  let notes = localStorage.getItem("notes");

  if (title.value == "" || details.value == "") {
      
    return alert("Please add Note Title and Details");
  
  }

  if(notes == null){

    notesobj = [];

  }else{
      
    notesobj = JSON.parse(notes);

  }

  let myobj = {
    
    title: title.value,
    text: details.value
    
  }

  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  title.value = "";
  details.value = "";

  showNotes();
  
}

function showNotes(){
  
  let notes = localStorage.getItem("notes");

  if(notes == null){
      
    notesobj = [];

  }else{

    notesobj = JSON.parse(notes);

  }

  let html = "";

  notesobj.forEach(function(element, index){
    
    html += `
    <div class="note">
      <div class="row">
        <div class="col-sm-6" style="padding-bottom: 1%;">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title notes_title"> ${element.title} </h5>
              <pre class="card-text"> ${element.text} </pre>
              <button class="btn btn-secondary action_btn" id="${index}" onclick="editNote(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </button>
              <button class="btn btn-danger action_btn" id="${index}" onclick="deleteNote(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>` ;
    
  });

  let view = document.getElementById("view_notes");

  if(notesobj.length != 0){
      
    view.innerHTML = html;

  }else{

    view.innerHTML = noview.innerHTML;
    
  }

  let pre = document.querySelectorAll('.note .card-text');

  pre.forEach((elem, id) => {
    
    let text = elem.innerHTML;
    elem.textContent = text;
  
  });

}

function deleteNote(index) {
  
  let confirmDel = confirm("Are you going to delete this note?");
  
  if (confirmDel == true) {
    
    let notes = localStorage.getItem("notes");
    
    if (notes == null) {
      
      notesObj = [];
    
    } else {
      
      notesObj = JSON.parse(notes);
    
    }
    
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  
  }
    
}

function editNote(index) {
  
  let notes = localStorage.getItem("notes");
  
  if (title.value !== "" || details.value !== "") {
    
    return alert("Please clear the form before editing a note");
  
  } 

  if (notes == null) {
  
    notesObj = [];
  
  } else {
  
    notesObj = JSON.parse(notes);
  
  }

  notesObj.findIndex((element) => {

    noview.style.display = 'none';
    
    title.value = notesObj[index].title;
    details.value = notesObj[index].text;
  
  })

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

}

function search(){

  let notes = localStorage.getItem("notes");
  let search = document.getElementById("search_note");

  if (notes == null) {
  
    notesObj = [];
  
  } else {
  
    notesObj = JSON.parse(notes);
  
  }

  let html = `<h4 class="nav_head">The results for &nbsp;` + `<b> '` + search.value + ` ' </b> &nbsp; are <a href="index.html" class="btn btn-dark" style="margin-bottom: 3%; float: right;">&larr; Home</a> </h4>`;

  notesObj.forEach(function(element,index){
    
    if(element.title.indexOf(search.value) >= 0){
      
      html += `
      <div class="note">
        <div class="row">
          <div class="col-sm-6" style="padding-bottom: 1%;">
            <div class="card">
              <div class="card-body">
              <h5 class="card-title notes_title"> ${element.title} </h5>
              <pre class="card-text"> ${element.text} </pre>
              <button class="btn btn-secondary action_btn" id="${index}" onclick="editNote(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </button>
              <button class="btn btn-danger action_btn" id="${index}" onclick="deleteNote(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>` 
      ;

      let view = document.getElementById("view_notes");
      let add = document.getElementById("add_now");
        
      view.innerHTML = html;
      add.style.display = 'none';
      
    }
  
  });

  search.value = '';
  
}
