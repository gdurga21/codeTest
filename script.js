var app = angular.module('myApp', []);

app.controller('myCtrl', function($timeout,$scope,$http,$filter) {
  var persons=[];
  var cb="clk";
  var editdata=0;
  function SortById(x, y){
    	  return ((x.id < y.id) ? -1 : ((x.id > y.id) ? 1 : 0));
    	}
  function PersonsPush(person){
    	  var numOfPersons = person.length;
    for (var i = 0; i < numOfPersons; i++) {
      persons.push({
        id:person[i].id,
        firstName: person[i].firstName,
        lastName: person[i].lastName,
        status:person[i].status,
        date:new Date(person[i].Date),
        priority:person[i].priority
      });
    }
    persons.sort(SortById);
    	}
    	
      $http.get('person.json').success(function(data){
    var person_json = data.person;
    $scope.person_json=person_json;
    PersonsPush($scope.person_json);
    });
    $scope.addrow=function(){
      persons.push({
        id:$scope.person.id,
        firstName: $scope.person.firstName,
        lastName: $scope.person.lastName,
        status:$scope.status,
        date:new Date($scope.person.date),
        priority:$scope.person.priority
      });
      $scope.person.id="";
      $scope.person.firstName="";
      $scope.person.lastName="";
      $scope.status=0;
      $scope.person.date=null;
      $scope.person.priority="";
      editdata=0;
    persons.sort(SortById);
    }
    
    $scope.completed=function(){
      var data=[];
      cb="completed";
      for(var i=0;i<persons.length;i++){
        if(persons[i].status=="completed"){
          data.push({
        id:persons[i].id,
        firstName: persons[i].firstName,
        lastName: persons[i].lastName,
        status:persons[i].status,
        date:new Date(persons[i].date),
        priority:persons[i].priority
      });
        }
      }
      $scope.persons=data;
    }
    $scope.notcompleted=function(){
      var data=[];
      cb="notcompleted";
      for(var i=0;i<persons.length;i++){
        if(persons[i].status!="completed"){
           data.push({
        id:persons[i].id,
        firstName: persons[i].firstName,
        lastName: persons[i].lastName,
        status:persons[i].status,
        date:new Date(persons[i].date),
        priority:persons[i].priority
      });
        }
      }
      $scope.persons=data;
    }
    
    $scope.remove=function(id){
      for(var i=0;i<persons.length;i++){
        if(id==persons[i].id){
        persons.splice(i,1);
        if(cb=="completed"){
          $scope.completed();
        }else if(cb=="notcompleted"){
          $scope.notcompleted();
        }
        break;
        }
      }
    }
    $scope.edit=function(person){
      $scope.person=person;
      $scope.status=person.status;
      for(var i=0;i<persons.length;i++){
        if(person.id==persons[i].id){
          persons.splice(i,1);
          editdata=1;
          break;
        }
      }
    }
    $scope.append=function(){
      if(editdata){
        $scope.addrow();
      }
    }
      $scope.persons=persons;
      $scope.refreshData=function(){
       $scope.persons = $filter('date')(persons, $scope.fname); 
      }
      $scope.orderdate=function(){
        $scope.order="date";
      }
      $scope.orderpriority=function(){
        $scope.order="priority";
      }
      });

