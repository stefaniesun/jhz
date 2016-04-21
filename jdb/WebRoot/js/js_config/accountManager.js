$(document).ready(function() {
	$("#userTagButton").click(function(){
		loadTable();
	});
	
	initTable();
});

function initTable(){
	
	var toolbar = [];
	if(xyzControlButton('buttonCode_w20151231115901')){
		toolbar[toolbar.length]={
				text: '新增借款账户',
				border:'1px solid #bbb',
				iconCls: 'icon-edit',
				handler: function(){var title=$(this).text();addAccountButton(title);}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton('buttonCode_w20151231115901')){
		toolbar[toolbar.length]={
				text: '编辑借款账户',
				border:'1px solid #bbb',
				iconCls: 'icon-edit',
				handler: function(){var title=$(this).text();editAccountButton(title);}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton('buttonCode_w20151231115901')){
		toolbar[toolbar.length]={
				text: '删除借款账户',
				border:'1px solid #bbb',
				iconCls: 'icon-edit',
				handler: function(){var title=$(this).text();editCustomerButton(title);}
		};
		toolbar[toolbar.length]='-';
	}
	if(xyzControlButton("buttonCode_h20160216100200")){
		toolbar[toolbar.length]='-';
		toolbar[toolbar.length]={
				text: '<div style="color:red">重设密码</div>',
				iconCls: 'icon-edit',
				handler: function(){editCustomerPassword();}
		};
	}
	
	xyzgrid({
		table : 'accountManagerTable',
		title : '借款账户列表',
		url:'../AccountWS/queryAccountList.do',
		pageList : [5,10,15,30,50],
		pageSize : 15,
		toolbar:toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		columns : [[
		    {field:'checkboxTemp',checkbox:true},
			{field:'account',title:'账户名',width:100},
			{field:'addDate',title:'添加时间',width:100}
		]]
	});
	
}

function loadTable(){
	var username = $("#username").val();
	$("#userTagManagerTable").datagrid("load",{
		username : username,
	});
}


function addAccountButton(title){
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "账户名 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='accountForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";

	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_addAccount',
		title : title,
		content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				addAccountSubmit();
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_addAccount").dialog("destroy");
			}
		}]
	});
	
}


function editAccountButton(title){
	
	var account = $("#accountManagerTable").datagrid("getChecked");
	if(account.length != 1){
		top.$.messager.alert("提示","请先选中单个对象！","info");
		return;
	}
	var row = account[0];
	
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "账户名 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='accountForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";

	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_editAccount',
		title : title,
		content : contentHtml,
	    fit:false,
	    height:300,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				editAccountSubmit(row.iidd);
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_editAccount").dialog("destroy");
			}
		}],
		onOpen : function(){
			$("#accountForm").val(row.account);
		}
	});
}


function addAccountSubmit(){
	var account=$("#accountForm").val();

	if(!$("form").form('validate')){
		return;
	}
	xyzAjax({
		url:"../AccountWS/addAccount.do",
		data:{
			account:account
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","保存成功","info");
				$("#dialogFormDiv_addAccount").dialog("destroy");
				$("#accountManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
	
}


function editAccountSubmit(iidd){
	var account=$("#accountForm").val();

	if(!$("form").form('validate')){
		return;
	}
	xyzAjax({
		url:"../AccountWS/editAccount.do",
		data:{
			iidd:iidd,
			account:account
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#dialogFormDiv_editAccount").dialog("destroy");
				$("#accountManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
	
}

function editCustomerPassword(){
	var users = $("#customerManagerTable").datagrid("getChecked");
	if(users.length != 1){
		top.$.messager.alert("提示","请先选中单个对象！","info");
		return;
	}
	
	var row = users[0];
	
	xyzdialog({
		dialog : 'editUserPassword',
		title : '重设['+row.username+']的登录密码',
		content:'<form><table><tr><td style="width:200px; text-align:right;">用户名:</td><td>'+row.username+'</td></tr><tr><td style="width:200px; text-align:right;">新密码:</td><td><input type="password" id="passwordForm"  class="easyui-validatebox" data-options="required:true,validType:\'length[3,20]\'"/></td></tr><tr><td style="width:200px; text-align:right;">确认密码:</td><td><input type="password" id="password2Form"  class="easyui-validatebox" data-options="required:true,validType:\'length[3,20]\'"/></td></tr></table></form>',
	    fit:false,
	    height:300,
	    width:500,
	    buttons:[{
			text:'确定',
			handler:function(){
				editCustomerPasswordSubmit(row.username);
			}
		},{
			text:'取消',
			handler:function(){
				$("#editUserPassword").dialog("destroy");
			}
		}]
	});
}

function editCustomerPasswordSubmit(username){
	
	if(!$("form").form('validate')){
		return false;
	}
	
	var password = $("#passwordForm").val();
	var password2 = $("#password2Form").val();
	if(password!=password2){
		top.$.messager.alert("提示","两次输入的密码不一致，请重新输入！","info");
		return;
	}
	password3 = $.md5(password).substr(8,16);
	
	$.ajax({
		url : "../CustomerWS/editCustomerPassword.do",
		type : "POST",
		data : {
			username : username,
			password : password3
		},
		async : false,
		dataType : "json",
		success : function(data) {
			if(data.status==1){
				$("#editUserPassword").dialog("destroy");
				top.$.messager.alert("提示","操作成功！","info");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			top.window.AjaxError(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

function setCustomerUserTag(numberCode){
	xyzdialog({
		dialog : 'dialogFormDiv_setCustomerUserTag',
		title : "客户标签管理",
		content : "<iframe id='dialogFormDiv_setCustomerUserTagIframe' frameborder='0' name='"+numberCode+"'></iframe>",
	    buttons:[{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_setCustomerUserTag").dialog("destroy");
			}
		}]
	});
	var tempWidth = $("#dialogFormDiv_setCustomerUserTag").css("width");
	var tempHeight = $("#dialogFormDiv_setCustomerUserTag").css("height");
	var tempWidth2 = parseInt(tempWidth.split("px")[0]);
	var tempHeight2 = parseInt(tempHeight.split("px")[0]);
	$("#dialogFormDiv_setCustomerUserTagIframe").css("width",(tempWidth2-20)+"px");
	$("#dialogFormDiv_setCustomerUserTagIframe").css("height",(tempHeight2-50)+"px");
	$("#dialogFormDiv_setCustomerUserTagIframe").attr("src","../jsp_buyer/customerUserTagManager.html");
}
