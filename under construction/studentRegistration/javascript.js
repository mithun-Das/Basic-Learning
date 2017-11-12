
window.onload = function(){

   

   function checkNameField(event){


        if(event.key >= 'a' && event.key <= 'z')
        	return ;
        else
        {

        	alert("name should be contain only alphabet");
        	return ;
        }
   }


   function checkRollField(){

        if(event.key >= '0' && event.key <= '9')
        	return ;
        else
        {

        	alert("name should be contain only digit");
        	return ;
        }

   }



   function checkRegField(){

        if(event.key >= '0' && event.key <= '9')
        	return ;
        else
        {

        	alert("name should be contain only digit");
        	return ;
        }

   }


      function checkcgpaField(){

        if( (event.key >= '0' && event.key <= '9' ) || event.key =='.')
        	return ;
        else
        {

        	alert("name should be contain only digit");
        	return ;
        }

   }



   function validation(){

        let name =  document.getElementById("name").value ;
        let roll =  document.getElementById("roll").value ;
        let regNo = document.getElementById("regNo").value ;
        let cgpa = document.getElementById("cgpa").value;

        if(name == "")
        {

        	 alert("name field is required");
        	 return false;
        }
        else if(roll == "")
        {

        	 alert("Roll field is required");
        	 return false;
        }
        else if(regNo == "")
        {

        	 alert("Registration field is required");
        	 return false;
        }
        else if(cgpa == "")
        {

        	 alert("CGPA field is required");
        	 return false;
        }


        for(let i = 0;i < name.length; ++i){

        	if(name[i] >= 'a' && name[i] <= 'z')
        		continue ;
        	else
        	{
        		alert("Name is not valid");
        		return false;
        	}
        }

    return true ;

   }


   function doAddInLocalstorage(){
           
           if(validation() == false)
           	 return ;

           	console.log("sdsdsd");

   }


   document.getElementById("name").addEventListener("keypress" ,  function() { checkNameField(event) ;  } );
   document.getElementById("roll").addEventListener("keypress" ,  function() { checkRollField(event) ;  } );
   document.getElementById("regNo").addEventListener("keypress" ,  function() { checkRegField(event) ;  } );
   document.getElementById("cgpa").addEventListener("keypress" ,  function() { checkcgpaField(event) ;  } );
   document.getElementById("submit").addEventListener("click" , doAddInLocalstorage)



}