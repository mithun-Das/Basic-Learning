
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



        /**********  Upascored coloumn  data show on  current  page  ****************/

        
    function coloumnEditInPage(td , text){
        	
             td.innerHTML = text;

        }


        /**********  Upscored coloumn data store on localStorage   ****************/


    function coloumnEditInDatabase(namePosition , cellNo , value){
        	
            
        	let dataList = JSON.parse(localStorage.getItem("allData")); 

        	console.log(namePosition);

        	if(cellNo == 0)
        	   dataList[namePosition - 1].name = value;
        	else if(cellNo == 1)
        	   dataList[namePosition - 1].subject = value ;
        	else if(cellNo == 2)
        	   dataList[namePosition - 1].score = value ;

        	
        	localStorage.setItem("allData" , JSON.stringify(dataList));  
        	
        	 

        }







	function makeEditField(tr, td, cellNo, namePosition){
			
             
             let tbody = document.getElementById("tableList");

             let rowField = tr ;
             let coloumnField = td ;

             let text = td.innerText ;
             td.innerHTML = "" ;
             let input = document.createElement("input");

             if(cellNo == 2)
               input.setAttribute("type" , "score");
             else
               input.setAttribute("type" , "text") ;

             input.setAttribute("value" , text);
			 input.addEventListener("blur" , function() { coloumnEditInDatabase(namePosition, cellNo, input.value ) ; } );
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
	         editButton.innerText = "Edit name" ;
	         editButton.addEventListener("click" , function() { storeUpscoredRowData(position) ;  });

	         document.getElementById("inputPart").appendChild(editButton);

	     }


    /**************** Existed data fetch in the input field  ******************/


    function  fetchRow(position){


        	 
        	 let dataList = JSON.parse(localStorage.getItem("allData")) ;
        	
             document.getElementById("name").value = dataList[position -1].name;
             document.getElementById("subject").value = dataList[position - 1].subject;
             document.getElementById("score").value = dataList[position - 1].score;

        }


     /*************  Show currently added data in page    **************/

    function  showCurrentData(nameObject){
    	
          
 			let tbody = document.getElementById("tableList");
 			let tr = document.createElement("tr");

 			let nameName = document.createElement("td");
 			nameName.innerText = nameObject.name ;
 			nameName.addEventListener("dblclick" , function()   { makeEditField(tr , nameName, 0, nameObject.position) ;  }  );

 			let namesubject = document.createElement("td");
 			namesubject.innerText = nameObject.subject ;
 			namesubject.addEventListener("dblclick" , function() { makeEditField(tr , namesubject, 1, nameObject.position) ;  }  );

 			let namescore = document.createElement("td");
 			namescore.innerText = nameObject.score ;
 			namescore.addEventListener("dblclick" , function()   { makeEditField(tr , namescore,  2, nameObject.position) ; }  );


 			let button = document.createElement("button");
			button.style.height = "25px";
		    button.style.width = "60%";
		    button.style.fontsize = "200px";
		    button.setAttribute("value" , "edit");
		    button.innerHTML = "Edit" ;
    		button.addEventListener("click" , function() { createEditButton(nameObject.position) ; } );
		    button.addEventListener("click" , function() { fetchRow(nameObject.position) ; });


 			tr.appendChild(nameName);
            tr.appendChild(namesubject);
            tr.appendChild(namescore);
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


	function  decideToShow(nameObject){
			
		    let page = JSON.parse(localStorage.getItem("currentPage"));
		    let startRange = (page - 1) * 5 ;
		    let endRange =   (page * 5) - 1 ;


		    if(nameObject.position - 1 >= startRange && nameObject.position - 1 <= endRange)
		         showCurrentData(nameObject);

		    decideToAddPage(nameObject.position);

		}





        /**********   Store new data in localStorage ****************/


     function  storeNewData(){
     	

           let dataList = JSON.parse(localStorage.getItem("allData")) ;

		   let name = document.getElementById("name");
		   let subject = document.getElementById("subject");
		   let score = document.getElementById("score");  
		   let nameObject = {name : name.value, subject : subject.value , score : score.value , position : ( dataList.length + 1)} ;
		   dataList.push(nameObject);
		   localStorage.setItem("allData" , JSON.stringify(dataList));


		   name.value = subject.value = score.value = "";

		   decideToShow(nameObject);

     }


     /*******************  Validation for input data   ******************/


     function  validation(){
     	

     	   let name = document.getElementById("name");
		   let subject = document.getElementById("subject");
		   let score = document.getElementById("score");

		   if( name.value == ""){
		     alert("name Field is Required");
		     return ;
		   }
		   else if(subject.value == ""){
		   	  
		   	  alert("subject is required");
		   	  return ;

		   }
		   else if(score.value == ""){
		   	
		   	  alert("score is required");
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
         addButton.innerText = "Add name" ;
         addButton.addEventListener("click" , validation);

         document.getElementById("inputPart").appendChild(addButton);

     }


  /************* Set previous add name mode after edit  ****************/


  function  setPreviousMode(){
 	

	 	document.getElementById("name").value = "" ;
	 	document.getElementById("subject").value = "" ;
	 	document.getElementById("score").value = "" ;

	 	let parrent = document.getElementById("inputPart");
	 	let child   = document.getElementById("editButton");

	 	parrent.removeChild(child);

	 	createAddButton();
 }


   
  /****************** Show Upscored Row in Table ******************/ 

  function  showUpscoredRow(position , name , subject , score){
 	
	     let tbody = document.getElementById("tableList");

	     tbody.rows[position - 1].cells[0].innerHTML = name ;
	     tbody.rows[position - 1].cells[1].innerHTML = subject ;
	     tbody.rows[position - 1].cells[2].innerHTML = score ;


 }


  /************* Store Currently  upscored row data ***************/


  function  storeUpscoredRowData(position ){
     	

     	if(document.getElementById("name").value == null){
     		
     		alert("name field required");
     		return ;
     	}
     	else if(document.getElementById("subject").value == null){
     		

     		alert("subject field required");
     		return;
     	}
     	else if(document.getElementById("score").value == null){
     		
     		alert("score is required");
     		return ;
     	}


     	let dataList = JSON.parse(localStorage.getItem("allData"));
     	dataList[position - 1].name = document.getElementById("name").value ;
     	dataList[position - 1].subject = document.getElementById("subject").value ;
     	dataList[position - 1].score = document.getElementById("score").value ;
     	showUpscoredRow( position , dataList[position - 1].name, dataList[position - 1].subject , dataList[position - 1].score) ;

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

	 			let nameName = document.createElement("td");
	 			nameName.innerHTML = dataList[i].name ;
	 			nameName.addEventListener("dblclick" , function()   { makeEditField(tr , nameName, 0, i + 1) ;  }  );

	 			let namesubject = document.createElement("td");
	 			namesubject.innerHTML = dataList[i].subject ;
	 			namesubject.addEventListener("dblclick" , function() { makeEditField(tr , namesubject, 1, i + 1) ;  }  );

	 			let namescore = document.createElement("td");
	 			namescore.innerHTML = dataList[i].score ;
	 			namescore.addEventListener("dblclick" , function()   { makeEditField(tr , namescore,  2, i + 1) ; }  );


	 			let button = document.createElement("button");
				button.style.height = "25px";
			    button.style.width = "60%";
			    button.style.fontsize = "200px";
			    button.setAttribute("value" , "edit");
			    button.innerHTML = "Edit" ;
			    button.addEventListener("click" , function() { createEditButton(dataList[i].position) ; } );
			    button.addEventListener("click" , function() { fetchRow(dataList[i].position) ; });

	            tr.appendChild(nameName);
	            tr.appendChild(namesubject);
	            tr.appendChild(namescore);
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