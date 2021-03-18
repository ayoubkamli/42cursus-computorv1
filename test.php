<?php
session_start();
// define variables and set to empty values
if (!isset($_POST["submit"]))
{
$_SESSION["numberErr"]  = "";
$_SESSION["number"]  = "";
$_SESSION["randomNumber"] = rand(0, 9);
$_SESSION["msg"] = "";
$_SESSION["counter"] = 5;
$_SESSION["try"] = "Tentative precedentes: ";
$_SESSION["disabled"] = "";
echo $_SESSION["randomNumber"];
} else if ($_SESSION["counter"] > 0) {
  $_SESSION["number"] = $_POST["number"];
  $_SESSION["counter"] = $_SESSION["counter"] - 1;
  $_SESSION["randomNumber"] = $_SESSION["randomNumber"];

  if ($_SESSION["number"] > 9 || $_SESSION["number"] < 0){
          $_SESSION["msg"] =  "Please enter a number between 0 - 9";
  }

  else if ($_SESSION["number"] == $_SESSION["randomNumber"])
  {
        $_SESSION["msg"] = "bravo";
        $_SESSION["disabled"] = "disabled";

  } else if ($_SESSION["number"] < $_SESSION["randomNumber"]) {
        $_SESSION["msg"] = "Le nombre cache est plus grand que " . $_SESSION["number"];
  } else if ($_SESSION["number"] > $_SESSION["randomNumber"]) {
        $_SESSION["msg"] = "Le nombre cache est plus petit que " . $_SESSION["number"];
  }
  if ($_SESSION["counter"] == 4)
  {
  $_SESSION["try"] = $_SESSION["try"] . $_SESSION["number"];

  }else {
  $_SESSION["try"] = $_SESSION["try"] . ',' . $_SESSION["number"];

  }
} else {
        $_SESSION["msg"] = "Perdu!";
        $_SESSION["disabled"] = "disabled";
}

?>

<h1>Devinette</h1>

<p><span><?php echo $_SESSION["msg"]; ?></span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" >
  Entrez un nombre: <input type="text" name="number" value="<?php echo $_SESSION["number"];?>">

  <input type="submit" name="submit" value="Jouez" <?php echo $_SESSION["disabled"]; ?> >
</form>
<br></br>

<?php
        echo $_SESSION["try"];
        echo "<br></br>";
        echo $_SESSION["counter"];
        echo "<tab></tab>";
        echo " tentaive restantes";
        echo "<br></br>";
?>