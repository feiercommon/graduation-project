function events(){
	var EventUtil = {
  // 获取事件和目标
  getEvent : function (event) {
    return event ? event : window.event;
  },
  getTarget : function (event) {
    return event.target || event.srcElement;
  },
  // 添加监听事件
  addEvent : function (element, type, handler) {
    if (element.addEventListener)
    {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent)
    {
      element.attachEvent("on" + type, handler);
    }
  },
  // 注销监听事件
  delEvent : function (element, type, handler) {
    if (element.removeEventListener)
    {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent)
    {
      element.detachEvent("on" + type, handler);
    }
  }
}
var DragDrop = function () {
  // 判断DOM元素是否正在被拖动的标志
  var dragging = null;
  // DOM元素左上角与鼠标指针的差值
    diffX = 0;
    diffY = 0;
  function handleEvent(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);//获取状态存在的值
    switch (event.type) {
      case "mousedown" : 
      // 判断DOM元素的class中是否含有draggable属性
        if (target.className.indexOf("draggable") > -1) {
          dragging = target;
          diffX = event.clientX - target.offsetLeft;
          diffY = event.clientY - target.offsetTop;
        }
      break;
 
      case "mousemove" : 
        if (dragging != null) {
          target.style.left = event.clientX - diffX + "px";
          target.style.top = event.clientY - diffY + "px";
        }
      break;
 
      case "mouseup" :
        dragging = null;
      break;
 
    }
  }
  return {
    enable : function () {
      EventUtil.addEvent(document, "mousedown", handleEvent);
      EventUtil.addEvent(document, "mousemove", handleEvent);
      EventUtil.addEvent(document, "mouseup", handleEvent);
    },
    disable : function () {
      EventUtil.delEvent(document, "mousedown", handleEvent);
      EventUtil.delEvent(document, "mousemove", handleEvent);
      EventUtil.delEvent(document, "mouseup", handleEvent);
    }
  }
}();
DragDrop.enable();
}
	
