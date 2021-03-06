$(document).ready(function() {
	
	
	$("#seekHelpButton").click(function(){
		loadTable();
	});
	
	initTable();
	
});

function initTable(){
	var toolbar = [];
	if(xyzControlButton("buttonCode_x20160222161803")){//删除
		toolbar[toolbar.length]={
				text: '删除',
				iconCls: 'icon-edit',
				handler: function(){updateseekHelpForFlagRefund();}
		};
	}
	
	xyzgrid({
		table : 'seekHelpManagerTable',
		title : '遇险求助列表',
		url:'../SeekHelpWS/querySeekHelpList.do',
		pageList : [5,10,15,30,50],
		pageSize : 15,
		toolbar : toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		columns:[[
			    {field:'checkboxTemp',checkbox:true},
			    {field:'headimgurl',title:'头像',width:30,
					formatter : function(value,row,index){
						return '<img width="30px" height="30px" src="'+row.headimgurl+'" ondblclick="window.open(this.src);" title="双击打开大图" />';
					}
				},
				{field:'numberCode',title:'编号',hidden:true},
				{field:'nickname',title:'昵称'},
				{field:'phone',title:'联系电话'},
				{field:'openid',title:'OPENID',hidden:true},
				{field:'locationX',title:'locationX',hidden:true},
				{field:'locationY',title:'locationY',hidden:true},
				{field:'scale',title:'缩放比例',width:100,hidden:true},
				{field:'location',title:'经纬度',
					formatter : function(value,row,index){
						var a = '<a href="http://apis.map.qq.com/uri/v1/marker?marker=coord:'+row.locationX+','+row.locationY+';title:求助位置;addr:'+row.label+'&referer=西藏旅游" target="_blank">'+row.locationX+','+row.locationY+'</a>';
						return a;
					}
				},
				{field:'label',title:'位置'},
				{field:'status',title:'状态',
					formatter : function(value,row,index){
						if(value == 1){
							return "√";
						}else {
							return "未处理";
						}
					},
					styler : function(value,row,index){
						if(value == 1){
							return "background-color:green";
						}else {
							return "background-color:red";
						}
					}
				},
				{field:'operat',title:'操作',
					formatter : function(value,row,index){
						if(xyzControlButton("buttonCode_x20160222161802")){//修改状态
							if(row.status==1){
								return '<a href="javascript:void(0);" onclick="updateSeekHelp(\''+row.numberCode+'\')">置为未处理</a>';
							}else{
								return '<a href="javascript:void(0);" onclick="updateSeekHelp(\''+row.numberCode+'\')">置为已处理</a>';
							}
						}
					}
				},
				{field:'addDate',title:'发起时间',width:100},
				{field:'alterDate',title:'处理时间',width:100}
		]]
	});
}

function loadTable(){
	$("#seekHelpManagerTable").datagrid("load",{});
}

function updateSeekHelp(numberCode){
	$.messager.confirm('确认','您要修改该求助的状态吗？',function(r){
		if(r){
			xyzAjax({
				url:"../SeekHelpWS/updateSeekHelp.do",
				data:{
					numberCode : numberCode
				},
				success:function(data){
					if(data.status==1){
						top.$.messager.alert("提示","操作成功","info");
						$("#seekHelpManagerTable").datagrid("reload");
					}else{
						top.$.messager.alert("警告",data.msg,"warning");
					}
				}
			});
		}
	});
}

