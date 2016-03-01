<?php
echo "Light on";
$output = shell_exec('python cgi-bin/test.py 1');
echo $output;
?>