var songContent = '[00:00.00]每当晚上的这个时候，心里总是空空的，感觉就好像被好多人抛弃和遗忘那样。</br>深深的寂寞将我淹没，不知道如何是好。\n [00:10.00]我发现了，若我不主动，一天、两天、三天、甚至一星期都没人理我。\n [00:17.00]懂得太多，看的太透，就会变成世界的孤儿。\n [00:23.00]在键盘上敲字，被网络推着往前走，文字越来越经典，心却越来越荒凉。\n [00:30.00]我很好，不吵不闹不炫耀，也不需要别人知道。\n [00:37.00]慢慢习惯了封闭自己，习惯了当发生什么事情时一个人沉默着一言不发。\n [00:45.00]我习惯了一个人，更应该说我我知道我只是一个人。</br>你们来安慰我，陪我，可是你们都会走。\n [00:53.00]最后的最后，还是只剩我自己。\n [00:59.00]人有时脆弱得可以因为一段音乐而流泪，却在不知不觉回头间发现已经坚强的走了那么远。\n [01:08.00]有个你曾经以为离不开的群，你很久没在里面说话了。</br>某个你曾经想为他肝脑涂地的偶像，你早就没再追踪他最新动态了。\n [01:20.00]一些曾经亲密无间的人，你们已经几年没联系。</br>天天追的美剧你放弃了，每天玩的游戏你也准备戒了。\n [01:30.00]多少在乎正在被稀释，多少热情渐渐被冲淡。</br>没有什么会“根本停不下来”，除了时间。\n [01:40.00]你其实可以不用这么冷淡，</br>我也没有想过再纠缠。\n [01:50.00]等与不等，我都等了。</br>在与不在乎，我都已经在乎了。\n [02:00.00]奈何桥上一男子忧伤的对孟婆说：“孟婆，再来一碗吧！”</br>“你已经喝完十七碗了，我这都没了。”</br>男子眼中闪着泪光：“可是她还在！”\n [02:15.00]路人问道姑：“你孤独吗？”</br>道姑望向远方说道：“我用上半生爱上一个人，用下半生忘记一个人。所以我这一生并不孤独。”\n [02:30.00]电影院里，一对情侣来看电影，女孩靠在男孩怀里流眼泪，她说她忘不了他。男孩轻轻帮她擦去眼泪，宠溺地摸摸她的头说，那你就去找他吧。</br>电影散场，偌大的电影院里男孩哭的撕心裂肺，其实成全一个人真的没那么伟大。\n [02:45.00]每当有人问起，为什么我不恋爱的时候，我都以麻烦为由搪塞过去。又有人开始问我到底喜欢过谁没有，我也轻描淡写地表示否定。无数的朋友告诉我，或许是你还没碰到过真正喜欢的人吧，我却没法开口告诉他们。\n [03:10.00]其实我曾经碰到过，碰的太早，以至于我没来得及分清，也没来得及弄明白。\n [03:20.00]一个人的世界\n [03:25.00]一个人听歌，一个人走路。\n [03:30.00]一个人喝酒，一个人难过，一个人开心。\n [03:35.00]一个人自言自语，一个人自哼自唱。\n [03:40.00]一个人等待月落晨起，一个人走过风风雨雨。\n [03:45.00]一个人生活着，真的很寂寞，很孤单。\n [03:55.00]如果可以\n [04:00.00]许一人天长地久，尽一世浮世繁华。\n [04:10.00]End\n'
var songContent1 = '' ;
function parseLyric(text) {
    //将文本分隔成一行一行，存入数组
    var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    return result;
}


var my_audio = document.getElementById("my_audio");
var p_all=$(".progress").width();
var startX = startY = endX = endY = 0;

//暂停或播放
function playPause()
{
	if(my_audio.paused){
		my_audio.play();
	}
	else{
		my_audio.pause();
	}
}

