$(document).ready(function() {
	$("#productButton").click(function(){
		loadTable();
	});
	
	initTable();
	
});

function initTable(){
	var toolbar = [];
	if(xyzControlButton('buttonCode_y20160315111001')){
		toolbar[toolbar.length]={
				text: '新增模型',
				border:'1px solid #bbb',
				iconCls: 'icon-add',
				handler: function(){var title=$(this).text();addBorrowModelButton(title);}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton('buttonCode_y20160315111102')){
		toolbar[toolbar.length]={
				text: '编辑模型',
				border:'1px solid #bbb',
				iconCls: 'icon-edit',
				handler: function(){var title=$(this).text();editUserTagButton(title);}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton('buttonCode_y20160315111103')){
		toolbar[toolbar.length]={
				text: '删除模型',
				border:'1px solid #bbb',
				iconCls: 'icon-remove',
				handler: function(){deleteUserTagButton();}
		};
		toolbar[toolbar.length]='-';
	}
	
	xyzgrid({
		table : 'borrowModelManagerTable',
		title : '标签列表',
		url:'../BorrowModelWS/queryBorrowModelList.do',
		pageList : [5,10,15,30,50],
		pageSize : 15,
		toolbar:toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		columns : [[
		    {field:'checkboxTemp',checkbox:true},
			{field:'iidd',title:'标签编号',hidden:true},
			{field:'amount',title:'借款金额',width:100},
			{field:'baseAmount',title:'基数金额',width:100},
			{field:'overdueAmount',title:'逾期基数金额',width:100}
		]]
	});
}

function loadTable(){
	var nameCn = $("#nameCn").val();
	$("#borrowModelManagerTable").datagrid("load",{
		nameCn:nameCn
	});
}

function addBorrowModelButton(title){
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "借款金额 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='amountForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "基数金额 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='baseAmountForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "逾期基数金额 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='overdueAmountForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_addBorrowModelButton',
		title : title,
		content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				addBorrowModelSubmit();
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_addBorrowModelButton").dialog("destroy");
			}
		}]
	});
	
}

function editUserTagButton(title){
	
	var provider = $("#userTagManagerTable").datagrid("getChecked");
	if(provider.length != 1){
		top.$.messager.alert("提示","请先选中单个对象！","info");
		return;
	}
	var row = provider[0];
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "关系名称 ：  &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='nameCnForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "<tr>";
	 contentHtml += "	<td valign='top' align='right'>";
	 contentHtml += "备注 ： &nbsp ";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "	<textarea  id='remarkForm' style='width:400px;height: 150px'   ></textarea>";
	 contentHtml += "</td>";
	 contentHtml += "	</tr>";
	 contentHtml += "</table>";
	xyzdialog({
		dialog : 'dialogFormDiv_editUserTagButton',
		title : title,
	  	content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				editUserTagSubmit(row.iidd);
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_editUserTagButton").dialog("destroy");
			}
		}],
		onOpen:function(){
			$("#nameCnForm").val(row.nameCn);
			$("#remarkForm").val(row.remark);
			
		}
	});
	
}

function addBorrowModelSubmit(target){
	var amount=$("#amountForm").val();
	var baseAmount=$("#baseAmountForm").val();
	var overdueAmount=$("#overdueAmountForm").val();
	
	if(!$("form").form('validate')){
		return;
	}
	
	xyzAjax({
		url:"../BorrowModelWS/addBorrowModel.do",
		data:{
			amount:amount,
			baseAmount:baseAmount,
			overdueAmount:overdueAmount
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#dialogFormDiv_addBorrowModelButton").dialog("destroy");
				$("#borrowModelManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
}

function editUserTagSubmit(iidd){
	var nameCn=$("#nameCnForm").val();
	var remark=$("#remarkForm").val();
	if(!$("form").form('validate')){
		return;
	}
	
	xyzAjax({
		url:"../UserTagWS/editUserTag.do",
		data:{
			iidd:iidd,
			nameCn:nameCn,
			remark:remark
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#dialogFormDiv_editUserTagButton").dialog("destroy");
				$("#userTagManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
}

function deleteUserTagButton(){
	var userTags = $.map($("#userTagManagerTable").datagrid("getChecked"),function(p){return p.iidd;}).join(",");
	if(userTags == null || userTags == ''){
		top.$.messager.alert("提示","请先选中需要删除的对象！","info");
		return;
	}
	if(!confirm("彻底删除对象，确定？")){
		return;
	}
	
	xyzAjax({
		url : '../UserTagWS/deleteUserTag.do',
		data : {
			iidd : userTags
		},
		success : function(data) {
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#userTagManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});



	
}