function updateOrderContentForFlagRefund (){
	var clientCode = $.map($("#orderContentManagerTable").datagrid("getChecked"),function(p){return p.clientCode;}).join(",");
	xyzAjax({
		url:"../OrderContentWS/updateOrderContentForFlagRefund.do",
		data:{
			orderContents:clientCode
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#orderContentManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
}

function updateOrderContentForPersonInfo(title){
	var clientCode = $("#orderContentManagerTable").datagrid("getChecked");
	if(clientCode.length != 1){
		top.$.messager.alert("提示","请先选中单个对象！","info");
		return;
	}
	var row = clientCode[0];
	var type=row.product.substring(0,2);
	xyzdialog({
		dialog : 'dialogFormDiv_updateOrderContentForPersonInfo',
	    href : '../jsp_core/updateOrderContentForPersonInfo.html',
	    fit:false,
	    title:title,
	    height:300,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				updateOrderContentForPersonInfoSubmit(type,row.clientCode);
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_updateOrderContentForPersonInfo").dialog("destroy");
			}
		}],onLoad:function(){
			var personInfoStr=row.personInfo;
			var personInfoArray=xyzJsonToObject(personInfoStr);
			var titleHtml="";
			var contentHtml="";
			if(personInfoArray.length>0){
				for(var i=0;i<personInfoArray.length;i++){
					//用于拼接中文标题
					titleHtml="";
					titleHtml+="<tr>";
					//用于拼接内容
					if(type=="HO"){
						contentHtml+="<tr name='hoPersonInfoTr'>";
					}else if(type=="SC"){
						contentHtml+="<tr name='scPersonInfoTr'>";
					}
					
					for(var ii=0;ii<personInfoArray[i].length;ii++){
						var personInfoObject=personInfoArray[i][ii];
						//中文名
						var text=personInfoObject.text;
						//值
						var value=personInfoObject.value;
						var key=personInfoObject.key;
						titleHtml+="<td>"+text+"</td>";
						contentHtml+="<td><input name='"+key+"' type='text' value='"+value+"' /></td>";
					}
					titleHtml+="<td ><img src='../image/other/addPage.gif' alt='加一项' onclick='addPersonInfo(\""+0+"\",\""+type+"\");' /></td></tr>";
					contentHtml+="<td>";
					contentHtml+="<img name='personInfoImgNode' src='../image/other/addPage.gif' onclick='addPersonInfo(\""+1+"\",\""+type+"\",this)' />";
					contentHtml+="<img  src='../image/other/deletePage.png' onclick='deletePersonInfo(this)' />";
					contentHtml+="</td>";
					contentHtml+="</tr>";
				}
				var newHtml=titleHtml+contentHtml;
				$("#personInfoTable").html(newHtml);
			}else{
				if(type=="HO"){
					var hoTitleHtml="";
					hoTitleHtml+="<tr>";
					hoTitleHtml+="<td >姓名</td>";
					hoTitleHtml+="<td >证件</td>";
					hoTitleHtml+="<td ><img src='../image/other/addPage.gif' alt='加一项' onclick='addPersonInfo(\""+0+"\",\""+type+"\");' /></td>";
					hoTitleHtml+="</tr >";
					$("#personInfoTable").html(hoTitleHtml);
				}else if(type=="SC"){
					var scTitleHtml="";
					scTitleHtml+="<tr>";
					scTitleHtml+="<td>姓名</td>";
					scTitleHtml+="<td><img src='../image/other/addPage.gif' alt='加一项' onclick='addPersonInfo(\""+0+"\",\""+type+"\");' /></td>";
					scTitleHtml+="</tr >";
					$("#personInfoTable").html(scTitleHtml);
				}
			}
		}
	});
}

