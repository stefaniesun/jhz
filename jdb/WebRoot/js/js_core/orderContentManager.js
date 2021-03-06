$(document).ready(function() {
	
	
	$("#orderContentButton").click(function(){
		loadTable();
	});
	
	initTable();
	
});

function initTable(){
	var toolbar = [];
	if(xyzControlButton("buttonCode_w20151221155601")){
		toolbar[toolbar.length]={
				text: '出票',
				iconCls: 'icon-edit',
				handler: function(){updateOrderContentForFlagClient();}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton("buttonCode_w20151221155602")){
		toolbar[toolbar.length]={
				text: '退票',
				iconCls: 'icon-edit',
				handler: function(){updateOrderContentForFlagRefund();}
		};
	}
	if(xyzControlButton("buttonCode_w20151221155602")){
		toolbar[toolbar.length]={
				text: '修改出行人',
				iconCls: 'icon-edit',
				handler: function(){var title=$(this).text();updateOrderContentForPersonInfo(title);}
		};
	}
	
	xyzgrid({
		table : 'orderContentManagerTable',
		title : '订单列表',
		url:'../OrderContentWS/queryOrderContentList.do',
		pageList : [5,10,15,30,50],
		pageSize : 15,
		toolbar : toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		frozenColumns : [[
		    {field:'checkboxTemp',checkbox:true},
			{field:'orderNum',title:'订单编号'},
			{field:'clientCode',title:'客户码',width:100,hidden:true},
			{field:'provider',title:'供应商编号',width:100,hidden:true},
			{field:'product',title:'产品编号',width:100,hidden:true},
			{field:'flagPay',title:'支付',width:30,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
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
			{field:'flagClient',title:'出票',width:30,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
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
			{field:'flagUse',title:'使用',width:30,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
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
			{field:'flagApply',title:'申请退票',width:60,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
					}
				},
				styler : function(value,row,index){
					if(value == 1){
						return "background-color:red";
					}else {
						return "background-color:green";
					}
				}
			},
			{field:'flagRefund',title:'退票',width:30,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
					}
				},
				styler : function(value,row,index){
					if(value == 1){
						return "background-color:red";
					}else {
						return "background-color:green";
					}
				}
			},
			{field:'flagOver',title:'冻结',width:30,
				formatter : function(value,row,index){
					if(value == 1){
						return "√";
					}else {
						return "×";
					}
				},
				styler : function(value,row,index){
					if(value == 1){
						return "background-color:green";
					}else {
						return "background-color:red";
					}
				}
			}]],
			columns:[[
			{field:'productNameCn',title:'产品名称',width:100},
			{field:'providerNameCn',title:'供应商名称',width:100},
			{field:'buyer',title:'买家',width:100},
			{field:'price',title:'单价',width:100},
			{field:'count',title:'数量',width:100},
			{field:'money',title:'总价',width:100},
			{field:'addDate',title:'录单日期',width:100},
			{field:'dateInfo',title:'出行日期',width:100},
			{field:'payDate',title:'支付时间',width:100},
			{field:'clientDate',title:'出票时间',width:100},
			{field:'useDate',title:'使用时间',width:100},
			{field:'applyDate',title:'申请退票时间',width:100},
			{field:'refundDate',title:'退票时间',width:100},
			{field:'alterDate',title:'最后修改时间',width:100},
			{field:'overDate',title:'冻结时间',width:100},
			{field:'cleanDate',title:'清洗时间',width:100}
		]],
		queryParams : {
			flagStr : $("#flagStr").combobox("getValue")
		}
	});
	
}

function loadTable(){
	var orderNum = $("#orderNum").val();
	var flagStr=$("#flagStr").combobox("getValues").join(",");
	var buyer=$("#buyer").val();
	var dateStr=$("#dateStr").combobox("getValue");
	var dateStart=$("#dateStart").datebox("getValue");
	var dateEnd=$("#dateEnd").datebox("getValue");
	var remarkStr=$("#remarkStr").combobox("getValue");
	var remark=$("#remark").val();
	var productNameCn=$("#productNameCn").val();
	var providerNameCn=$("#providerNameCn").val();
	$("#orderContentManagerTable").datagrid("load",{
		orderNum : orderNum,
		flagStr:flagStr,
		buyer:buyer,
		dateStr:dateStr,
		dateStart:dateStart,
		dateEnd:dateEnd,
		remarkStr:remarkStr,
		remark:remark,
		productNameCn:productNameCn,
		providerNameCn:providerNameCn
	});
}

function updateOrderContentForFlagClient(){
	var clientCode = $.map($("#orderContentManagerTable").datagrid("getChecked"),function(p){return p.clientCode;}).join(",");
	xyzAjax({
		url:"../OrderContentWS/updateOrderContentForFlagClient.do",
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