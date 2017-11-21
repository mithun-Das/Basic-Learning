(function(){

  angular.module('managerApp')
   .filter('searchByName',searchByNameFilter);

      function searchByNameFilter(){

         return function(input , search){

              var users = input.filter(function(item){
		              		if(item.name.indexOf(search) > -1 || search == null) {
		              			return item;
		              		}
		              })


               return users ;
  

            }
        }


})();