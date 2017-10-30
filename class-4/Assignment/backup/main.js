
window.onload = function(){

		function  initialize(){
			
		   
		   if(localStorage.getItem("allData") == "undefined" || localStorage.getItem("allData") == null){
		   	
		          let arr = new Array();
		          localStorage.setItem("allData" , JSON.stringify(arr));
		     
		   }

		   if(localStorage.getItem("currentPage") == "undefined" || localStorage.getItem("currentPage") == null){
		   	
		   	      
		   	      localStorage.setItem("currentPage" , 1);
		   }

		}



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
		 			taskName.innerText = taskObject.task ;

		 			let taskMentor = document.createElement("td");
		 			taskMentor.innerText = taskObject.mentor ;

		 			let taskDate = document.createElement("td");
		 			taskDate.innerText = taskObject.date ;

		            tr.appendChild(taskName);
		            tr.appendChild(taskMentor);
		            tr.appendChild(taskDate);
		 			tbody.appendChild(tr);
			}

		}




		function initialPagination(){
				

		   let totalData = JSON.parse(localStorage.getItem("allData"));
		   let size = totalData.length ; 
		   let numberFix = Math.floor(size / 5) + 1 ;
		   let ul = document.getElementById("pageTab");

		   for(let i = 1;i <= numberFix ; ++i){
		   	
		        let li = document.createElement("li");
		        let a  = document.createElement("a");
		        a.addEventListener("click" , function(){ showPageContent(i) ; });
		        a.innerText = i ;
		        li.appendChild(a) ;
		        ul.appendChild(li);
		         

		   }

		}



		function  showCurrentData(taskObject){
			
                    

		 			let tbody = document.getElementById("tableList");
		 			let tr = document.createElement("tr");

		 			let taskName = document.createElement("td");
		 			taskName.innerText = taskObject.task ;

		 			let taskMentor = document.createElement("td");
		 			taskMentor.innerText = taskObject.mentor ;

		 			let taskDate = document.createElement("td");
		 			taskDate.innerText = taskObject.date ;

		 			tr.appendChild(taskName);
		            tr.appendChild(taskMentor);
		            tr.appendChild(taskDate);
		 			tbody.appendChild(tr);


		}


 
        function  addNewPage(pageNo){


				let ul = document.getElementById("pageTab");
        		let li = document.createElement("li");
		        let a  = document.createElement("a");
		        a.addEventListener("click" , function(){ showPageContent(pageNo) ; });
		        a.innerText = pageNo ;
		        li.appendChild(a) ;
		        ul.appendChild(li);

        	

        }


        function  decideToAddPage(position){
        	
        	let dataList = JSON.parse(localStorage.getItem("allData"));

        	if(dataList.length % 5 == 0)
        	    addNewPage((dataList.length / 5) + 1);


        }


		function  decideToShow(taskObject){
			
		    let page = JSON.parse(localStorage.getItem("currentPage"));
		    let startRange = (page - 1) * 5 ;
		    let endRange =   (page * 5) - 1 ;

		    console.log(taskObject.position);
		    console.log(startRange);
		    console.log(endRange);

		    if(taskObject.position >= startRange && taskObject.position <= endRange)
		         showCurrentData(taskObject);


		    decideToAddPage(taskObject.position);

		}


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


		function  getInputData(){
			
		   let task = document.getElementById("task");
		   let mentor = document.getElementById("mentor");
		   let date = document.getElementById("date");

		   storeData(task.value , mentor.value , date.value);

		   task.value = mentor.value = date.value = "";
		}


		
		document.getElementById("submitButton").addEventListener("click" , getInputData);

        
        initialize();
        showPageContent(1);
		initialPagination();




}