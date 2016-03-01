<?php
echo "Light off";
$output = shell_exec('python cgi-bin/test.py 0');
echo $output;
?>