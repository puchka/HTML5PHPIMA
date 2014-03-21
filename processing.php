<?php
function upload_file($file) {
    if ($file['size'] <= 1000000)
    {
        $infosfichier = pathinfo($file['name']);
        $extension_upload = $infosfichier['extension'];
        $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png');
        if (in_array($extension_upload, $extensions_autorisees))
        {
            move_uploaded_file($file['tmp_name'], 'uploads/1.jpg');
            include('canvas.php');
        }
    }
}
if (isset($_FILES['image']) AND $_FILES['image']['error'] == 0) {
	if (!isset($_POST['url']) OR $_POST['url']=='') {
		upload_file($_FILES['image']);
	}
	else {
		if ($_POST['choice']=='file') {
			upload_file($_FILES['image']);
		}
		else {
			copy($_POST['url'], 'uploads/1.jpg');
			include('canvas.php');
		}
	}
}
else {
	copy($_POST['url'], 'uploads/1.jpg');
	include('canvas.php');
}
?>
