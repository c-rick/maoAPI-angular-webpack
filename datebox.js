$.fn.datebox = function (options) {
    var config = {
        $valueEle: $("#outputTime"),
        $prev: $(".datetitle #up"),
        $next: $(".datetitle #down"),
        minDate:null,
        maxDate:null,
    }
    config = $.extend(config, options);
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    var self = this;
    var $ele = $(this);
      
    var maxdate,mindate; 
    var nstr = new Date(); //当前Date资讯
    var ynow = nstr.getFullYear(); //年份
    var mnow = nstr.getMonth(); //月份
    var dnow = nstr.getDate(); //今日日期
     if(!config.minDate){
           mindate=nstr;
     }else{
       mindate=new Date(config.mindate)
     } 
     if(config.maxDate){
        maxdate=new Date(config.maxDate)
     }

    self.isLeap = function (year) {
        return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    }

  //如果最小时间大于等于当前时间，那么设置当前时间为最小时间
    
     // console.log("最小日期是:",mindate.format("yyyy-MM-dd"))
     // console.log("最大日期是:",maxdate.format("yyyy-MM-dd"))
     // console.log("当前日期：",currentDate())

    pain();
    function pain() {
        var n1str = new Date(ynow, mnow, 1); //当月第一天 
        var firstday = n1str.getDay(); //当月第一天星期几
        var m_days = new Array(31, 28 + self.isLeap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数
        var tr_str = Math.ceil((m_days[mnow] + firstday) / 7); //表格所需要行数

        //打印表格第一行（有星期标志）
        $("#datetb").remove();
        var str = "<table id='datetb' cellspacing='0'><tr><td>周日</td><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td></tr>";
        for (i = 0; i < tr_str; i++) { //表格的行
            str += "<tr>";
            for (k = 0; k < 7; k++) { //表格每行的单元格
                idx = i * 7 + k; //单元格自然序列号
                date_str = idx - firstday + 1; //计算日期
                (date_str <= 0 || date_str > m_days[mnow]) ? date_str = "&nbsp;" : date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）
                //打印日期：今天底色样式
                date_str == dnow ? str += "<td class='selected' data-day=" + date_str + ">" + "<div>" + date_str + "</div>" + "<div class='subscribe'>预约</div>" + "</td>" : str += "<td  data-day=" + date_str + ">" + date_str + "</td>";
            }
            str += "</tr>"; //表格的行结束
        }
        str += "<tfoot><tr><td style='pointer-events: none;' colspan='7'>" + ynow + "年" + (mnow + 1) + "月</td></tr></tfoot>";
        str += "</table>"; //表格结束
        $ele.html(str);
        setDate(ynow, mnow, dnow);
    }

    function setDate(y, m, d) {
        var current = (new Date(y, m, d, 10, 0, 0)).format("yyyy-MM-dd");
        //console.log(y, m, d, current);
        config.$valueEle.val(current);
        return function getresult(){
            var data={
                'M':new Date(y, m, d).getMonth()+1,
                'D':new Date(y, m, d).getDate()
            }
        }
    }
    function currentDate(){
        return (new Date(ynow, mnow, dnow, 10, 0, 0)).format("yyyy-MM-dd");
    }
    self.prev=function(){
       var temp = mnow - 1;
        if (temp < 0) {
            mnow = 11;
            ynow--;
        } else {
            //过期无效时间 处理
             var prevdate=new Date(ynow, mnow-1, 31, 10, 0, 0);
            if (prevdate <mindate-1) {
                console.log("超过最小可预约日期",prevdate.format("yyyy-MM-dd"))
                return;
            }
            mnow--;
        }
         if(ynow==mindate.getFullYear()&&mnow==mindate.getMonth()){
                 var _mday=mindate.getDate();
                if(dnow<_mday) dnow=_mday;
            }

        pain(); 

    }
    self.next=function(){
           var nextdate=new Date(ynow, mnow+1, 1, 10, 0, 0);
            if (nextdate>maxdate) {
                console.log("超过最大可预约日期",nextdate.format("yyyy-MM-dd"))
                return ; 
            }

          var temp = mnow + 1;
        if (temp > 11) {
            mnow = 0;
            ynow++;
        } else {
            mnow++;
        }
          if(ynow==maxdate.getFullYear()&&mnow==maxdate.getMonth()){
                var _mday=maxdate.getDate();
                if(dnow>_mday) dnow=_mday;
            }
        pain();  
    }
    self.seleted=function($td){
       if (!$td.hasClass('selected')) {
            var day = $td.data("day");
             var selectedDate=new Date(ynow, mnow, day, 1, 0, 0);
             var todate=new Date();
            if (day<todate.getDate()&&mnow==todate.getMonth()){
                alert("该不能预约过去的日期");
                return;
            }else if(selectedDate>maxdate) {
                 alert("该日期预约天数超过最多");
                return;
            }
            $(".datebox table td").removeClass('selected').children('.subscribe').remove();
           $td.addClass('selected');
           $td.html('<div>' + $td.html() + '</div><div class="subscribe">预约</div>');
           dnow=day;
            setDate(ynow, mnow, day);
        }
    }
    self.getDate=function(){
       return currentDate();
    }

    $ele.on("click", "table td", function () {
      self.seleted($(this));
    });
    config.$prev.click(function () {
     self.prev();
    });
   config.$next.click(function () {
      self.next();
    });  
    return self;
}

