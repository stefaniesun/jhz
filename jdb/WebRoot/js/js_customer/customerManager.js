$(document).ready(function() {
	$("#customerButton").click(function(){
		loadTable();
	});
	
	initTable();
});

function initTable(){
	
	var toolbar = [];
	if(xyzControlButton('buttonCode_w20151231115901')){
		toolbar[toolbar.length]={
				text: '编辑客户',
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
		table : 'customerManagerTable',
		title : '客户列表',
		url:'../CustomerWS/queryCustomerList.do',
		pageList : [5,10,15,30,50],
		pageSize : 5,
		toolbar:toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		columns : [[
		    {field:'checkboxTemp',checkbox:true},
			{field:'username',title:'帐号',width:100},
			{field:'nickName',title:'昵称',width:100},
			{field:'enabled',title:'账户状态',
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
			{field:'operTemp0',title:'用户等级',
				formatter: function(value,row,index){
					return "<a href='javascript:void(0);' onclick='setCustomerUserTag(\""+row.username+"\")'>设置</a>";
				}
			},
			{field:'operTemp1',title:'操作',
				formatter: function(value,row,index){
						var btn1 = "<a href='javascript:void(0);' onclick='setCustomerUserTag(\""+row.iidd+"\")'>标签设置</a>";
						return btn1;
				}
			},
			{field:'phone',title:'联系电话'},
			{field:'email',title:'邮箱'},
			{field:'linkman',title:'联系人'},
			{field:'linkPhone',title:'联系人电话'},
			{field:'addDate',title:'添加时间'}
		]]
	});
	
}

function loadTable(){
	var username = $("#username").val();
	$("#customerManagerTable").datagrid("load",{
		username : username,
	});
}


function editCustomerEnabled( iidd, enabled){
	xyzAjax({
		url:"../CustomerWS/editCustomerEnabled.do",
		data:{
			iidd:iidd,
			enabled:enabled
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#customerManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
}


function editCustomerButton(title){
	
	var customer = $("#customerManagerTable").datagrid("getChecked");
	if(customer.length != 1){
		top.$.messager.alert("提示","请先选中单个对象！","info");
		return;
	}
	var row = customer[0];
	
	xyzdialog({
		dialog : 'dialogFormDiv_editCustomer',
		title : title,
	    href : '../jsp_buyer/editCustomer.html',
	    fit:false,
	    height:300,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				editCustomerSubmit(row.iidd);
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_editCustomer").dialog("destroy");
			}
		}],
		onOpen : function(){
			xyzAjax({
				url : "../CustomerWS/getCustomer.do",
				data:{
					username:row.username
				},
				success:function(data){
					if(data.status==1){
						$("#nickNameForm").val(data.content.nickName);
						$("#phoneForm").val(data.content.phone);
						$("#emailForm").val(data.content.email);
						$("#linkmanForm").val(data.content.linkman);
						$("#linkPhoneForm").val(data.content.linkPhone);
					}else{
						top.$.messager.alert("警告",data.msg,"warning");
					}
				}
			});
		}
	});
}


function editCustomerSubmit(iidd){
	var password=$("#passwordForm").val();
	var newPassword=$.md5(password).substr(8,16);
	if(!$("form").form('validate')){
		return;
	}
	xyzAjax({
		url:"../CustomerWS/editCustomer.do",
		data:{
			iidd:iidd,
			nickName:$("#nickNameForm").val().trim(),
			phone:$("#phoneForm").val().trim(),
			email:$("#emailForm").val().trim(),
			linkman:$("#linkmanForm").val().trim(),
			linkPhone:$("#linkPhoneForm").val().trim()
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","操作成功","info");
				$("#dialogFormDiv_editCustomer").dialog("destroy");
				$("#customerManagerTable").datagrid("reload");
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

function setCustomerUserTagSubmit(username){
	
	if(!$("form").form('validate')){
		return false;
	}
	
	var userTag=$("#userTagForm").combobox("getValue");

	$.ajax({
		url : "../CustomerWS/editUserTag.do",
		type : "POST",
		data : {
			username:username,
			userTag : userTag
		},
		async : false,
		dataType : "json",
		success : function(data) {
			if(data.status==1){
				$("#dialogFormDiv_setCustomerUserTag").dialog("destroy");
				top.$.messager.alert("提示","设置成功！","info");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			top.window.AjaxError(XMLHttpRequest, textStatus, errorThrown);
		}
	});
}

function setCustomerUserTag(username){
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "用户等级 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='userTagForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_setCustomerUserTag',
		title : '设置用户等级',
		content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				setCustomerUserTagSubmit(username);
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_setCustomerUserTag").dialog("destroy");
			}
		}],
		onOpen:function(){
			xyzCombobox({
				combobox : 'userTagForm',
				url : '../ListWS/getUserTagList.do',
			});
		}
	});
}
