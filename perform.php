<?php
	$data = json_decode($_POST['data'], true);
	if (!$data) {
		echo 'An error occured!';
	}
	else {
		foreach ($data as $index => $shape) {
			if ($index=='0');
			else {
				$x = intval($shape['x']);
				$y = intval($shape['y']);
				$x2 = intval($shape['x2']);
				$y2 = intval($shape['y2']);
				if ($index=='1') {
					$sx = $x; $sy = $y; $sx2 = $x2; $sy2 = $y2;
					$line = array();
					$matrix = array();
					for ($i=0;$i<=$x2-$x;$i++) {
						for ($j=0;$j<=$y2-$y;$j++) {
							$line[$j] = 1;
						}
						$matrix[$i] = $line;
					}
				}
				else if ($index!='0') {
					$d = $x2 - $x;
					$r = $d/2;
					$xr = $x - $sx; $yr = $y - $sy;
					$xr2 = $xr + $d; $yr2 = $yr + $d;
					$xc = $xr + $r; $yc = $yr + $r;
					for ($i=$xr;$i<$xr2;$i++) {
						for ($j=$yr;$j<$yr2;$j++) {
							if (sqrt(pow($i-$xc,2)+pow($j-$yc,2))<=$r) {
								if ($i>=0 && $j>=0 && ($i+$x-$xr)<=$sx2 && ($j+$y-$yr)<=$sy2) {
									$matrix[$i][$j] = 0;
								}
							}
						}
					}
				}
			}
		}
		header('Content-type: image/jpeg');
		$r = intval($_POST['red']);
		$g = intval($_POST['green']);
		$b = intval($_POST['blue']);
		$imagei = imagecreatefromjpeg('uploads/1.jpg');
		$widthi = imagesx($imagei);
		$heighti = imagesy($imagei);
		if ($data['0']['z']!='0') {
			$zoom = intval($data['0']['z']);
			$zw = $widthi-$zoom*50;
			$zh = floor($zw*$heighti/$widthi);
			$x = intval($data['0']['x']);
			$y = intval($data['0']['y']);
			$x1 = $x - floor($zw/2);
			$y1 = $y - floor($zh/2);
			$x2 = $x + floor($zw/2);
			$y2 = $y + floor($zh/2);
			if ($x1 < 0) {
				$x1 = 0;
			}
			if ($y1 < 0) {
				$y1 = 0;
			}
			if ($x2 > $widthi) {
				$x1 = $widthi - zw;
			}
			if ($y2 > $heighti) {
				$y1 = $heighti - $zh;
			}
			if ($widthi>650) {
				$width = 650;
				$height = floor((650*$heighti)/$widthi);
			}
			else {
				$width = $widthi;
				$height = $heighti;
			}
			$image = imagecreatetruecolor($width, $height);
			imagecopyresized($image, $imagei, 0, 0, $x1, $y1,
							 $width, $height, $zw, $zh);
			$red = imagecolorallocate($image, $r, $g, $b);
			$i = 0;
			foreach ($matrix as $line) {
				$j = 0;
				foreach ($line as $pixel) {
					if ($matrix[$i][$j]==1) {
						ImageSetPixel($image, $i+$sx, $j+$sy, $red);
					}
					$j++;
				}
				$i++;
			}
			$coeff = $width/$zw;
			$width2 = floor($coeff*$width);
			$height2 = floor($coeff*$height);
			$image2 = imagecreatetruecolor($width2, $height2);
			imagecopyresized($image2, $imagei, 0, 0, 0, 0,
							 $width2, $height2, $width, $height);
			$x1 = floor($coeff*$x1);
			$y1 = floor($coeff*$y1);
			imagecopy($image2, $image, $x1, $y1, 0, 0,
					  $width, $height);
			$image3 = imagecreatetruecolor($width, $height);
			imagecopyresized($image3, $image2, 0, 0, 0, 0,
							 $width, $height, $width2, $height2);
			imagejpeg($image3);
		}
		else {
			if ($widthi>650) {
				$width = 650;
				$height = floor((650*$heighti)/$widthi);
			}
			else {
				$width = $widthi;
				$height = $heighti;
			}
			$image = imagecreatetruecolor($width, $height);
			$red = imagecolorallocate($image, $r, $g, $b);
			imagecopyresized($image, $imagei, 0, 0, 0, 0,
							 $width, $height, $widthi, $heighti);
			$i = 0;
			foreach ($matrix as $line) {
				$j = 0;
				foreach ($line as $pixel) {
					if ($matrix[$i][$j]==1) {
						ImageSetPixel($image, $i+$sx, $j+$sy, $red);
					}
					$j++;
				}
				$i++;
			}
			imagejpeg($image);
		}
	}
?>
