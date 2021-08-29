important = false;
allMyTasks = [];
formVisible = true;
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
    // tasks.push(task);
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
    noTaskAlert();
    clearForm();
}

function displayTask(task){
  let btn = ``;
  if(!task.done){
    btn = `<button onclick="doneTask('${task._id}')" class="btn btn-primary btnDone ms-2">Done</button>`
  }

  let prio = ``;
  if(task.priority === `High`){
    prio = `red`
  }

  let syntax=`
  <div id="${task._id}" class="currentTask mb-3 py-1 px-1" style="border: 2px solid ${task.color};">
    <div class="left">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          ${impCheck(task)}
          <h6>${task.title}</h6>
        </div>
        <label class="dueDate">${task.dueDate}</label>
      </div>
      <label>${task.description}</label>
      <hr class="divider">
      <div class="d-flex prio justify-content-between secondaryInfo">
        <label class="text-secondary">Priority: <span class="taskPriority ${prio}">${task.priority}</span></label>
        <label class="text-secondary">Location: ${task.location}</label
      </div>
    </div></div>
    ${btn}
  </div>
  `;

  if(task.done){
    $(`.completed-tasks`).append(syntax);
    $(`#${task._id}`).hide();
    $(`#${task._id}`).fadeIn(700);
  }else{
    
    $(`.pending-tasks`).append(syntax);
    $(`#${task._id}`).hide();
    $(`#${task._id}`).fadeIn(700);
  }

}

function doneTask(id){
  console.log(`Mark as done:`,id);
  $(`#${id}`).remove();
  // Find objext with that id
  for(i=0;i<allMyTasks.length;i++){
    let task = allMyTasks[i];
    if(task._id === id){
      console.log(`Found it!`,task);

      task.done = true;

      // Send the task on a PUT request to url:
      $.ajax({
        type: `PUT`,
        url: serverUrl + `api/tasks`,
        data: JSON.stringify(task),
        contentType: `application/json`,
        success: function(res){
          console.log(`Updated Task to Done`,res);
          displayTask(task);
        },
        error: function(err){
          console.log(`Failed to update task`,err);
        }
      })
    }
  }
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
  $(`#noTaskAlert`).hide();
  $.ajax({
    type: `GET`,
    url: serverUrl + `api/tasks`,
    success: function(res){
      console.log(`Server says:`);
      let t = JSON.parse(res);
      for(i=0;i<t.length;i++){
        if(t[i].name === `iAmKevinCruz`){
          // completedTask(t[i]);
          // console.log(t[i]);
          allMyTasks.push(t[i]);
          displayTask(t[i]);
        }
      }
    },
    error: function(err){
      console.log(`Error getting tasks:`,err);
    }
  })
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

function toggleForm(){
  if(formVisible){
    formVisible = false;
    $(`#btnToggleForm`).text(`Show Form`);
  }else{
    formVisible = true;
    $(`#btnToggleForm`).text(`Hide Form`);
  }
  $(`#sectionForm`).toggle(500);
  console.log(`button clicked`);
}

function clearTasksALL(){
  console.log(`Clear Button Pressed`);
  $.ajax({
    type: `DELETE`,
    url: serverUrl + `api/tasks/clear/iAmKevinCruz`,
    success: function(res){
      let t = JSON.parse(res);
      console.log(`All Tasks Have Been Cleared...`,t);
      window.NavigationPreloadManager;
    },
    error: function(err){
      console.log(`Something went wrong`,err);
    }
  })
}

function noTaskAlert(){
  let pending = $(`#pendingTasks`);
  let completed = $(`#completedTasks`);
  let alert = $(`#noTaskAlert`);
  if(pending[0].childElementCount<3 && completed[0].childElementCount<3){
    pending.fadeOut(700);
    completed.fadeOut(700);
    alert.delay(700).fadeIn(700);
  }
}


function init() {
  console.log(`test log`);
  // load data
  getTasks();
  // noTaskAlert();
    // call a get from the same url
    // json part
    // travel the array
    // send each objet to display function

  // hook events
  $(`#iconImportant`).click(toggleImportant);
  $(`#btnSave`).click(saveBtn);
  $(`#btnToggleForm`).click(toggleForm);
  $(`#btnClear`).click(clearTasksALL);
}

window.onload = init;



