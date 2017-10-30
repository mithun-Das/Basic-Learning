
window.onload = function(){

      

       /*********  Create Input Field *****************/



		function  createInputField(){

               
               let mainDiv = document.getElementById("inputPart") ;

               let task = document.createElement("p") ;
               let taskInput = document.createElement("input") ;
			   let newline = document.createElement("br");
               taskInput.id = "task" ;
               taskInput.className = "inputField" ;
               taskInput.setAttribute("placeholder" , "Enter the task name");
               taskInput.setAttribute("type" , "text");
               task.innerText = "Task :" ;
               task.appendChild(taskInput);
               mainDiv.appendChild(task);
               mainDiv.appendChild(newline);


               let mentor = document.createElement("p") ;
               let mentorInput = document.createElement("input") ;
               mentorInput.id = "mentor" ;
               mentorInput.className = "inputField" ;
               mentorInput.setAttribute("placeholder" , "Enter the mentor name");
               mentorInput.setAttribute("type" , "text");
               mentor.innerText = "mentor :" ;
               mentor.appendChild(mentorInput);
               mainDiv.appendChild(mentor);
               mainDiv.appendChild(newline);


               let date = document.createElement("p") ;
               let dateInput = document.createElement("input") ;
               dateInput.id = "date" ;
               dateInput.className = "inputField" ;
               dateInput.setAttribute("placeholder" , "Enter the date ");
               dateInput.setAttribute("type" , "date");
               date.innerText = "date :" ;
               date.appendChild(dateInput);
               mainDiv.appendChild(date);
               mainDiv.appendChild(newline);


               let buttonInput = document.createElement("button") ;
               
               buttonInput.id = "submitButton" ;
               buttonInput.className = "buttonField" ;
               buttonInput.setAttribute("placeholder" , "Enter the date ");
               buttonInput.setAttribute("type" , "button");
               buttonInput.innerText = "Add Task :" ;
               buttonInput.addEventListener("click" , validation);
               mainDiv.appendChild(buttonInput);
               mainDiv.appendChild(newline);


		}


          /*********  Show Updated Row Data *****************/

            function  showUpdatedRow(taskObject , tr){

            	tr.innerHTML = "" ;
            	let tbody = document.getElementById("tableList");



            		let taskName = document.createElement("td");
		 			taskName.innerHTML = taskObject.task ;
		 			taskName.addEventListener("dblclick" , function()   { makeEditField(tr , taskName, 0, taskObject.position) ;  }  );

		 			let taskMentor = document.createElement("td");
		 			taskMentor.innerHTML = taskObject.mentor ;
		 			taskMentor.addEventListener("dblclick" , function() { makeEditField(tr , taskMentor, 1, taskObject.position) ;  }  );

		 			let taskDate = document.createElement("td");
		 			taskDate.innerHTML = taskObject.date ;
		 			taskDate.addEventListener("dblclick" , function()   { makeEditField(tr , taskDate,  2, taskObject.position) ; }  );


		 			let button = document.createElement("button");
					button.style.height = "25px";
				    button.style.width = "60%";
				    button.style.fontsize = "200px";
				    button.setAttribute("value" , "edit");
				    button.innerHTML = "Edit" ;
				    button.addEventListener("click" , function() { createRowEditField(taskObject, tr) ; });

		            tr.appendChild(taskName);
		            tr.appendChild(taskMentor);
		            tr.appendChild(taskDate);
		            tr.appendChild(button);
		 			tbody.appendChild(tr);
                    

                    document.getElementById("inputPart").innerHTML = "";
		 			createInputField() ;



            }


			/***********  Edit Data in Database   *****************/




            function  rowEditInDatabase(prevTask,editedTask , editedMentor, editedDate, position , tr){


			   let dataList = JSON.parse(localStorage.getItem("allData"));

               let taskObject = {task : editedTask , mentor : editedMentor , date : editedDate, position : position} ;

			   localStorage.removeItem(prevTask) ;
			   localStorage.setItem(editedTask , JSON.stringify(taskObject)) ;

			   dataList[taskObject.position] = taskObject.task ;
			   localStorage.setItem("allData" , JSON.stringify(dataList));

			   showUpdatedRow(taskObject , tr);


            }

			/*********  Create Edit Input Field *****************/

	        function  createRowEditField(taskObject , tr){


	           let mainDiv = document.getElementById("inputPart") ;
	           mainDiv.innerHTML = "";

               let task = document.createElement("p") ;
               let taskInput = document.createElement("input") ;
			   let newline = document.createElement("br");
               taskInput.id = "task" ;
               taskInput.className = "inputField" ;
               taskInput.setAttribute("placeholder" , "Enter the task name");
               taskInput.setAttribute("type" , "text");
               task.innerText = "Task :" ;
               task.appendChild(taskInput);
               mainDiv.appendChild(task);
               mainDiv.appendChild(newline);


               let mentor = document.createElement("p") ;
               let mentorInput = document.createElement("input") ;
               mentorInput.id = "mentor" ;
               mentorInput.className = "inputField" ;
               mentorInput.setAttribute("placeholder" , "Enter the mentor name");
               mentorInput.setAttribute("type" , "text");
               mentor.innerText = "mentor :" ;
               mentor.appendChild(mentorInput);
               mainDiv.appendChild(mentor);
               mainDiv.appendChild(newline);


               let date = document.createElement("p") ;
               let dateInput = document.createElement("input") ;
               dateInput.id = "date" ;
               dateInput.className = "inputField" ;
               dateInput.setAttribute("placeholder" , "Enter the date ");
               dateInput.setAttribute("type" , "date");
               date.innerText = "date :" ;
               date.appendChild(dateInput);
               mainDiv.appendChild(date);
               mainDiv.appendChild(newline);


	           let editTask = document.getElementById("task");
			   let editMentor = document.getElementById("mentor");
			   let editDate = document.getElementById("date");
	           

	           editTask.value = taskObject.task ;
	           editMentor.value = taskObject.mentor ;
	           editDate.value = taskObject.date ;



               let buttonInput = document.createElement("button") ;             
               buttonInput.id = "editButton" ;
               buttonInput.className = "buttonField" ;
               buttonInput.setAttribute("type" , "button");
               buttonInput.innerText = "Edit :" ;
               buttonInput.addEventListener("click" ,  function() { rowEditInDatabase(taskObject.task , editTask.value , editMentor.value , editDate.value,taskObject.position , tr) ;  });
               mainDiv.appendChild(buttonInput);
               mainDiv.appendChild(newline);


        }



        /*************   Data Install on LocalStorage  ************/


		function  initialize(){
			
		   
		   if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null){
		   	
		          let arr = new Array();
		          localStorage.setItem("allData" , JSON.stringify(arr));
		     
		   }

		   if(localStorage.getItem("currentPage") == "undefined" || localStorage.getItem("currentPage") == null){
		   	
		   	      
		   	      localStorage.setItem("currentPage" , 1);
		   }

		}


        /**********  Upadated coloumn  data show on  current  page  ****************/

        
        function doEditInPage(td , text){
        	
             td.innerHTML = text;


        }



        /**********  Updated coloumn data store on localStorage   ****************/


        function doEditInDatabase(taskPosition , cellNo , value){
        	
            
        	let dataList = JSON.parse(localStorage.getItem("allData"));
        	let task = dataList[taskPosition];
        	let taskObject = JSON.parse(localStorage.getItem(task));
        	let name = value;

        	if(cellNo == 0)
        	   taskObject.task = value;
        	else if(cellNo == 1)
        	   taskObject.mentor = value ;
        	else if(cellNo == 2)
        	   taskObject.date = value ;


        	if(cellNo == 0){

        	   
        	   let dataList = JSON.parse(localStorage.getItem("allData"));
        	   dataList[taskObject.position] = name;
        	   localStorage.setItem("allData" , JSON.stringify(dataList));
        	   localStorage.setItem(name, JSON.stringify( taskObject));   /********   Error Have to be fixed  ********/
        	   

                

        	}
        	else
        	   localStorage.setItem(task , JSON.stringify(taskObject));
        	      

        }




        /**********    Make a coloum cell editable  when it is double clicked  ****************/


		function makeEditField(tr, td, cellNo, taskPosition){
			
             
             let tbody = document.getElementById("tableList");

             let rowField = tr ;
             let coloumnField = td ;

             let text = td.innerHTML ;
             td.innerHTML = "" ;
             let input = document.createElement("input");
             input.setAttribute("type" , "text");
             input.setAttribute("value" , text);
            // task = JSON.parse(localStorage.getItem());
             input.addEventListener("blur" , function() { doEditInPage(td , input.value ) ; } );
             input.addEventListener("blur" , function() { doEditInDatabase(taskPosition, cellNo, input.value ) ; } );
             td.appendChild(input);

		}


        /**********    Content Show Of a specific page     ****************/


		function  showPageContent(pageNumber){


            localStorage.setItem("currentPage" , pageNumber);
			document.getElementById("tableList").innerHTML = null ;
			
		    let taskList = JSON.parse(localStorage.getItem("allData"));
			let startRange = (pageNumber - 1) * 5 ;
			let endRange   = (pageNumber * 5) - 1 ;

			let tbody = document.getElementById("tableList");

			for(let i = startRange ; i <= endRange && i < taskList.length ; ++i){
				

		 			let task= taskList[i] ;
		 			let taskObject = JSON.parse(localStorage.getItem(task));
		 			
		 			let tr = document.createElement("tr");

		 			let taskName = document.createElement("td");
		 			taskName.innerHTML = taskObject.task ;
		 			taskName.addEventListener("dblclick" , function()   { makeEditField(tr , taskName, 0, taskObject.position) ;  }  );

		 			let taskMentor = document.createElement("td");
		 			taskMentor.innerHTML = taskObject.mentor ;
		 			taskMentor.addEventListener("dblclick" , function() { makeEditField(tr , taskMentor, 1, taskObject.position) ;  }  );

		 			let taskDate = document.createElement("td");
		 			taskDate.innerHTML = taskObject.date ;
		 			taskDate.addEventListener("dblclick" , function()   { makeEditField(tr , taskDate,  2, taskObject.position) ; }  );


		 			let button = document.createElement("button");
					button.style.height = "25px";
				    button.style.width = "60%";
				    button.style.fontsize = "200px";
				    button.setAttribute("value" , "edit");
				    button.innerHTML = "Edit" ;
				    button.addEventListener("click" , function() { createRowEditField(taskObject, tr) ; });

		            tr.appendChild(taskName);
		            tr.appendChild(taskMentor);
		            tr.appendChild(taskDate);
		            tr.appendChild(button);
		 			tbody.appendChild(tr);
			}

		}



        /**********    Create initial pagination bar when the page is loaded  first      ****************/


		function initialPagination(){
				

		   let totalData = JSON.parse(localStorage.getItem("allData"));
		   let size = totalData.length ; 
		   let numberFix = Math.ceil(size / 5);
		   let ul = document.getElementById("pageTab");

		   if(numberFix == 0)
		       numberFix = 1;

		   for(let i = 1;i <= numberFix; ++i){
		   	
		        let li = document.createElement("li");
		        let a  = document.createElement("a");
		        a.addEventListener("click" , function(){ showPageContent(i) ; });
		        a.innerText = i ;
		        li.appendChild(a) ;
		        ul.appendChild(li);
		         

		   }

		}


        /**********  Show recently added data in the page if the page has less than 5 elements  ****************/


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
				    button.addEventListener("click" ,  function() {  createRowEditField(taskObject , tr); } );

		 			tr.appendChild(taskName);
		            tr.appendChild(taskMentor);
		            tr.appendChild(taskDate);
		            tr.appendChild(button);
		 			tbody.appendChild(tr);


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


		/**********   Decide to add page    ****************/


        function  decideToAddPage(position){
        	
        	let dataList = JSON.parse(localStorage.getItem("allData"));

        	if(dataList.length % 5 == 0)
        	    addNewPage((dataList.length / 5) + 1);


        }


		/**********   Decide to show current Element  in the  page     ****************/


		function  decideToShow(taskObject){
			
		    let page = JSON.parse(localStorage.getItem("currentPage"));
		    let startRange = (page - 1) * 5 ;
		    let endRange =   (page * 5) - 1 ;


		    if(taskObject.position >= startRange && taskObject.position <= endRange)
		         showCurrentData(taskObject);


		    decideToAddPage(taskObject.position);

		}


		/**********  store data on locaStorage     ****************/


		function  storeData(task , mentor , date){
		   
			
		   let data = localStorage.getItem("allData");
		   let dataList = JSON.parse(data);
		   let position = dataList.length ;
		   let taskObject = {task : task, mentor : mentor , date : date, position : position} ;
		   dataList.push(task);
		   localStorage.setItem(task, JSON.stringify(taskObject));
		   localStorage.setItem("allData" , JSON.stringify(dataList));

		   decideToShow(taskObject);

		}




        /**********   Get input data from input field         ****************/


		function  getInputData(){          

			
		   let task = document.getElementById("task");
		   let mentor = document.getElementById("mentor");
		   let date = document.getElementById("date");

		   storeData(task.value , mentor.value , date.value);

		   task.value = mentor.value = date.value = "";
		}


		/**********   Validate data  of input field  ****************/


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


		   getInputData();


		}



        /**********  Initial necessarry function calling  ****************/

        createInputField();
        initialize();
        showPageContent(1);
		initialPagination();





}