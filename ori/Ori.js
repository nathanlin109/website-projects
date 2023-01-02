function PlaySound(soundobj) {
    let thissound=document.getElementById(soundobj);
    thissound.play();
}

let backgroundMusicPlayed = false;
document.querySelector("#body").onclick = function(){
	if (backgroundMusicPlayed == false)
	{
		PlaySound("BackgroundSound");
		backgroundMusicPlayed = true;
	}
};

  let audio = document.querySelector("#BackgroundSound");
  audio.volume = 0.3;

let modal = document.querySelector("#ContentModal");
modal.onclick = function() {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

let SprTree = document.querySelector("#SprTree");
let SprTreeImg = document.querySelector("#img1");
let SprTreeText = document.querySelector("#caption");
SprTree.onclick = function(){
	modal.style.display = "block";
	SprTreeImg.src = this.src;
	SprTreeText.innerHTML = "<span class=fontSprTree>The Spirit Tree</span><br />" +
	"<span class=fontdesc>\"The Spirit Tree is the guardian of Nibel and biological father to Ori. " +
	"A mystical being tasked with maintaining the balance of the Elements of Light. " +
	"The events following the Great Storm would eventually cause the Spirit Tree to lose his power and control over Nibel's forests.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Spirit_Tree>http://oriandtheblindforest.wikia.com/wiki/Spirit_Tree</a></span><br /><br /><br /><br />"+
	"<span class=fonttext>Ori and the Blind Forest was created by Moon Studios in 2015 and the development of the game started back in 2010. " +
	"According to Mahler, the CEO of the company and former Blizzard employee, Moon Studios was created by and comprised of former employees of " +
	"letious different gaming companies with members \"located anywhere from Austria, to Israel, to the US and Canada, to Australia.\" " +
	"In order to communicate efficiently in different time zones, the would regularly use tools, such as skype, Google Hangout, Dropbox, TeamViewer, and Google Drive. " +
	"As the first game they would make, Moon Studios had one chance to make a dent in the gaming industry with Ori and the Blind Forest, and they genuinely did an excellent job in doing so. "+
	"Being in production for five years before its release, Ori and the Blind Forest strived to innovate the 2-D platformer, not only gameplay wise, but also visually and musically. " +
	"The Ori team eventually decided to contact Microsoft and requested them to be the publisher of the game. When they showed Microsoft Ori and the Blind Forest, " +
	"Microsoft was so impressed with what they accomplished that they even decided to show the game at the E3 Conference during 2014. Dan Smith, a publishing producer at Microsoft, " +
	"stated that \"there was a special care and thoughtfulness around the puzzle design,\" and the game was \“pretty special\” and \“[felt] really good.\” " +
	"After the release of the game, it was an instant success, receiving high scores and praiseful reviews. " +
	"It even sold enough copies at twenty dollars per sale that it managed to make a profit within the first week. " +
	"Not many Indie studios can claim that impressive achievement, and I personally can’t think of any other studio that deserves this more than Moon Studios.</span><br /><br /><br />" +
	"<img src=\"Media/Moon Studios Staff.jpg\" width=\"100%\"/><br />" +
	"<span class=fonttext>Moon Studios Staff</span><br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let GnsTree = document.querySelector("#GnsTree");
let GnsTreeImg = document.querySelector("#img1");
let GnsTreeText = document.querySelector("#caption");
GnsTree.onclick = function(){
	modal.style.display = "block";
	GnsTreeImg.src = this.src;
	GnsTreeText.innerHTML = "<span class=fontGnsTree>The peak of the Ginso Tree</span><br />" +
	"<span class=fontdesc>\"The Ginso Tree houses the Element of Waters inside its trunk and was responsible for " +
	"purifying the waters of the forest that passed through it. After Kuro's actions caused the Spirit Tree to lose his power, " +
	"the Ginso Tree became rotten and dry, its inner chambers wrecked with the decay of the blinding.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Ginso_Tree>http://oriandtheblindforest.wikia.com/wiki/Ginso_Tree</a></span><br /><br /><br /><br />" +
	"<span class=fonttext>The music of this game is one of the most iconic aspects of Ori. Composed by Gareth Coker, the music " +
	"is an astounding and breathtaking piece of art that complements the gameplay and environments perfectly. Anyone who plays this game will see (rather hear) " +
	"the passion put into it. " +
	"The amount of effort that was put into the music is honestly quite impressive. " +
	"Coker, along with Moon Studio's music team, the Nashville Music Scoring Orchestra, and the vocalist, Aeralie Brighton"+
	"all put in a tremendous amount of work putting this soundtrack together. " +
	"With over \"tens of thousands of pages\" going into the creation of the music, this hard work really shines through, and " +
	"anyone who plays this game will immediately notice the exceptional quality of the soundtrack. " +
	"Personally, it's the best soundtrack I have ever had the pleasure of listening to, " +
	"and if I had to give one part of Ori that everyone needs to experience, it has to be the soundtrack. (Although, you should experience all of Ori)<br /><br />" +
	"Seriously, go listen to it now. I recommend starting with a song that plays inside the \"Ginso Tree\":<br />" +
	"\"Restoring the Light, Facing the Dark\"</span><br /><br /><br />" +
	"<img src=\"Media/Gareth Coker.jpg\" width=\"100%\"/>" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let MtHoru = document.querySelector("#MtHoru");
let MtHoruImg = document.querySelector("#img1");
let MtHoruText = document.querySelector("#caption");
MtHoru.onclick = function(){
	modal.style.display = "block";
	MtHoruImg.src = this.src;
	MtHoruText.innerHTML = "<span class=fontHoru>Mount Horu</span><br />" +
	"<span class=fontdesc>\"Mount Horu is a giant volcanic mountain that serves as the final challenge Ori must overcome in their journey. " +
	"Housing the Element of Warmth within its core, Mount Horu slowly builds towards an eruption throughout the course of the game and nearly " +
	"results in the complete destruction of Nibel.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Mount_Horu>http://oriandtheblindforest.wikia.com/wiki/Mount_Horu</a></span><br /><br /><br /><br />" +
	"<span class=font>Reddit AMA for the creators of the game:</span><br />" + "<span class=fonturl><a href=https://www.reddit.com/r/xboxone/comments/2yxclb/hi_everyone_its_moon_studios_creators_of_ori_and/>https://www.reddit.com/r/xboxone/comments/2yxclb/hi_everyone_its_moon_studios_creators_of_ori_and/</a></span><br /><br />" +
	"<span class=font><q>Getting to know Moon Studios</q>:</span><br />" + "<span class=fonturl><a href=https://refinedgeekery.com/2015/03/16/getting-to-know-moon-studios/>https://refinedgeekery.com/2015/03/16/getting-to-know-moon-studios/</a></span><br /><br />" + 
	"<span class=font>Interview with Mahler (CEO of Moon Studios):</span><br />" + "<span class=fonturl><a href=http://www.gamasutra.com/view/news/242530/Postmortem_Moon_Studios_heartfelt_Ori_and_the_Blind_Forest.php>http://www.gamasutra.com/view/news/242530/Postmortem_Moon_Studios_heartfelt_Ori_and_the_Blind_Forest.php</a></span><br /><br />" +
	"<span class=font>Interview with Gareth Coker (Composer for Ori):</span><br />" + "<span class=fonturl><a href=http://thewayfaringdreamer.com/gareth-coker-interview/>http://thewayfaringdreamer.com/gareth-coker-interview/</a></span><br /><br />" +
	"<span class=font>Youtube review of Ori by GameCrate:</span><br />" + "<span class=fonturl><a href=https://www.youtube.com/watch?v=LEpHPM13vlU>https://www.youtube.com/watch?v=LEpHPM13vlU</a></span><br /><br />" +
	"<span class=font>Review of Ori by Eurogamer:</span><br />" + "<span class=fonturl><a href=https://www.eurogamer.net/articles/2014-06-28-ori-and-the-blind-forest-looks-great-but-plays-even-better>https://www.eurogamer.net/articles/2014-06-28-ori-and-the-blind-forest-looks-great-but-plays-even-better</a></span><br /><br />" +
	"<span class=font>Review of Ori by IGN:</span><br />" +"<span class=fonturl><a href=https://www.ign.com/articles/2015/03/10/ori-and-the-blind-forest-review>https://www.ign.com/articles/2015/03/10/ori-and-the-blind-forest-review</a></span><br /><br />" +
	"<span class=font>Article about Ori by Xbox Wire Staff:</span><br />" + "<span class=fonturl><a href=https://news.xbox.com/en-us/2014/06/11/games-ori-and-the-blind-forest-e3/>https://news.xbox.com/en-us/2014/06/11/games-ori-and-the-blind-forest-e3/</a></span><br /><br />" +
	"<span class=font>Ori's immediate success within first week:</span><br />" + "<span class=fonturl><a href=https://gamerant.com/ori-blind-forest-sales-profit/>https://gamerant.com/ori-blind-forest-sales-profit/</a></span><br /><br />" +
	"<span class=font>History of Metroidvanias:</span><br />" + "<span class=fonturl><a href=https://www.giantbomb.com/metroidvania/3015-2440/>https://www.giantbomb.com/metroidvania/3015-2440/</a></span><br /><br />" +
	"<span class=font>Review of Donkey Kong:</span><br />" +"<span class=fonturl><a href=http://www.nintendolife.com/reviews/switch-eshop/arcade_archives_donkey_kong>http://www.nintendolife.com/reviews/switch-eshop/arcade_archives_donkey_kong</a></span>" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let Ruins = document.querySelector("#Ruins");
let RuinsImg = document.querySelector("#img1");
let RuinsText = document.querySelector("#caption");
Ruins.onclick = function(){
	modal.style.display = "block";
	RuinsImg.src = this.src;
	RuinsText.innerHTML = "<span class=fontRuins>Forlorn Ruins</span><br />" +
	"<span class=fontdesc>\"Housing the Element of Winds, the Forlorn Ruins were once home to the Gumon, a race of great inventors and agility " +
	"who utilized the Spirit Tree's light in their machinery in order to protect themselves. " +
	"After Kuro's actions, the Ruins became frozen over into a winter wasteland. " +
	"The Gumon inside were unable to escape and were frozen to death, leaving only one survivor.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Forlorn_Ruins>http://oriandtheblindforest.wikia.com/wiki/Forlorn_Ruins</a></span><br /><br /><br /><br />" +
	"<span class=font>Nathan Lin</span><br />" + 
	"<font color=#778899>Email:</font> <span class=fonturl>nzl6723@g.rit.edu</span><br /><br /><br />" +
	"<span class=fonttext>Hi!<br />I'm a freshman college student who is studying Game Design and Development at the Rochester Institute of Technology.</span><br /><br />" +
	"<a href=https://www.rit.edu/><img src=\"Media/RIT.png\" width=\"20%\"/></a>" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let SrwPass = document.querySelector("#SrwPass");
let SrwPassImg = document.querySelector("#img1");
let SrwPassText = document.querySelector("#caption");
SrwPass.onclick = function(){
	modal.style.display = "block";
	SrwPassImg.src = this.src;
	SrwPassText.innerHTML = "<span class=fontSrwPass>The Peak of Sorrow Pass</span><br />" +
	"<span class=fontdesc>\"Sorrow Pass is located at the very top of the Valley of the Wind. " +
	"It is the home of the Sunstone, an object which allows Ori to travel inside Mount Horu to rekindle the final Element of Light needed to save the forest.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Sorrow_Pass>http://oriandtheblindforest.wikia.com/wiki/Sorrow_Pass</a></span><br /><br /><br /><br />" +
	"<span class=fonttext>Maybe just as important to the game as the soundtrack, gameplay, and sound design, is the visual style. " +
	"The only words I have to say for the visuals are: \"Oh my God, WOW\". When I first booted up the game, I didn’t know what to expect. " +
	"The cartoonish style I was met with upon playing the first time blew me away. Something charming about it really drew me into the game’s world. " +
	"It immersed me, so that I felt like I was alongside Ori as I played the game. The visual style of Ori and the Blind Forest is truly unique and " +
	"innovative and creates something that won’t be forgotten. Taking inspiration from Studio Ghibli’s Princess Mononoke, Ori and the Blind Forest’s combines " +
	"elements from movies from anime, Pixar, and Disney to create its stunning visuals. " +
	"These visuals are accompanied with smooth, hand drawn animations, which really do a great job in conveying a “polished” and “caring” feeling when playing the game. " +
	"Every area has extremely detailed animations, not only for Ori and the other assets in the playable area, but also the background and foreground. " +
	"The foliage in the foreground will visibly shake and move whenever Ori is near it while the background has ambient animations going on at all times such as falling leaves or glowing particles flowing around. " +
	"That kind of meticulous detail adds that “polish” I mentioned before and is what makes this game so memorable. " +
	"As for the animations in the playable area, especially ori, they feel fluid and smooth. " +
	"And when you add those kinds of animations to that natural feeling gameplay, the game flows smoother than butter. " +
	"With the exceptional visual style and crisp animations, every single frame of this game is stunning enough to be a desktop background. " +
	"Enough so that I have 2 computers with Ori and the Blind Forest backgrounds. The visuals, graphics, and animations are quite special and it’s easy to tell a lot of love and hard work went into creating them.<br /><br />" +
	"I suggest you go check out some of the amazingly breathtaking scenes from the game over at Moon studios' website:<br />" +
	"<a href=https://www.orithegame.com/media/>https://www.orithegame.com/media/</a></span><br /><br /><br />" +
	"<img src=\"Media/Visuals1.png\" width=\"100%\"/><br /><br /><br />" +
	"<img src=\"Media/Visuals2.png\" width=\"100%\"/><br /><br /><br />" +
	"<img src=\"Media/Visuals3.png\" width=\"100%\"/><br /><br /><br />" +
	"<img src=\"Media/Visuals4.png\" width=\"100%\"/><br /><br /><br />" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let VotW = document.querySelector("#VotW");
let VotWImg = document.querySelector("#img1");
let VotWText = document.querySelector("#caption");
VotW.onclick = function(){
	modal.style.display = "block";
	VotWImg.src = this.src;
	VotWText.innerHTML = "<span class=fontVotW>Valley of the Wind</span><br />" +
	"<span class=fontdesc>\"The Valley of the Winds is a canyon in Nibel that's filled with tunnels and pine trees.\" " +
	"Once an area filled with lush trees and lively creatures, the Valley of the Wind is now populated by dangerous foes and the trees now wilt. " +
	"Without the Element of the Winds in the Forlorn Ruins, wind does not blow here anymore and the Valley of the Wind will remain dark.<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Valley_of_the_Wind>http://oriandtheblindforest.wikia.com/wiki/Valley_of_the_Wind</a></span><br /><br /><br /><br />" +
	"<span class=fonttext>The best part about Ori is the gameplay, in my opinion. " +
	"It consists of an intricate combination of movements and abilities used with a pinpoint accuracy, smooth, natural flowing controls, " +
	"and mechanics requiring just the right amount of difficulty to master. Everything just feels so fluid and polished. " +
	"As the player, you feel like you have the opportunity to experience a real challenge without feeling like it’s impossible. " +
	"I should know this because the first time I played Ori, I died around one hundred times. But the inticing gameplay kept me coming back, and back, and back again " +
	"until I developed a true mastery over the controls and eventually beat the game on its \"One Life\" difficulty. " +
	"It felt like I accomplished an incredible feat without the journey feeling like a cakewalk or overly frustrating. The game balance is just really phenomenal. " +
	"When you add in some of the most creative and satisfying abilities to the game, " +
	"the result is some of the most intense and thrilling gameplay ever that's meticulous in design and nothing short of perfection.</span><br /><br /><br />" +
	"<img src=\"Media/Bash.jpg\" width=\"100%\"/><br /><br /><br />" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let Fields = document.querySelector("#Fields");
let FieldsImg = document.querySelector("#img1");
let FieldsText = document.querySelector("#caption");
Fields.onclick = function(){
	modal.style.display = "block";
	FieldsImg.src = this.src;
	FieldsText.innerHTML = "<span class=fontFields>Horu Fields</span><br />" +
	"<span class=fontdesc>The path towards the base of Mount Horu lies in Horu Fields. What was once one of the most beautiful parts of Nibel's forest " +
	"is now a desolate area with burning trees and a sense of dread.<br /><br /><br /><br />";
}

let Swamp = document.querySelector("#Swamp");
let SwampImg = document.querySelector("#img1");
let SwampText = document.querySelector("#caption");
Swamp.onclick = function(){
	modal.style.display = "block";
	SwampImg.src = this.src;
	SwampText.innerHTML = "<span class=fontSwamp>Thornfelt Swamp</span><br />" +
	"<span class=fontdesc>\"Surrounding the Ginso Tree, the Thornfelt Swamp is where Ori first encounters Gumo, " +
	"who is stealing the Water Vein. He flees, into Moon Grotto, and then to his Hideout, the lower part of Moon Grotto.\" " +
	"Without the Water Vein restored to the Ginso Tree, the waters of the Thornfelt Swamp remain poisonous and corrupted.<br />"
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Valley_of_the_Wind>http://oriandtheblindforest.wikia.com/wiki/Valley_of_the_Wind</a></span><br /><br /><br /><br />";
}

let Glades = document.querySelector("#Glades");
let GladesImg = document.querySelector("#img1");
let GladesText = document.querySelector("#caption");
Glades.onclick = function(){
	modal.style.display = "block";
	GladesImg.src = this.src;
	GladesText.innerHTML = "<span class=fontGlades>Sunken Glades</span><br />" +
	"<span class=fontdesc>\"After their death and prompt resurrection, Ori takes their first few steps into the Sunken Glades beyond the Spirit Tree's shadow. " +
	"It is here that a weak and dying Ori is revived by the Spirit Tree's light. " +
	"Ori will find a tiny light, abandoned and stagnant in a small patch of grass... Sein, the light and eyes of the Spirit Tree.\" " +
	"The journey to explore the world of Nibel starts here.<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Sunken_Glades>http://oriandtheblindforest.wikia.com/wiki/Sunken_Glades</a></span><br /><br /><br /><br />";
}

let Grove = document.querySelector("#Grove");
let GroveImg = document.querySelector("#img1");
let GroveText = document.querySelector("#caption");
Grove.onclick = function(){
	modal.style.display = "block";
	GroveImg.src = this.src;
	GroveText.innerHTML = "<span class=fontGrove>Lost Grove</span><br />" +
	"<span class=fontdesc>\"The Lost Grove is the former home of Naru and her father; their shelter still lies untouched at the bottom of the grove. " +
	"An old memory plays out before Ori and Sein, recounting Naru and her father's peaceful life there. " +
	"It reveals that Ori and Naru's pasts are nearly identical copies of each other, as it ends with Naru's father's death, and her permanent leave. " +
	"Sein reminds Ori that although they (Naru and her father) are gone from the forest, they cannot stop to grieve. Remembering them will let them live on.\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Lost_Grove>http://oriandtheblindforest.wikia.com/wiki/Lost_Grove</a></span><br /><br /><br /><br />" +
	"<span class=fonttext>The very emotional and captivating story of Ori is one of the highlights of the game and " +
	"takes obvious inspiration from The Lion King and The Iron Giant. " +
	"This is obvious within the first ten minutes of playing, as many people will tell you that they cried due to the game’s enthralling introduction. " +
	"With thick and rich plot points, the game also adds in multidimensional characters that the player can relate with. " +
	"Everything tied together culminates to be one of the most touching stories I’ve ever experienced while playing games.</span>" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let BRB = document.querySelector("#BRB");
let BRBImg = document.querySelector("#img1");
let BRBText = document.querySelector("#caption");
BRB.onclick = function(){
	modal.style.display = "block";
	BRBImg.src = this.src;
	BRBText.innerHTML = "<span class=fontBRB>The Black Root Burrows</span><br />" +
	"<span class=fontdesc>\"Ori and Sein find the Black Root Burrows shrouded in darkness. " +
	"However, the Black Root Burrows was blind long before Kuro stole Sein, perhaps after Naru left. " +
	"All that remains is a gift from the Spirit Tree, a globe of light...\"<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Black_Root_Burrows>http://oriandtheblindforest.wikia.com/wiki/Black_Root_Burrows</a></span><br /><br /><br /><br />";
}

let Grotto = document.querySelector("#Grotto");
let GrottoImg = document.querySelector("#img1");
let GrottoText = document.querySelector("#caption");
Grotto.onclick = function(){
	modal.style.display = "block";
	GrottoImg.src = this.src;
	GrottoText.innerHTML = "<span class=fontGrotto>The Moon Grotto</span><br />" +
	"<span class=fontdesc>\"It is a dark cave with glowing mushrooms, roots, and waterfalls, and contains many moving contraptions such as moving pillars and spikes.\" " +
	"Home to a creature of darkness and shadows, Ori must be careful while traversing through these caverns.<br />" +
	"<a href=http://oriandtheblindforest.wikia.com/wiki/Gumo's_Hideout>http://oriandtheblindforest.wikia.com/wiki/Gumo's_Hideout</a></span><br /><br /><br /><br />" +
	"<span class=fonttext>Ori and the Blind Forest is considered to reside in the genre of \"Metroidvania\" games and " +
	"this genre itself is actually a subgenre of an even larger one known as the 2-D platformer. " +
	"2-D platformers were one of the first types of video games created, dating back to 1981 with the first 2-D platforming game being Donkey Kong, " +
	"created by Nintendo. This \"grandfather\" game was originally released in arcades and looks quite primitive compared to the masterpieces we have " +
	"today such as Ori, but it was essential in laying the foundations and illuminating the numerous possibilities for the modern 2-D platformers. " +
	"The \"Metroidvania\" subclass of the 2-D platformer really came much later when Nintendo released Metroid in 1986 and Konami released Castlevania " +
	"in the same year. Games that took elements from both of those game series would, subsequently, be known as \"Metroidvanias\". Being a person who has played many Metroid games and Ori and the Blind Forest, I’m more familiar with \"Metroid\" side of the \"Metroidvania\" genre, " +
	"but I still love the genre as a whole. The typical Metroidvania game will often feature a bunch of playable areas in a singular map that have " +
	"a large focus on exploration, collecting upgrades and abilities to make the character more powerful, backtracking to get to new areas, " +
	"discovering secret areas, and increasingly powerful enemies. " +
	"Ori and the Blind Forest was born from this genre and is one of my all time favorite games. " +
	"The creators of Ori strived to innovate the 2D platformer genre and they did an amazing job in doing so. " +
	"Ori is a game that will remembered for years to come with its unique, engaging, and elegant design.</span>" +
	" <br /><br /><br />" +
	"<p> </p><br /><br /><br /><br />";
}

let span = document.querySelector(".close");

span.onclick = function() {
	modal.style.display = "none";
}