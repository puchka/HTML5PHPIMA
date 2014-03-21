<!DOCTYPE html>
<html>
    <head>
		<meta charset="utf-8" />
        <title>Project</title>
		<link rel="stylesheet" href="canvas.css" />
    </head>
    <body>
        <canvas id="canvas">
            Your navigator don't support Canvas.<br />
			You have to update it!
        </canvas>
		<form method="post" action="perform.php">
			<p>
			<fieldset>
			<legend>Color</legend>
				<label for="red">Red :</label>
				<input type="text" name="red" id="red" /><br />
				<label for="green">Green :</label>
				<input type="text" name="green" id="green" /><br />
				<label for="blue">Blue :</label>
				<input type="text" name="blue" id="blue" /><br />
				<input type="button" value="Set Color" id="set" />
				<div id="palette">
				</div>
			</fieldset>
			<fieldset>
			<legend>Selection type</legend>
				<input type="radio" name="selection" value="rect" id="rect" checked />
				<label for="rect">Preselection</label>
				<input type="radio" name="selection" value="brush" id="brush" />
				<label for="brush">Refining</label><br />
			</fieldset>
			<fieldset id="brush_options">
			<legend>Brush Options</legend>
				<canvas id="canvas_options"></canvas>
			</fieldset>
			<fieldset>
			<legend>Zoom tool</legend>
				<label>+</label>
				<input type="checkbox" name="zoomin" /><br />
				<label>-</label>
				<input type="checkbox" name="zoomout" />
			</fieldset>
			<fieldset>
			<legend>Controls</legend>
				<input type="button" value="Undo" id="undo" /><br />
				<input type="button" value="Reset" id="reset" />
			</fieldset>
			<input type="hidden" name="data" />
			<input type="button" value="Perform" id="perform" />
			</p>
		</form>
		<script src="canvas.js"></script>
    </body>
</html>