var lyric = parseLyric(songContent);
//显示歌词的元素
lyricContainer = document.getElementById('musicContent');
//audio播放的时候实时获取当前播放时间
my_audio.ontimeupdate = function()
{
	//获取当前播放时间
	document.getElementById("now_time").innerHTML = timeFormat(my_audio.currentTime);
	//当前的长度
	now_long=my_audio.currentTime/my_audio.duration*p_all;
	$(".bar").css({width:now_long});
	var btn_l=now_long-10+'px';
	$(".btn").css({left:btn_l});
	//遍历所有歌词，看哪句歌词的时间与当然时间吻合
	for (var i = 0, l = lyric.length; i < l; i++) {
		if (this.currentTime /*当前播放的时间*/ > lyric[i][0]) {
			//显示到页面
//		            lyricContainer.textContent = lyric[i][1];
			if(i>=1){
			//	$(".musicContent01").html(lyric[i-1][1]);
				$(".musicContent02").html(lyric[i][1]);
			 //   $(".musicContent03").html(lyric[i+1][1]);
			}else{
				$(".musicContent02").html(lyric[i][1]);
			 //   $(".musicContent03").html(lyric[i+1][1]);
			}
	};
	addListenTouch();
};
};

//页面一旦加入就获取audio的总时间
my_audio.onprogress = function()
{
	document.getElementById("all_time").innerHTML = timeFormat(my_audio.duration);
	//总的长度
};	
// Time format converter - 00:00//时间格式转换器- 00:00
var timeFormat = function(seconds){
	var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
	var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
	return m+":"+s;
};	
//手动拉拽进度条的部分
function addListenTouch(){
//var speed=$('.had-play');
var btn=document.getElementById("btn");
document.getElementById("btn").addEventListener("touchstart", touchStart, false);
document.getElementById("btn").addEventListener("touchmove", touchMove, false);
document.getElementById("btn").addEventListener("touchend", touchEnd, false);
document.getElementById("musicContent").addEventListener("touchstart", touchStart, false);
document.getElementById("musicContent").addEventListener("touchmove", touchMove, false);
document.getElementById("musicContent").addEventListener("touchend", touchEnd, false);
}
function touchStart(e){
e.preventDefault();
var touch=e.touches[0];
startX=touch.pageX;
my_audio.pause();
document.getElementById("all_time").innerHTML = timeFormat(my_audio.duration);	
//歌词区域touch移动距离
var touchSong = e.targetTouches[0];
startSongX = touchSong.pageX;
startSongY = touchSong.pageY;
}
function touchMove(e){//滑动
e.preventDefault();
var touch=e.touches[0];
x=touch.pageX-startX//滑动的距离
//btn.style.webkitTransform='translate('+0+'px,'+y+'px)';
var widthBar=now_long+x;
//
$(".bar").css({width:widthBar});
if(widthBar<p_all)
	{
	//	
	$("#btn").css({left:widthBar-10+'px'});
	$("#bar").css({width:widthBar});	
	}//不让进度条超出页面
//歌词区域touch移动距离
var touchSong = e.targetTouches[0];
endSongX = touchSong.pageX;
endSongY = touchSong.pageY;

var yu=widthBar/p_all*my_audio.duration;
document.getElementById("now_time").innerHTML = timeFormat(yu);
}
function touchEnd(e){//手指离开屏幕
e.preventDefault();//取消事件的默认动作
now_long=parseInt(btn.style.left);
var touch=e.touches[0];
var dragPaddingLeft=btn.style.left;
var change=dragPaddingLeft.replace("px","");
numDragpaddingLeft=parseInt(change);
//console.log(numDragpaddingLeft);
var currentTimeNew=(numDragpaddingLeft/(p_all-20)*my_audio.duration);
//		if(endSongX&&startSongX){
//			if((endSongY-startSongY)<0){
//				
//				currentTimeNew = currentTimeNew - (parseInt(endSongY-startSongY))/80*my_audio.duration;
//			}
//			currentTimeNew = (endSongY-startSongY)/80*my_audio.duration;
//		}

my_audio.currentTime = currentTimeNew;
//console.log(currentTimeNew);
//console.log(timeFormat(currentTimeNew));
document.getElementById("now_time").innerHTML = timeFormat(currentTimeNew);
my_audio.play();
document.getElementById("all_time").innerHTML = timeFormat(my_audio.duration);	
console.log("垂直移动距离=    "+(endSongY-startSongY));
}