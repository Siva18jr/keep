var title = document.getElementById("addn_title");
var details = document.getElementById("add_detail");
var addnote = document.getElementById("add_note");
let noview = document.getElementById("no_notes");

function add(){
  
  let notes = localStorage.getItem("notes");

  if (title.value == "" || details.value == "") {
      
    return alert("Please add Note title and details");
  
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
              <button class="btn btn-secondary action_btn" id="${index}" onclick="editNote(this.id)">Update</button>
              <button class="btn btn-danger action_btn" id="${index}" onclick="deleteNote(this.id)">Delete</button>
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

  notesObj.findIndex((element, index) => {

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
              <button class="btn btn-secondary action_btn" id="${index}" onclick="editNote(this.id)">Update</button>
              <button class="btn btn-danger action_btn" id="${index}" onclick="deleteNote(this.id)">Delete</button>
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
