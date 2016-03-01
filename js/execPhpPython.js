$(document).ready(function()
{
	$("input:checkbox").change(function()
    {
    	if( $(this).is(":checked") )
        {
			document.getElementById('onoff').innerHTML = '<p> Wyłącz światło <p>';
			$.ajax({
    		//type: 'GET',
    		url: 'pythonExec1.php',

    		success: function(response) 
			{
      			console.log(response);
    		},
    		error: function(response) 
			{
      			return console.error(response);
    		}
  			});
    	}
		else
		{
			document.getElementById('onoff').innerHTML = '<p> Włącz światło <p>'
			$.ajax({
    			//type: 'GET',
    			url: 'pythonExec0.php',

		    	success: function(response) 
				{
      				console.log(response);
    			},
    			error: function(response) 
				{
      				return console.error(response);
    			}
  			});
		}
	})
});
