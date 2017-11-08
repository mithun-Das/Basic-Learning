

 

window.onload = function() {


	/*********** Setting Primary Necessary variable on local Storage ***********/


    function initialize(){


         if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null ){


               let dataList = new Array();
               localStorage.setItem("allData" , JSON.stringify(dataList));


         }


         if(localStorage.getItem("currentMode") == "undefined" || localStorage.getItem("currentMode") == null){

              
              localStorage.setItem("currentMode" , "all");

         }

    }

    
    /************* Validate the input from user  *************/
 

    function validation(){


    	if(document.getElementById("task").value == ""){

    		alert("Task field cannot be null");
    		return false ;

    	}
    	else
    		return true ;
    }

    



    /******************  Add recently added task into localStorage    *****************/


    function addTaskLocalstorage(){
     
           
          if(validation() == false)
               return ;   


          let taskObject = { task : document.getElementById("task").value, status : "active" }	;
          let dataList = JSON.parse(localStorage.getItem("allData"));
          dataList.push(taskObject);

          localStorage.setItem("allData" , JSON.stringify(dataList));

          decideToShowOrRemove(taskObject) ;

          document.getElementById("task").value = "" ;              // Make the input field null again 

    }



    /*****************  Decide to show an element in the current list on viewport  ***********/


     function decideToShowOrRemove(taskObject){

          
          let mode = localStorage.getItem("currentMode");


          if(document.getElementById(taskObject.task) == null )
           	  addShowList(taskObject) ;
          else if(mode =="all"  || taskObject.status == mode )
          	  addShowList(taskObject);
          else
              removeFromShowList(taskObject.task);
     

    }


    /************  Add Element To The Show List *****************/


     function addShowList(taskObject){

          
          let ul = document.getElementById("showList");
          let li  = document.createElement("li");
          let label = document.createElement("label");
          let input = document.createElement("input");
          let edit = document.createElement("button");
          let del  = document.createElement("button");
          let newline = document.createElement("br");


          li.id = taskObject.task ;
          input.setAttribute("type" , "checkbox");
          input.addEventListener("click" , function() { doStatusChangeInLocalstorage(taskObject.task) ; });        
          label.innerText = taskObject.task ;


		  li.appendChild(input);
		  li.appendChild(label);
          li.appendChild(edit);
          li.appendChild(del);
          ul.appendChild(li);


     } 



     function removeFromShowList(task){

             
          let parent = document.getElementById("showList");
          let child  = document.getElementById(task);

          parent.removeChild(child);

     } 




    /************** Change the mode status of a task  on localStorage **************/


    function doStatusChangeInLocalstorage(task){

           
          let dataList = JSON.parse(localStorage.getItem("allData"));


          for(let i = 0;i < dataList.length ; ++i){

                
                taskObject = dataList[i] ;

                if(taskObject.task == task){


                	if(taskObject.status == "active")
                		 taskObject.status = "completed" ;
                    else if(taskObject.status == "completed")
                    	 taskObject.status = "active" ;


                    dataList[i] = taskObject ;
                    localStorage.setItem("allData" , JSON.stringify(dataList));
                    decideToShowOrRemove(taskObject);
                    break;	
                }

          }

     }  


     /********************  Add Event Listener to HTML DOM Element ********************/

   document.getElementById("addButton").addEventListener("click" , addTaskLocalstorage);
  // document.getElementById("all").addEventListener("click" , );




    /***********  Primary Necessary function Call ***********/


    initialize();






}
