

 

window.onload = function() {


	/*********** Setting Primary Necessary variable on local Storage ***********/


    function initialize(){


         if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null ){


               let dataList = new Array();
               localStorage.setItem("allData" , JSON.stringify(dataList));


         }


              
         localStorage.setItem("currentMode" , "all");

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

          addShowList(taskObject) ;
          decideToShowOrHide(taskObject) ;

          document.getElementById("task").value = "" ;              // Make the input field null again 

    }



    /*****************  Decide to show or hide an element in the current list on viewport  ***********/


     function decideToShowOrHide(taskObject){

          
          let mode = localStorage.getItem("currentMode");

          if(mode == "all")
          	return ;
          else if(taskObject.status == mode)
          	return ;
          else
          	document.getElementById(taskObject.task).style.display = 'none' ;

    }


    /************  Add Element To The Show List *****************/


     function addShowList(taskObject, flag=false){

          
          let ul = document.getElementById("showList");
          let li  = document.createElement("li");
          let label = document.createElement("label");
          let input = document.createElement("input");
          let edit = document.createElement("button");
          let del  = document.createElement("button");
          let newline = document.createElement("br");


          li.id = taskObject.task ;
          input.setAttribute("type" , "checkbox");
          input.checked = flag ;       
          label.innerText = taskObject.task ;
          edit.className = "singleButton";
          del.className = "singleButton" ;
          edit.innerText = "Edit" ;
          del.innerText = "Delete" ;

          input.addEventListener("click" , function() { doStatusChangeInLocalstorage(taskObject.task) ; });
          edit.addEventListener("click" ,  function() { makeEditField(li) ;   } ) ;
          del.addEventListener("click" , function() { doDeleteFromLocalStorage(li) ; } ) ;
          del.addEventListener("click" , function() { removeFromShowList(li) ; } );



		  li.appendChild(input);
		  li.appendChild(label);
          li.appendChild(edit);
          li.appendChild(del);
          ul.appendChild(li);


     } 


    

     /*************  Remove element from show list **************/

     function removeFromShowList(li){

             
          let parent = document.getElementById("showList");

          parent.removeChild(li);

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
                    decideToShowOrHide(taskObject);
                    break;	
                }

          }

     }  


     /**************   Show List Element according to Mode button click *************/


     function  showListInMode(showingMode){

         
         let currentMode = localStorage.getItem("currentMode");
         let dataList = JSON.parse(localStorage.getItem("allData"));


      //   if(currentMode == showingMode)
      //   	return ;
        // else
         	localStorage.setItem("currentMode" , showingMode);



         for(let i = 0;i < dataList.length ; ++i){


         	  if(dataList[i].status == showingMode || showingMode == "all"){
         	  	 document.getElementById(dataList[i].task).style.display = 'block' ;
         	  }
         	  else
                 document.getElementById(dataList[i].task).style.display = 'none' ;

         }

     }


 
     /**********************    Build and show the task element on the viewpage  ******************/

 
     function  buildShowList(){


           let dataList = JSON.parse(localStorage.getItem("allData")) ;
           let flag;


           for(let i = 0; i < dataList.length ; ++i){


                if(dataList[i].status == "completed")
                	 flag = true ;
                else 
                     flag = false ;

               addShowList(dataList[i] , flag);      	

           }

     }


     /*******************   Create edit field to edit a task  ***************/ 
     
     let prevli;

     function makeEditField(li){
          
          prevli = li;
          document.getElementById("addButton").style.display = 'none' ;
          document.getElementById("editButton").style.display = 'block' ;
          document.getElementById("task").value = li.id ;
           

     }



    /************ Edit processes are controlled by this function ****************/


    function doEdit(){


        if(validation() == false)
               return ;

        doEditInLocalstorage(prevli) ;
        doEditInShowList(prevli) ;


         /*********** Going back to again add Task Field  ************/ 
        
        document.getElementById("task").value = "" ;
        document.getElementById("editButton").style.display = 'none' ;
        document.getElementById("addButton").style.display = 'block' ;

        /*****************  End  ***********************/


    }


    /*************** Do the task edit in localStorage ****************/


    function doEditInLocalstorage(li){

          let dataList = JSON.parse(localStorage.getItem("allData")) ;
          let prevTask = li.id ;
          let editedTask = document.getElementById("task").value ;

          for(let i = 0;i < dataList.length ; ++i){

                if(dataList[i].task == prevTask){

                	dataList[i].task = editedTask ;
                	localStorage.setItem("allData" , JSON.stringify(dataList));
                	return ;
                }


          }

    } 


    /************ Show the edited task on showlist of viewpage  ****************/


    function doEditInShowList(li){

            li.children[1].innerText = document.getElementById("task").value ;
            li.id = document.getElementById("task").value ;

    }



    function doDeleteFromLocalStorage(li) {
    	
    	let dataList = JSON.parse(localStorage.getItem("allData")) ;

    	for(let i = 0;i < dataList.length ; ++i){

    		 if(dataList[i].task == li.id){

    		 	 dataList.splice(i, 1) ;
    		 	 localStorage.setItem("allData" , JSON.stringify(dataList));
    		 	 return ;
    		 }
    	}
    }



     /********************  Add Event Listener to HTML DOM Element ********************/

   document.getElementById("addButton").addEventListener("click" , addTaskLocalstorage);
   document.getElementById("editButton").addEventListener("click" , doEdit);
   document.getElementById("all").addEventListener("click" , function() { showListInMode("all") ; });
   document.getElementById("active").addEventListener("click" , function() { showListInMode("active") ; });
   document.getElementById("completed").addEventListener("click" , function() { showListInMode("completed") ; });


    /***********  Primary Necessary function Call when the page is loaded ***********/


    initialize();
    buildShowList();

}
