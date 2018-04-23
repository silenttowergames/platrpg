<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="author" content="Silent Tower Games LLC">
<meta name="description" content="Platformer meets turn-based RPG fighting. Jump over treacherous obstacles between turn-based fights where you gain XP and level up.">
<meta property="og:image" content="https://silenttowergames.com/ludumdare41/screen2.png">
<meta property="og:description" content="Platformer meets turn-based RPG fighting. Jump over treacherous obstacles between turn-based fights where you gain XP and level up.">
<meta property="og:title" content="Super Platformer RPG">
<meta property="og:type" content="website">
<meta property="og:url" content="https://silenttowergames.com/ludumdare41/">
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="silenttowergames">
<meta name="twitter:creator" content="silenttowergames">
<title>Super Platformer RPG &dash; Ludum Dare 41</title>
<link rel="stylesheet" type="text/css" href="bulma.min.css">
<style type="text/css">
@font-face {
	font-family:'Press Start 2P';
	src:url('PressStart2P.ttf');
}

a {
	color:#F00;
}

a:hover {
	color:#FFF;
}

html {
	background-color:unset;
}

body {
	background-color:#000;
	background-image:
		url('dirtbg.png'),
		url('dirtbg.png')
	;
	background-position:left, right;
	background-repeat:repeat-y;
	color:#FFF;
	font-family:'Press Start 2P',sans-serif;
}

footer {
	background-image:url('dirtbg.png');
	margin-top:4em;
	text-align:center;
}

footer p {
	background-color:#000;
	display:inline-block;
	margin:0;
	padding:4em 1em;
}

.gallery::after {
	content:"";
	clear:both;
	display:block;
}

.gallery li {
	line-height:0;
	padding:0.25em;
}

.gallery li img {
	border:0.5em solid #FFF;
	padding:0.5em;
}

.gallery li:hover img {
	border-color:#F00;
}

.title {
	color:#FFF;
	padding:2em 0;
	text-align:center;
}

.subtitle {
	color:#FFF;
	font-size:24px;
}

p,
li
{
	margin-bottom:0.5em;
}

@media (max-width:991px){
	body,
	footer
	{
		background-size:32px;
	}
	
	.container {
		padding:0 32px;
	}
}

@media (min-width:992px){
	.gallery li {
		float:left;
		width:50%;
	}
}
</style>
</head>

<body>

<div class="container">





<h1 class="title">
	Super Platformer RPG
</h1>





<section class="section">
	<h2 class="subtitle">
		Links
	</h2>
	
	<ul>
		<li>
			<a href="game.html">
				Play Super Platformer RPG
			</a>
		</li>
		
		<li>
			<a href="https://github.com/silenttowergames/platrpg/" target="_blank">
				View Source Code
			</a>
		</li>
		
		<li>
			Silent Tower games
			<a href="https://silenttowergames.com/" target="_blank">website</a>
			and
			<a href="https://twitter.com/silenttowergame" target="_blank">Twitter</a>
		</li>
	</ul>
</section>





<section class="section">
	<h2 class="subtitle">
		Gameplay
	</h2>
	
	<p>
		Platformer meets turn-based RPG fighting. Jump over treacherous obstacles between turn-based fights where you gain XP and level up.
	</p>
	
	<p>
		Made for the <a href="https://ldjam.com/" target="_blank">Ludum Dare 41</a> competition.
	</p>
</section>





<section class="section">
	<h2 class="subtitle">
		Attacks
	</h2>
	
	<ul>
		<li>
			Jump: Standard attack
		</li>
		
		<li>
			Hit: More powerful attack with a one-turn cooldown
		</li>
		
		<li>
			Psychic: Displays your opponent's health meter for the rest of the fight, but costs a turn
		</li>
	</ul>
</section>





<section class="section">
	<h2 class="subtitle">
		Controls
	</h2>
	
	<ul>
		<li>
			Arrow Keys: Move, Jump, Navigate menu
		</li>
		
		<li>
			Space: Select option
		</li>
	</ul>
</section>





<section class="section">
	<h2 class="subtitle">
		Screenshots
	</h2>
	
	<ul class="gallery"><?php for($i=0;$i<4;$i++): ?>
		<li>
			<a href="screen<?=$i?>.png">
				<img src="screen<?=$i?>.png">
			</a>
		</li>
	<?php endfor; ?></ul>
</section>





</div><!-- .container -->





<footer>
	<div class="container">
		<p>
			&copy; 2018 <a href="https://silenttowergames.com/">Silent Tower Games</a> LLC.
		</p>
	</div>
</footer>





</body>

</html>