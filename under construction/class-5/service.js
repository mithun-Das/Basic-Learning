(function(){

  angular.module('managerApp')
   .service('managerService',managerService);
   


function managerService(){


    var service = this;

	    service.editIndex ;
      service.currentName;
      service.dataList = JSON.parse(localStorage.getItem("userList"));

        
      service.addUser = function(){

           if(service.validation() == false)
               return ;

            
            let userObject = {

            	name : document.getElementById("name").value,
            	email : document.getElementById("email").value,
            	phone : document.getElementById("phone").value,
            	joiningDate : document.getElementById("joiningDate").value
            } ;


            
            service.addUserInLocalstorage(userObject);
            service.addUserInAngularContext(userObject);
            service.makeInputFieldEmpty();


      } ;


      service.addUserInLocalstorage = function(userObject){
         
         let userData = JSON.parse(localStorage.getItem("userList"));
         userData.push(userObject);

         localStorage.setItem("userList" , JSON.stringify(userData));


      } ;



      service.addUserInAngularContext = function(userObject){
         
         service.dataList.push(userObject);

      } ;



      service.doEdit = function(index){
           
            service.editIndex = index;
           	document.getElementById("name").value = service.dataList[index].name;
           	document.getElementById("email").value = service.dataList[index].email;
           	document.getElementById("phone").value = service.dataList[index].phone;
           	document.getElementById("joiningDate").value = service.dataList[index].joiningDate;

           	document.getElementById("addButton").style.display = 'none';
           	document.getElementById("editButton").style.display = 'block';
      };


      service.saveEdit = function(){
             
           if(service.validation() == false)
           	  return ;
           
           let userObject = {

               name  :  document.getElementById("name").value ,
               email :  document.getElementById("email").value ,
               phone :	document.getElementById("phone").value ,
               joiningDate : document.getElementById("joiningDate").value

           } ;


           service.dataList[service.editIndex] = userObject ;

           let dataList = JSON.parse(localStorage.getItem("userList"));
           dataList[service.editIndex] = userObject ;
           localStorage.setItem("userList" , JSON.stringify(dataList));

           document.getElementById("editButton").style.display = 'none';
           document.getElementById("addButton").style.display =  'block';
           service.makeInputFieldEmpty();

      };

      

      service.doDelete = function(index){

           service.dataList.splice(index,1);
           service.deleteFromLocalstorage(index);        

      };


      service.deleteFromLocalstorage = function(index){

          let userData = JSON.parse(localStorage.getItem("userList"));
          userData.splice(index,1);
          localStorage.setItem("userList" ,JSON.stringify(userData));

      };


      service.validation = function(){

      	   if(document.getElementById("name").value == ""){

      	   	   alert("Name is required");
      	   	     return false;
      	   }
      	   else if(document.getElementById("name").value == ""){

      	   	   alert("Name is required");
      	   	     return false;
      	   }
      	   else if(document.getElementById("name").value == ""){

      	   	   alert("Name is required");
      	   	     return false;
      	   }
      	   else if(document.getElementById("name").value == ""){

      	   	   alert("Name is required");
      	   	     return false;
      	   }


      	   return true;
      };


      service.showImage = function(name){
          
          service.currentName = name;

      }

      service.resizeName = function(name){
        return name + "aa";
      }


      service.makeInputFieldEmpty = function(){
          

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("joiningDate").value = "";

      };

}



})();