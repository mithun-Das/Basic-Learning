(function(){



   angular.module('managerApp',[])
   .controller('managerController',managerController);
   
   

   
    managerController.$inject = ['$scope', 'managerService'];

   function managerController($scope, managerService){
      
      $scope.editIndex = managerService.editIndex ;
      $scope.currentName;
      $scope.dataList = managerService.dataList ;

        
      $scope.addUser = managerService.addUser ;


      $scope.addUserInLocalstorage =  managerService.addUserInLocalstorage;


      $scope.addUserInLocalstorage =  managerService.addUserInAngularContext ;


      $scope.doEdit = managerService.doEdit ;

      $scope.saveEdit =  managerService.saveEdit ;

      

      $scope.doDelete =  managerService.doDelete ;


      $scope.deleteFromLocalstorage =  managerService.deleteFromLocalstorage ;


      $scope.validation =  managerService.validation ;

      //$scope.showImage = managerService.showImage ;
      $scope.showImage = function(name){

          $scope.currentName = name;
      }


      $scope.makeInputFieldEmpty =  managerService.makeInputFieldEmpty;

            
   }
     

 

})();


// /*********** Setting Primary Necessary variable on local Storage ***********/


     function initialize(){


          if(localStorage.getItem("userList") == "undefined" || localStorage.getItem("userList") == null ){


                let userData = new Array();
                localStorage.setItem("userList" , JSON.stringify(userData));


          }


     }


     initialize();