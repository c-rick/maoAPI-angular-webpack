
app.directive('houselist',function(){	
	return {
		restrict:'EA',
		replace:false,
		scope:{
			housedata:'=houseDate'
		},
		template:'<div ng-repeat="house in housedata"><div class="datail-item">'
			    +'<div class="detail-img"><img ng-src={{house.img}}>'
			    +'</div><div class="detail-title"><p>{{house.name}}</p>'
			    +'<p>{{house.content}}</p><span>{{house.other}} 免费取消</span>'    
			    +'</div><div class="detail-price"><p class="price-yuan"><big>{{house.price}}</big>起</p>'
			    +'<a href="">预订</a></div></div></div>',
		link:function(){}
	}
}).directive('policy',function(){
	return {
		restrict:'EA',
		replace:false,
		scope:{
			policys:'=policyData',
			tel:'=policyTel'
		},
		template:'<div class="detail-other"><span style="vertical-align: top;">酒店政策</span>'
			    +'<div class="rule"  ><p ng-repeat="policy in policys">{{$index + 1}}.{{policy.content}}</p>'
			    +'</div><a class="tel" href="tel:{{tel}}" ><i class="iconfont icon-icon"></i><p>联系商家</p></a></div>',
		link:function(){}
	}
}).directive('comment',function(){
	return {
		restrict:'EA',
		replace:false, 
		scope:{
			comments:'=commentData',
		},
		template:'<div class="detail-other"> <a ng-href={{comments.link}} class="gotoasse"><span style="color:black;">用户评价({{comments.data.length}})</span><span style="float:right;padding-right:0.5rem;">查看更多 ></span></a></div>'
			    +'<div class="assem-detail" ng-repeat="comment in comments.data"><div class="assem-header">'
			    +'<img ng-src={{comment.userimg}} alt=""><span>{{comment.usesrname}}</span><span >{{comment.housetype}}</span></div>'
			    +'<div class="assem-content"> <p>{{comment.contentT}}</p><div><img ng-repeat="cimg in comment.contentI track by $index" ng-src={{cimg}} alt=""></div>'
			    +' <p>{{comment.createtime}}</p></div></div>',
		link:function(scope,element,attrs){
			
		}
	}
}).directive('equipment',function(){
	return {
		restrict:'EA',
		replace:false,
		scope:{
			equipments:'=equipmentData',
		},
		template:'<div class="detail-other"><span>设施设备</span>'
			    +'<i ng-repeat="equipment in equipmentarr"  ng-class=equipment  ></i></div>',
		link:function(scope,element,attrs){
			scope.$watch('equipments',function(data){
				var equipmentarr=[];
				angular.forEach(data,function(value,key){
					switch(value){
						case '空调':equipmentarr.push('iconfont icon-kongtiao');break;
						case '热水':equipmentarr.push('iconfont icon-reshui');break;
						case 'wify':equipmentarr.push('iconfont icon-hotelwify');break;
						case '大床':equipmentarr.push('iconfont icon-chuang');break;
						case '电视':equipmentarr.push('iconfont icon-dianshi');break;
					}
				})
				scope.equipmentarr=equipmentarr;
			})	
		}
	}
}).directive('fancybox',function(){
	return {
		restrict:'EA',
		replace:false,
		scope:{
			fancyboxs:'=fancyboxData',
		},
		template:'<div class="img-bg"><a rel="group" ng-repeat="fancybox in fancyboxs"  title={{fancybox.title}} >'
			    +'<img alt=""  ng-src={{fancybox.url}} /></a></div>',
		link:function(scope,element,attrs){
			scope.$watch('fancyboxs',function(data){
					//更多图片插件初始化
		          jQuery("a[rel=group]").fancybox({
		              'titlePosition' : 'over',
		              'cyclic'        : true
		              //'titleFormat'	: function(title, currentArray, currentIndex, currentOpts) {
		                  //return '<span id="fancybox-title-over">' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
		              //}
		          });
				})
		}
	}
})

           
          
           
           
              
               
               
             
             
              
               
                 
                 
               
              
             
           
           
           
         