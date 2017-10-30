
window.onload = function(){

   "use strict";

   /**********   Decide to show current Element  in the  page     ****************/

     function  initialize(){
     	

	          if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null){
	          	
	              let arr = new Array();
	              localStorage.setItem("allData" , JSON.stringify(arr)) ;

	          }



	          if(localStorage.getItem("currentPage") == "undefined" || localStorage.getItem("currentPage") == null){
			   	
			   	      
			   	      localStorage.setItem("currentPage" , 1);
			   }



     }



        /**********  Upadated coloumn  data show on  current  page  ****************/

        
    function coloumnEditInPage(td , text){
        	
             td.innerHTML = text;

        }


        /**********  Updated coloumn data store on localStorage   ****************/


    function coloumnEditInDatabase(taskPosition , cellNo , value){
        	
            
        	let dataList = JSON.parse(localStorage.getItem("allData")); 

        	console.log(taskPosition);

        	if(cellNo == 0)
        	   dataList[taskPosition - 1].task = value;
        	else if(cellNo == 1)
        	   dataList[taskPosition - 1].mentor = value ;
        	else if(cellNo == 2)
        	   dataList[taskPosition - 1].date = value ;

        	
        	localStorage.setItem("allData" , JSON.stringify(dataList));  
        	
        	 

        }







	function makeEditField(tr, td, cellNo, taskPosition){
			
             
             let tbody = document.getElementById("tableList");

             let rowField = tr ;
             let coloumnField = td ;

             let text = td.innerText ;
             td.innerHTML = "" ;
             let input = document.createElement("input");

             if(cellNo == 2)
               input.setAttribute("type" , "date");
             else
               input.setAttribute("type" , "text") ;

             input.setAttribute("value" , text);
			 input.addEventListener("blur" , function() { coloumnEditInDatabase(taskPosition, cellNo, input.value ) ; } );
             input.addEventListener("blur" , function() { coloumnEditInPage(td , input.value ) ; } );
             td.appendChild(input);
            // rowField.appendChild(td);
            // tbody.appendChild(rowField);

		}




      /**************  Create Edit button for Entire Row Edit   ***************/

	 function  createEditButton(position){
	     	
	         
             let mainPart  = document.getElementById("inputPart") ;
             let addButton = document.getElementById("addButton");

             if(addButton == null)
                return ;

             mainPart.removeChild(addButton);


	         let editButton = document.createElement("button");
	         editButton.setAttribute("type" , "button") ;
	         editButton.id = "editButton"
	         editButton.className = "buttonField" ;
	         editButton.innerText = "Edit Task" ;
	         editButton.addEventListener("click" , function() { storeUpdatedRowData(position) ;  });

	         document.getElementById("inputPart").appendChild(editButton);

	     }


    /**************** Existed data fetch in the input field  ******************/


    function  fetchRow(position){


        	 
        	 let dataList = JSON.parse(localStorage.getItem("allData")) ;
        	
             document.getElementById("task").value = dataList[position -1].task;
             document.getElementById("mentor").value = dataList[position - 1].mentor;
             document.getElementById("date").value = dataList[position - 1].date;

        }


     /*************  Show currently added data in page    **************/

    function  showCurrentData(taskObject){
    	
          
 			let tbody = document.getElementById("tableList");
 			let tr = document.createElement("tr");

 			let taskName = document.createElement("td");
 			taskName.innerText = taskObject.task ;
 			taskName.addEventListener("dblclick" , function()   { makeEditField(tr , taskName, 0, taskObject.position) ;  }  );

 			let taskMentor = document.createElement("td");
 			taskMentor.innerText = taskObject.mentor ;
 			taskMentor.addEventListener("dblclick" , function() { makeEditField(tr , taskMentor, 1, taskObject.position) ;  }  );

 			let taskDate = document.createElement("td");
 			taskDate.innerText = taskObject.date ;
 			taskDate.addEventListener("dblclick" , function()   { makeEditField(tr , taskDate,  2, taskObject.position) ; }  );


 			let button = document.createElement("button");
			button.style.height = "25px";
		    button.style.width = "60%";
		    button.style.fontsize = "200px";
		    button.setAttribute("value" , "edit");
		    button.innerHTML = "Edit" ;
    		button.addEventListener("click" , function() { createEditButton(taskObject.position) ; } );
		    button.addEventListener("click" , function() { fetchRow(taskObject.position) ; });


 			tr.appendChild(taskName);
            tr.appendChild(taskMentor);
            tr.appendChild(taskDate);
            tr.appendChild(button);
 			tbody.appendChild(tr);

		}



		 /**********   Decide to add new page for currently added data    ****************/

	 function  decideToAddPage(position){

    	
        	let dataList = JSON.parse(localStorage.getItem("allData"));

        	if(dataList.length == 5)
        	    addNewPage(1);
           
        	if(dataList.length % 5 == 1 && dataList.length > 5)
        	    addNewPage(Math.floor(dataList.length / 5) + 1);

        }



   /****************** Decide to show currently added data   *******************/


	function  decideToShow(taskObject){
			
		    let page = JSON.parse(localStorage.getItem("currentPage"));
		    let startRange = (page - 1) * 5 ;
		    let endRange =   (page * 5) - 1 ;


		    if(taskObject.position - 1 >= startRange && taskObject.position - 1 <= endRange)
		         showCurrentData(taskObject);

		    decideToAddPage(taskObject.position);

		}





        /**********   Store new data in localStorage ****************/


     function  storeNewData(){
     	

           let dataList = JSON.parse(localStorage.getItem("allData")) ;

		   let task = document.getElementById("task");
		   let mentor = document.getElementById("mentor");
		   let date = document.getElementById("date");  
		   let taskObject = {task : task.value, mentor : mentor.value , date : date.value , position : ( dataList.length + 1)} ;
		   dataList.push(taskObject);
		   localStorage.setItem("allData" , JSON.stringify(dataList));


		   task.value = mentor.value = date.value = "";

		   decideToShow(taskObject);

     }


     /*******************  Validation for input data   ******************/


     function  validation(){
     	

     	   let task = document.getElementById("task");
		   let mentor = document.getElementById("mentor");
		   let date = document.getElementById("date");

		   if( task.value == ""){
		     alert("Task Field is Required");
		     return ;
		   }
		   else if(mentor.value == ""){
		   	  
		   	  alert("Mentor is required");
		   	  return ;

		   }
		   else if(date.value == ""){
		   	
		   	  alert("date is required");
		   	   return ;

		   }


		   storeNewData();


     }


  /*********** Create add button  *************/


  function  createAddButton(){
     	
         
         let addButton = document.createElement("button");
         addButton.setAttribute("type" , "button") ;
         addButton.id = "addButton"
         addButton.className = "buttonField" ;
         addButton.innerText = "Add Task" ;
         addButton.addEventListener("click" , validation);

         document.getElementById("inputPart").appendChild(addButton);

     }


  /************* Set previous add task mode after edit  ****************/


  function  setPreviousMode(){
 	

	 	document.getElementById("task").value = "" ;
	 	document.getElementById("mentor").value = "" ;
	 	document.getElementById("date").value = "" ;

	 	let parrent = document.getElementById("inputPart");
	 	let child   = document.getElementById("editButton");

	 	parrent.removeChild(child);

	 	createAddButton();
 }


   
  /****************** Show Updated Row in Table ******************/ 

  function  showUpdatedRow(position , task , mentor , date){
 	
	     let tbody = document.getElementById("tableList");

	     tbody.rows[position - 1].cells[0].innerHTML = task ;
	     tbody.rows[position - 1].cells[1].innerHTML = mentor ;
	     tbody.rows[position - 1].cells[2].innerHTML = date ;


 }


  /************* Store Currently  updated row data ***************/


  function  storeUpdatedRowData(position ){
     	

     	if(document.getElementById("task").value == null){
     		
     		alert("task field required");
     		return ;
     	}
     	else if(document.getElementById("mentor").value == null){
     		

     		alert("mentor field required");
     		return;
     	}
     	else if(document.getElementById("date").value == null){
     		
     		alert("date is required");
     		return ;
     	}


     	let dataList = JSON.parse(localStorage.getItem("allData"));
     	dataList[position - 1].task = document.getElementById("task").value ;
     	dataList[position - 1].mentor = document.getElementById("mentor").value ;
     	dataList[position - 1].date = document.getElementById("date").value ;
     	showUpdatedRow( position , dataList[position - 1].task, dataList[position - 1].mentor , dataList[position - 1].date) ;

     	localStorage.setItem("allData" , JSON.stringify(dataList));

     	setPreviousMode() ;


     }


  /***************** Show the content of a specific page  *************/             
  

  function  showPageContent(pageNumber){


        localStorage.setItem("currentPage" , pageNumber);
		document.getElementById("tableList").innerHTML = null ;
		
	    let dataList = JSON.parse(localStorage.getItem("allData"));
		let startRange = (pageNumber - 1) * 5 ;
		let endRange   = (pageNumber * 5) - 1 ;

		let tbody = document.getElementById("tableList");

		for(let i = startRange ; i <= endRange && i < dataList.length ; ++i){
			
	 			
	 			let tr = document.createElement("tr");

	 			let taskName = document.createElement("td");
	 			taskName.innerHTML = dataList[i].task ;
	 			taskName.addEventListener("dblclick" , function()   { makeEditField(tr , taskName, 0, i + 1) ;  }  );

	 			let taskMentor = document.createElement("td");
	 			taskMentor.innerHTML = dataList[i].mentor ;
	 			taskMentor.addEventListener("dblclick" , function() { makeEditField(tr , taskMentor, 1, i + 1) ;  }  );

	 			let taskDate = document.createElement("td");
	 			taskDate.innerHTML = dataList[i].date ;
	 			taskDate.addEventListener("dblclick" , function()   { makeEditField(tr , taskDate,  2, i + 1) ; }  );


	 			let button = document.createElement("button");
				button.style.height = "25px";
			    button.style.width = "60%";
			    button.style.fontsize = "200px";
			    button.setAttribute("value" , "edit");
			    button.innerHTML = "Edit" ;
			    button.addEventListener("click" , function() { createEditButton(dataList[i].position) ; } );
			    button.addEventListener("click" , function() { fetchRow(dataList[i].position) ; });

	            tr.appendChild(taskName);
	            tr.appendChild(taskMentor);
	            tr.appendChild(taskDate);
	            tr.appendChild(button);
	 			tbody.appendChild(tr);
		}  

	}





     /**********    Add a extra page in the pagination bar if elements cross the current limit   ****************/ 

 
  function  addNewPage(pageNo){


			let ul = document.getElementById("pageTab");
			let li = document.createElement("li");
	        let a  = document.createElement("a");
	        a.addEventListener("click" , function(){ showPageContent(pageNo) ; });
	        a.innerText = pageNo ;
	        li.appendChild(a) ;
	        ul.appendChild(li);

    }



  /************** Initial pagination when a page is loaded  ******************/

     
  function initialPagination(){
				

		   let totalData = JSON.parse(localStorage.getItem("allData"));
		   let size = totalData.length ; 
		   let numberFix = Math.ceil(size / 5);
		   let ul = document.getElementById("pageTab");

		   if(size <= 5)
		       return ;

		   for(let i = 1;i <= numberFix; ++i){
		   	
		        let li = document.createElement("li");
		        let a  = document.createElement("a");
		        a.addEventListener("click" , function(){ showPageContent(i) ; });
		        a.innerText = i ;
		        li.appendChild(a) ;
		        ul.appendChild(li);
		         

		   }

		}


    /***************   Initial Function Calling ***********/


    
    createAddButton(); 
    initialize();
    showPageContent(1);
    initialPagination();

}