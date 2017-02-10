window.onload = function() {
	var bg = document.getElementById('bg');
	var plus = document.getElementById('plus');
	var score = 0;
	var begin = document.getElementById('begin');
	var bl = document.getElementsByClassName('ballon');

	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	//创建随机数函数

    function fadeTo(ele,num) {
        var mOp = 1;
        var timeId = setInterval(function(){
                mOp -= 0.01;
                ele.style.opacity = mOp;
                if(mOp <= num){
                    clearInterval(timeId);
                    if(num == 0){
                    	ele.style.display = "none";
                    }
                }
            }
		,10)
    }
	//创建渐出功能

	function newBalloon() {
		var newitem = document.createElement('span');
		var score1 = randomInt(65, 100);
		var switch1 = true;
		newitem.className = 'ballon';
		newitem.style.height = score1 + 'px';
		newitem.style.width = newitem.style.height;
		newitem.style.backgroundColor = 'rgb(' + randomInt(0, 255) + ',' + randomInt(0, 255) + ',' + randomInt(0, 255) + ')';
		newitem.innerHTML = score1;
		newitem.style.lineHeight = newitem.style.height;
		newitem.style.top = randomInt(35, 400) + 'px';
		newitem.style.left = randomInt(35, 400) + 'px';
		newitem.onclick = function ballonClick() {
			if(switch1) {
				score += score1;
				plus.innerHTML = score;
				fadeTo(this,0.1);
				newBalloon();
				this.style.cursor = 'default';
				switch1 = false;
			}
		}
		bg.appendChild(newitem);
	}
	//添加新球

	begin.onclick = function() {
		newBalloon();
		fadeTo(begin,0);
		//开始按钮只执行一次函数
		var num = 30;
		var switch2 = true;
		//开始按钮执行内容

		function countD() {
			var mfont = document.getElementById('count');
			if(num > 10) {
				num--;
				mfont.innerHTML = num;
			} else if(num > 0 && num <= 10) {
				num--;
				mfont.innerHTML = '0' + num;
				mfont.style.color = '#DE0B06';
			} else if(num == 0 && switch2 == true) {
				mfont.style.fontSize = 70 + 'px';
				mfont.style.left = 15 + '%';
				mfont.style.top = 42 + '%';
				mfont.innerHTML = 'Time Out!';
				alert('恭喜！您的最终分数为' + score);
				switch2 = false;
				for(var i in bl){
					bl[i].style.display = 'none';
				}
			}
		}
		//倒数计时
		setInterval(countD, 1000);
		//设置倒数函数每1000毫秒运行一次
	}
}