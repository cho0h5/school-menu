<?php
$string = file_get_contents("./menu.json");
$json = json_decode($string,true);

$data = json_decode(file_get_contents('php://input'),true);
$content = $data["content"];

#if($content == "Today menu"){
$r1 = <<<EOD
{
    "message" : {
	"text" : "
EOD;
$r2 = <<<EOD
"
    },
    "keyboard" : {
        "type" : "buttons",
        "buttons" : ["Today menu"]
    }
}
EOD;

echo $r1;
echo str_replace(" ","\n",$json['menu']);
echo $r2;

#}

?>
