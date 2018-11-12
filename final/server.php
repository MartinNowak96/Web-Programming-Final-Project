<?php
$task = $_GET["task"];
if($task == "getEmployees"){
  $file = file_get_contents("employees.txt");
  $file2 = file_get_contents("deployments.txt");
  $deployements = explode("\n", $file2);//seperate each line
  $employees = explode("\n", $file);//seperate each line

  $employeesToSend = array();

  foreach ($employees as $person => $value) {
      $user = explode(",", $value);
      $userObject = null;
      $userObject->id = $user[0];
      $userObject->name = $user[1]." ".$user[2];
      $userObject->phone = $user[3];
      $userObject->address = $user[4];
      $userDeploy = array();
      
      foreach ($deployements as $deployement) {
        
        $deploy =explode(';', $deployement);
        $deployEmployeeIDs =explode(',', $deploy[0]);
        
        foreach ($deployEmployeeIDs as $id) {
          //echo($id);
          if($id == $user[0]){
            $tempDeploy->employees = $deployEmployeeIDs;
            $tempDeploy->startDate = $deploy[1];
            $tempDeploy->endDate = $deploy[2];
            $tempDeploy->description = $deploy[3];
            array_push($userDeploy, $tempDeploy);
          }
        }
      }
      $userObject->deployments = $userDeploy;
      array_push($employeesToSend, $userObject);
    }
  $myJSON = json_encode($employeesToSend);
  echo ($myJSON);
}
if($task == "login"){
  $userName = $_GET["user"];
  $pass = $_GET["pass"];
  $file = file_get_contents("users.txt");
  $user = explode("\n", $file);//seperate each line
  $output = "false";
  foreach ($user as $person) {
    $userData = explode(',', $person);
    if($userName == $userData[0] && $pass == $userData[1]){
      $output = "true";
    }
  }
  echo($output);
}
?>
