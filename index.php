<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Choose image</title>
	</head>
	<body>
		<h1>Choose image</h1>
		<form method="post" action="processing.php" enctype="multipart/form-data" id="form">
			<label for="image">Image :</label>
			<input type="file" name="image" id="image" /><br />
			<label for="url">URL :</label>
			<input type="url" size="50" placeholder="http://www.example.com/image.jpg"
			name="url" id="url" /><br />
			<input type="hidden" name="choice" id="choice"/>
			<input type="submit" value="Upload" id="submit" />
		</form>
		<script src="script.js"></script>
	</body>
</html>