function updateOrderContentForPersonInfoSubmit(type,clientCode){
	var personInfo="";
	if(type=="HO"){
		var hoPersonInfo=[];
		$.map($("#personInfoTable tr[name^='hoPersonInfoTr']"),function(p,index){
			var hoPersonInfoStrArray=[];
			var hoPersonInfoNameObject={};
			var hoPersonInfoCardObject={};
			var name=$($("input[name='name']")[index]).val();
			var card=$($("input[name='card']")[index]).val();
			hoPersonInfoNameObject.key="name";
			hoPersonInfoNameObject.text="名称";
			hoPersonInfoNameObject.value=name;
			
			hoPersonInfoCardObject.key="card";
			hoPersonInfoCardObject.text="证件";
			hoPersonInfoCardObject.value=card;
			hoPersonInfoStrArray[hoPersonInfoStrArray.length]=hoPersonInfoNameObject;
			hoPersonInfoStrArray[hoPersonInfoStrArray.length]=hoPersonInfoCardObject;
			hoPersonInfo[hoPersonInfo.length]=hoPersonInfoStrArray;
		});
		personInfo=JSON.stringify(hoPersonInfo);
	}else if(type=="SC"){
		var scPersonInfo=[];
		$.map($("#personInfoTable tr[name^='scPersonInfoTr']"),function(p,index){
			var scPersonInfoStrArray=[];
			var scPersonInfoNameObject={};
			var name=$($("input[name='name']")[index]).val();
			scPersonInfoNameObject.key="name";
			scPersonInfoNameObject.text="名称";
			scPersonInfoNameObject.value=name;
			
			scPersonInfoStrArray[scPersonInfoStrArray.length]=scPersonInfoNameObject;
			scPersonInfo[scPersonInfo.length]=scPersonInfoStrArray;
		});
		personInfo=JSON.stringify(scPersonInfo);
	}
	
	xyzAjax({
		url:"../OrderContentWS/updateOrderContentForPersonInfo.do",
		data:{
			personInfo:personInfo,
			clientCode:clientCode
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#orderContentManagerTable").datagrid("reload");
				$("#dialogFormDiv_updateOrderContentForPersonInfo").dialog("destroy");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
}

function addPersonInfo(flag,type,node){
	if(flag==1){
		if(type=="HO"){
			var hoContentHtml="";
			hoContentHtml+="<tr name='hoPersonInfoTr'>";
			hoContentHtml+="<td><input name='name' type='text' /></td>";
			hoContentHtml+="<td>";
			hoContentHtml+="<input name='card' type='text' />";
			hoContentHtml+="</td>";
			hoContentHtml+="<td>";
			hoContentHtml+="<img name='personInfoImgNode' src='../image/other/addPage.gif' onclick='addPersonInfo(\""+1+"\",\""+type+"\",this)' />";
			hoContentHtml+="<img  src='../image/other/deletePage.png' onclick='deletePersonInfo(this)' />";
			hoContentHtml+="</td>";
			hoContentHtml+="</tr>";
			$(node).parent().parent().after(hoContentHtml);
		}else if(type=="SC"){
			var scContentHtml="";
			scContentHtml+="<tr name='scPersonInfoTr'>";
			scContentHtml+="<td>";
			scContentHtml+="<input name='name' type='text' />";
			scContentHtml+="</td>";
			scContentHtml+="<td>";
			scContentHtml+="<img name='personInfoImgNode' src='../image/other/addPage.gif' onclick='addPersonInfo(\""+1+"\",\""+type+"\",this)' />";
			scContentHtml+="<img  src='../image/other/deletePage.png' onclick='deletePersonInfo(this)' />";
			scContentHtml+="</td>";
			scContentHtml+="</tr>";
			$(node).parent().parent().after(scContentHtml);
		}
	}else if(flag==0){
		if(type=="HO"){
			var hoContentHtml="";
			hoContentHtml+="<tr name='hoPersonInfoTr'>";
			hoContentHtml+="<td><input name='name' type='text' /></td>";
			hoContentHtml+="<td>";
			hoContentHtml+="<input name='card' type='text' />";
			hoContentHtml+="</td>";
			hoContentHtml+="<td>";
			hoContentHtml+="<img name='personInfoImgNode' src='../image/other/addPage.gif' onclick='addPersonInfo(\""+1+"\",\""+type+"\",this)' />";
			hoContentHtml+="<img  src='../image/other/deletePage.png' onclick='deletePersonInfo(this)' />";
			hoContentHtml+="</td>";
			hoContentHtml+="</tr>";
			$("#personInfoTable").append(hoContentHtml);
		}else if(type=="SC"){
			var scContentHtml="";
			scContentHtml+="<tr name='scPersonInfoTr'>";
			scContentHtml+="<td>";
			scContentHtml+="<input name='name' type='text' />";
			scContentHtml+="</td>";
			scContentHtml+="<td>";
			scContentHtml+="<img name='personInfoImgNode' src='../image/other/addPage.gif' onclick='addPersonInfo(\""+1+"\",\""+type+"\",this)' />";
			scContentHtml+="<img  src='../image/other/deletePage.png' onclick='deletePersonInfo(this)' />";
			scContentHtml+="</td>";
			scContentHtml+="</tr>";
			$("#personInfoTable").append(scContentHtml);
		}
	}
}

function deletePersonInfo(node){
	$(node).parent().parent().remove();
}