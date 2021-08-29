important = false;
tasks = [];
serverUrl = "https://fsdiapi.azurewebsites.net/";

function toggleImportant() {
  let icon = $(`#iconImportant`);
  if(important){
    icon.toggleClass(`fas far`);
    important = false
    console.log(`Task is ${important}`);
  }else{
    icon.toggleClass(`fas far`);
    important=true;
    console.log(`Task is ${important}`);
  }
  
  console.log(`toggle the star`);
}

function saveBtn(){
    console.log(`Save button pressed`);
    let title=$(`#titleInput`).val();
    let dueDate=$(`#dueDateInput`).val();
    let location=$(`#locationInput`).val();
    let priority=$(`#priorityInput`).val();
    let color=$(`#colorInput`).val();
    let contact=$(`#contactInput`).val();
    let description=$(`#descriptionInput`).val();
    
    let task = new Task (title,important,dueDate,location,priority,color,contact,description);
    tasks.push(task);
    console.log(task);
    console.log(JSON.stringify(task));
    // Send task to Server
    $.ajax({
      type: `POST`,
      url: serverUrl + `api/tasks/`,
      data: JSON.stringify(task),
      contentType: `application/json`,
      success: function(res){
        console.log(`Server says:`,res);

        let t = JSON.parse(res);
        displayTask(t);
      },
      error: function(error){
        console.log(`Error saving task`,error);
      }
    });

    clearForm();
}

function displayTask(task){
  let syntax=`
  <div class="currentTask mb-3 py-1 px-1">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        ${impCheck(task)}
        <h6>${task.title}</h6>
      </div>
      <label class="dueDate">${task.dueDate}</label>
    </div>
    <label>${task.description}</label>
    <hr class="divider">
    <div class="d-flex justify-content-between secondaryInfo">
      <label class="text-secondary">Priority: <span id="taskPriority">${task.priority}</span></label>
      <label class="text-secondary">Location: ${task.location}</label
    </div>
  </div>
  `;

  $(`.pending-tasks`).append(syntax);
}

function impCheck(task){
  if(task.important){
    let syntax = `<i class="fas fa-star taskStar"></i>`
    return syntax;
  }else{
    return ``;
  }
}

function getTasks(){
  $.ajax({
    type: `GET`,
    url: serverUrl + `api/tasks`,
    success: function(res){
      console.log(`Server says:`);
      let t = JSON.parse(res);
      for(i=0;i<t.length;i++){
        if(t[i].name == `iAmKevinCruz`){
          completedTask(t[i]);
        }
      }
    },
    error: function(err){
      console.log(`Error getting tasks:`,err);
    }
  })
}

function completedTask(task){
  let syntax=`
  <div class="currentTask mb-3 py-1 px-1">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        ${impCheck(task)}
        <h6>${task.title}</h6>
      </div>
      <label class="dueDate">${task.dueDate}</label>
    </div>
    <label>${task.description}</label>
    <hr class="divider">
    <div class="d-flex justify-content-between secondaryInfo">
      <label class="text-secondary">Priority: <span id="taskPriority">${task.priority}</span></label>
      <label class="text-secondary">Location: ${task.location}</label
    </div>
  </div>
  `;

  $(`.completed-tasks`).append(syntax);
}

function clearForm(){
    // Clear all the inputs
    $(`#titleInput`).val(``);
    $(`#dueDateInput`).val(``);
    $(`#locationInput`).val(``);
    $(`#priorityInput`).val(``);
    $(`#colorInput`).val(`#000000`);
    $(`#contactInput`).val(``);
    $(`#descriptionInput`).val(``);
    // Change the star to regular and remove imp
    $(`#iconImportant`).removeClass(`fas`).addClass(`far`);
    important=false;
}



function init() {
  console.log(`test log`);
  // load data
    // call a get from the same url
    // json part
    // travel the array
    // send each objet to display function

  // hook events
  $(`#iconImportant`).click(toggleImportant);
  $(`#btnSave`).click(saveBtn);
}

window.onload = init;
