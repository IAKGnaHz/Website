+ .wrapper 设置整个页面
	+ .btn 设置开始游戏按钮
		+ background-size 表示背景图片相对于父级元素的大小
		可使用百分比 像素 表示背景图片相对于父级元素的大小
		+ cursor 定义显示鼠标的类型
	+ .box 存放扫雷主区域 
		+ *js 交互*
		+ *css 样式*
			+ 倾斜的背景  transform 样式
			+ box-shadow 阴影颜色
	+ .flagBox 存放当前剩余雷数
		+ *js 交互*
		+ *css 样式*
			+ 定位 绝对定位 相对于最近的父级元素
			+ margin-left 设置-100
	+ .alertBox  遮罩 包含弹出游戏结束或成功图片
		+ .alertImg 包含成功或失败图片，具体图片由js实现选择调用
		+ .close 包含close菜单



js代码
+ script 代码应该放置在body元素中的最后，在取得DOM对象添加事件时，可能由于DOM未完全加载出现，而出现错误
+ 给每一个div设置唯一的ID属性
+ 将所有的事件函数封装到 bindEvent 函数中
	+ 给startBtn 按钮添加点击事件 显示box背景和flagBox背景 display:block
+ init()函数，随机生成100个小格并插入box 中，并生成十个有雷的随机小格	
	+ 首先取出box(绿色背景的大盒子)
	+ 设置雷的总数量和雷的剩余数量
	+ 设置一个数组存放生成的100个雷的div
	+ 利用两层循环生成100个div 给每一个div添加block类名
	+ 将这100个雷的div添加到box中
	+ 每生成一个div的同时向mineMap数组中传入一个键值对 (mine:0)
	+ 取出所有的带有block类名的div(也就是生成的100个div)
	+ 当minesNum为真的时候进行下面的操作
		+ 使用Math.random生成一个随机数并向下取值，作为带有雷的div 并检测该数所对应的mineMap中的mine是否对应的为0，避免生成相同的随机数 
		+ 如果在mineMap中对应的键值为0 则将键值赋为1
		+ minesNum--

+ oncontextmenu 取消在box区域内的双击事件

+ onmousedown事件，传入一个事件对象，并用target属性获取该事件的对象
	+ e.which 属性判断onmousedown 事件发生在左键还是右键
		+ 发生在左键 调用leftclick()
		+ 发生在右键 调用rightclick()

+ leftclick()事件 传入点击对象dom 
	+ 如果点击的div元素包含flag属性，表示已经被插旗过了，然后就不能使用左点击事件
	+ 首先取得所有带有isLei class属性的div 元素
	+ 第一种情况 点到了带有isLei属性的div元素 游戏结束
		+ 将所有的雷显示出来 使用for 循环
		+ 显示game over的图片 并设置时间间隔
		+ 通过添加类名 和改变display属性样式展现结束画面
    + 第二种情况 点击到了数字div
    	+ 以格子为中心，判断出周围8个格子中雷的数目
    	+ 使用数组取出当前dom对象的行列数
    		+ 使用split方法分割 保存在0位和1位
    		+ 分别使用postX和postY保存
    		+ 使用for循环遍历周围8个元素
    		+ 如果周围的div元素中存在雷 则num++ 
    	+ 将dom即传入的div插入HTML元素 n(雷的数量)
    	+ 如果周围8个元素中不存在雷 即n=0 
    		+ 使用递归分别以附近8个元素为中心遍历
    		+ 只要遍历过一次的div元素，设置check类名
    		+ 如果不存在check类名，递归调用leftclick()方法

+ rightclick() 事件 传入点击对象元素dom
	+ 右击事件 如果该dom元素是数字 不进行任何动作
	+ toggle()方法，动态的为该元素添加flag 类名，也就是添加小旗子背景图
	+ 当该元素是雷且该元素的被插旗了 minesOver数量--
	+ 不满足则minesOver++
	+ 取出score ，插入剩余雷数的数量
	+ 如果没有雷了，即所有的雷被发现了，弹出成功的图片


+ close.onclick() 事件 
	+ 将alertbox 的display设置为none
	+ 将box 的display设置为none
	+ 清除box中的HTML代码 也就是清除上一局游戏的所有内容

+ js 55行
	+ 每一次完成一次游戏，将雷剩余的数量重新置为10

+ js 18行
	+ 设置startGameBol 布尔值 避免重复点击开始按钮
	+ 在完成游戏(成功或者失败)点击close按钮时将startGameBol设置为true

























