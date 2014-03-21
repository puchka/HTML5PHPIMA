var file = document.getElementById('image');
var url = document.getElementById('url');
var submit = document.getElementById('submit');
submit.addEventListener('click',
function(e) {
	if (file.value!='' && url.value!='') {
		var hidden = document.getElementById('choice');
		var choice = confirm('Click on OK if you want to \
use the offline image.');
		if (choice) {
			hidden.value = 'file';
		}
		else {
			hidden.value = 'url';
		}
	}
	else if (file.value=='' && url.value=='') {
		alert('You have to select one file in your local \
disk or enter one url.');
		e.preventDefault();
	}
}, false);
