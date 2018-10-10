// 点击开始游戏-》动态生成100个小格子  100div
// leftclick 没有雷 显示数字 代表以当前小格为中心周围8个格的雷数
// 扩散的情况 当前周围8个格没有雷  有雷 游戏结束
// rightclick 有标记取消编辑 没有标记并且没有数字进行标记 判断标记是否正确 10个都正确标记
// 已经出现数字 无效果

var startBtn = document.getElementById('btn');
var box = document.getElementById("box");
var flagBox = document.getElementById("flagBox");
var minesNum; //雷的总数量
var minesOver; //雷剩余的数量
var block;
var mineMap = [];
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var close = document.getElementById('close');
var score = document.getElementById('score');
var startGameBol = true;

bindEvent();
function bindEvent() {
	startBtn.onclick = function(){
		if (startGameBol) {
			box.style.display = 'block';
			flagBox.style.display = 'block';
			init();
			startGameBol = false;
		}
	}
	box.oncontextmenu = function(){
		return false;
	}
	box.onmousedown = function(e){
		var event = e.target;
		if (e.which == 1) {
			leftclick(event);
		}else if (e.which ==3){
			rightclick(event);
		}
	}
	close.onclick = function(){
		alertBox.style.display = 'none';
		flagBox.style.display = 'none';
		box.style.display = 'none';
		box.innerHTML = '';
		startGameBol = true;
	}

}


function init() {
	minesNum = 10;
	minesOver = 10;
	score.innerHTML = minesOver;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var con = document.createElement('div');
			con.className = 'block';
			con.id = (i+'-'+j);
			box.appendChild(con);
			mineMap.push({mine:0});
			console.log("hello world");
		}
	}
	block = document.getElementsByClassName('block');
	while(minesNum){
		var mineIndex = Math.floor(Math.random()*100);
		if (mineMap[mineIndex].mine === 0) {
			mineMap[mineIndex].mine = 1;
			block[mineIndex].classList.add('isLei');
			minesNum --;
		}
	}

} 

function leftclick(dom){
	if (dom.classList.contains('flag')) {
		return;
	}
	//判断是否点到雷;
	var isLei = document.getElementsByClassName('isLei');
	if (dom && dom.classList.contains('isLei')) {
		console.log("game over");
		for(var i=0;i<isLei.length;i++){
			isLei[i].classList.add('show');
		}
		setTimeout(function(){
			alertBox.style.display = 'block';
			alertImg.classList.add('alertOver');

		},800)
		// 点击到了数字
	}else {
		var n = 0; //当前格子为中心，周围8个格子的雷数目
		var posArr = dom && dom.getAttribute('id').split('-');
		var postX = posArr && +posArr[0];
		var postY = posArr && +posArr[1];
		dom && dom.classList.add('num');
		for(var i = postX-1;i<=postX+1;i++){
			for(var j =postY-1;j<=postY+1;j++){
				var aroundBox = document.getElementById(i+"-"+j);
				if (aroundBox && aroundBox.classList.contains('isLei')) {
					n++;
				}
			}
		}
		dom &&  (dom.innerHTML = n);
		if (n==0) {
			for(var i = postX-1;i<=postX+1;i++){
				for(var j =postY-1;j<=postY+1;j++){
					var nearBox = document.getElementById(i+'-'+j);
					if (nearBox && nearBox.length != 0) {
						if (!nearBox.classList.contains('check')){
							nearBox.classList.add('check');
							leftclick(nearBox);
						}
					}
				}
			}
		}

	}
}

function rightclick(dom){

	if (dom.classList.contains('num')) {
		return;
	}
	dom.classList.toggle('flag');
	if (dom.classList.contains('isLei') && dom.classList.contains('flag')) {
		minesOver --;
	}
	if (dom.classList.contains('isLei') && !dom.classList.contains('flag')) {
		minesOver ++;
	}

	score.innerHTML = minesOver;
	if (minesOver==0) {
		alertBox.style.display = 'block';
		alertImg.classList.add('alertSuccess');
	}

}













