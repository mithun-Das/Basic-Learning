

function initialize(){


           let div = document.createElement("div");
           div.id = "taskList";
           document.body.appendChild(div);



		  if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null){

				   let allData = new Array();
				   let myJSON = JSON.stringify(allData);
				   localStorage.setItem('allData' , myJSON);

		 }

		  if(localStorage.getItem("mode") == "undefined" || localStorage.getItem("mode") == null){
				 	
				   let mode = "all";
				   localStorage.setItem("mode", mode);
	 }

}


initialize();

function storeData(task){


      let obj = {task : task , status : "active"} ;
      let myJSON = JSON.stringify(obj);
      localStorage.setItem(task, myJSON);

      let jsonArray  = localStorage.getItem('allData') ;
      let parseArray = JSON.parse(jsonArray);
      console.log(task);
      parseArray.push(task);

      let newJSON = JSON.stringify(parseArray);
      localStorage.setItem('allData' , newJSON);

}






function  getInputData(){

   let obj = document.getElementById("input");
   let task = obj.value;
   
   storeData(task);
   decideToAdd("active" , task);
   obj.value = "";
  

}


function doEdit(task){
	
       
   let obj = document.getElementById("input");
   obj.value = task ;
   //localStorage.removeItem(task);
   //let updateTask = obj.value;
   if(task != null)
   doDelete(task);
  // getInputData();

}


function doDelete(task){
	


	let parentDiv = document.getElementById("taskList");
	let childDiv = document.getElementById(task);
	parentDiv.removeChild(childDiv);

	localStorage.removeItem(task);


	 let jsonArray  = localStorage.getItem("allData");
   	 let parseArray = JSON.parse(jsonArray);

     for(let i = 0;i < parseArray.length ; ++i){
   	
         if(task == parseArray[i])
           parseArray[i] = null ;

        
            
   }

	  let newJSON = JSON.stringify(parseArray);
      localStorage.setItem('allData' , newJSON);

}



function checkStatus(task){
	
    let t = task;
    let jsonData  = localStorage.getItem(t);
    let parseData = JSON.parse(jsonData);

    if(parseData.status == "active")
         parseData.status = "completed" ;
    else
         parseData.status = "active" ;

    localStorage.removeItem(t);
    let editData = JSON.stringify(parseData);
    localStorage.setItem(t, editData);






}


function addNewData(task){
	
   let div = document.createElement("div");
   div.id = task;
   div.style.display = "inline" ; 

   let input = document.createElement("input");
   input.setAttribute("type", "checkbox");
   input.checked = false ;
   let x = task ;
   input.addEventListener("click", function(){ checkStatus(x) });

   let p = document.createElement("p");
   p.innerHTML = String(task) ;
   p.style.display = "inline" ;

   let edit  = document.createElement("button");
   let del   = document.createElement("button");
   let newline = document.createElement("br");

   edit.style.height = "20px";
   edit.style.width = "7%";
   edit.style.fontsize = "200px";
   edit.innerHTML = "Edit" ;

   del.style.height = "20px";
   del.style.width = "7%";
   del.style.fontsize = "200px";
   del.innerHTML = "Delete" ;


   edit.addEventListener("click" , function(){ doEdit(task);  });
   del.addEventListener("click" , function(){ doDelete(task);  });

   div.appendChild(input);
   div.appendChild(p);
   div.appendChild(edit);
   div.appendChild(del);
   div.appendChild(newline);
   div.appendChild(newline);
   div.appendChild(newline);
   div.appendChild(newline);
   div.appendChild(newline);

   document.getElementById("taskList").appendChild(div);  

}



function decideToAdd(cmode , task){
   

   let currMode = localStorage.getItem("mode");
   let currentMode = JSON.parse(currMode);

   if(currentMode == cmode || currentMode == "all")
      addNewData(task);

}




