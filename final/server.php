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
            $tempDeploy->long =$deploy[4];
            $tempDeploy->lat =$deploy[5];
            array_push($userDeploy, $tempDeploy);
          }

        }
        $deploy = null;
        $deployEmployeeIDs = null;
      }
      $userObject->deployments = $userDeploy;
      array_push($employeesToSend, $userObject);
    }
  $myJSON = json_encode($employeesToSend);
  echo ($myJSON);
}
else if($task == "login"){
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
else if($task == "getDeployments"){
  $file2 = file_get_contents("deployments.txt");
  $deployements = explode("\n", $file2);//seperate each line
  $sendArray= array();
  foreach ($deployements as $deployement) {
    $tempDeploy = null;
    $deploy =explode(';', $deployement);
    $deployEmployeeIDs =explode(',', $deploy[0]);
    $tempDeploy->employees = $deployEmployeeIDs;
    $tempDeploy->startDate = $deploy[1];
    $tempDeploy->endDate = $deploy[2];
    $tempDeploy->description = $deploy[3];
    $tempDeploy->long =$deploy[4];
    $tempDeploy->lat =$deploy[5];
    array_push($sendArray, $tempDeploy);

  }
  echo(json_encode($sendArray));
}
else if($task == "addEmployee"){
  $id = $_GET["id"];
  $first = $_GET["f"];
  $last = $_GET["l"];
  $address= $_GET["add"];
  $phone = $_GET["phone"];

  $file = file_get_contents('employees.txt');
  $file.="\n".$id.",".$first.",".$last.",".$phone.",".$address;
  file_put_contents("employees.txt", $file);
  

}
else if($task == "addDeployment"){
  $lat = $_GET["lat"];
  $long = $_GET["long"];
  $employees =$_GET["employ"];
  $desc = $_GET["desc"];
  $start = $_GET["start"];
  $end = $_GET["end"];
  $file2 = file_get_contents("deployments.txt");
  $file2.="\n".$employees.";".$start.";".$end.";". $desc.";".$long.";".$lat;
  
  file_put_contents('deployments.txt', $file2);

}

?>