function addOldTask(task , status){
	
   let div = document.createElement("div");
   div.id = task;
   div.style.display = "inline" ; 

   let input = document.createElement("input");
   input.setAttribute("type", "checkbox");

   if(status == "active")
    	input.checked = false ;
   else
        input.checked = true ; 

   let x = task ;
   input.addEventListener("click", function(){ checkStatus(x); });

   let p = document.createElement("p");
   p.innerHTML = String(task) ; 
   p.style.display = "inline" ;


   let edit  = document.createElement("button");
   let del   = document.createElement("button");
   let newline = document.createElement("br");



   edit.style.height = "20px";
   edit.style.width = "7%";
   edit.style.fontsize = "200px";
   edit.innerHTML = "Edit" ;

   del.style.height = "20px";
   del.style.width = "7%";
   del.style.fontsize = "200px";
   del.innerHTML = "Delete" ;

   edit.addEventListener("click" , function(){ doEdit(task);  });
   del.addEventListener("click" , function(){ doDelete(task);  });

   div.appendChild(input);
   div.appendChild(p);
   div.appendChild(edit);
   div.appendChild(del);
   div.appendChild(newline);
   div.appendChild(newline);
   div.appendChild(newline);
   div.appendChild(newline);

   var taskListElm = document.getElementById("taskList");
   taskListElm.appendChild(div);  


}


function doClean(task){

	let parentDiv = document.getElementById("taskList");
	let childDiv = document.getElementById(task);

  if(parentDiv != null && childDiv != null)
	parentDiv.removeChild(childDiv);

}

function showList(currentMode){
	
   let jsonArray  = localStorage.getItem("allData");
   let parseArray = JSON.parse(jsonArray);

   let curMode   =  localStorage.getItem("mode");
  // let parseMode =  JSON.parse(curMode);
   curMode = currentMode ;
   localStorage.removeItem('mode');
   localStorage.setItem('mode' , JSON.stringify(curMode));



   for(let i = 0;i < parseArray.length ; ++i){
   	
        if(parseArray[i] == null)
            continue; 
        else{

          initialize();
        	doClean(parseArray[i]);
        }

   		let data   = parseArray[i];
   		let jsonData = localStorage.getItem(data);
   		let object  = JSON.parse(jsonData);
        	

		if(currentMode == "all")
        	addOldTask(object.task , object.status);
        else if(currentMode == object.status)
            addOldTask(object.task , object.status);
/*        else{
        	
        	let parentDiv = document.getElementById("taskList");
            let childDiv = document.getElementById(object.task);
            parentDiv.removeChild(childDiv);
        }
  */          

   }

}



function  buttonCreate(){


    let div = document.getElementById("taskList");
    let all = document.createElement("button");
    all.style.height = "20px";
    all.style.width = "10%";
    all.style.fontsize = "200px";
    all.setAttribute("value" , "all");
    all.innerHTML = "All" ;
    all.id = "all" ;
    all.addEventListener("click" ,       function(){ showList("all"); });
    div.appendChild(all);
    
    let completed = document.createElement("button");
    completed.style.height = "20px";
    completed.style.width = "10%";
    completed.style.fontsize = "200px";
    completed.setAttribute("value" , "completed");
    completed.innerHTML = "Completed" ;
    completed.id = "completed" ;
    completed.addEventListener("click",function() { showList("completed"); });
    div.appendChild(completed);

    
    let active = document.createElement("button");
    active.style.height = "20px";
    active.style.width = "10%";
    active.style.fontsize = "200px";
    active.setAttribute("value" , "active");
    active.innerHTML = "active" ;
    active.id = "active" ;
    active.addEventListener("click",function() { showList("active"); });
    div.appendChild(active);

    let newline = document.createElement("br");
    div.appendChild(newline);
    
   // document.body.appendChild(div);
    
}

buttonCreate();

document.getElementById("submitButton").addEventListener("click" , getInputData);
//document.getElementById("all").addEventListener("click" ,       function(){ showList("all"); });
//document.getElementById("completed").addEventListener("click" , function(){ showList("completed"); });
//document.getElementById("active").addEventListener("click" ,    function(){ showList("active"); });

showList("all");
