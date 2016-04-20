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
			{field:'account',title:'支付宝帐号',width:100},
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
			{field:'operTemp1',title:'开关',
				formatter: function(value,row,index){
					if(row.enabled==1){
						return "<a href='javascript:void(0);' onclick='editCustomerEnabled(\""+row.iidd+"\",\""+0+"\")'>关闭</a>";
					}else{
						return "<a href='javascript:void(0);' onclick='editCustomerEnabled(\""+row.iidd+"\",\""+1+"\")'>启用</a>";
					}
				}
			},
			{field:'operTemp2',title:'操作',
				formatter: function(value,row,index){
						var btn1 = "<a href='javascript:void(0);' onclick='setCustomerUserTag(\""+row.iidd+"\")'>标签设置</a>";
						return btn1;
				}
			},
			{field:'card1Image',title:'身份证正面照',
				formatter: function(value,row,index){
					return "<a href='javascript:void(0);' onclick='window.open(\"../upload/image/"+row.card1Image+"\")'>查看</a>";
				}	
			},
			{field:'card2Image',title:'身份证反面照',
				formatter: function(value,row,index){
					return "<a href='javascript:void(0);' onclick='window.open(\"../upload/image/"+row.card2Image+"\")'>查看</a>";
				}	
			},
			{field:'card3Image',title:'学生证正面照',
				formatter: function(value,row,index){
					return "<a href='javascript:void(0);' onclick='window.open(\"../upload/image/"+row.card3Image+"\")'>查看</a>";
				}	
			},
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
	    href : '../jsp_customer/editCustomer.html',
	    fit:false,
	    height:500,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				editCustomerSubmit(row.numberCode);
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
						$("#phoneForm").val(data.content.username);
						$("#addressForm").val(data.content.address);
						
						$("#linkmanName1Form").val(data.content.linkmanName1);
						$("#linkmanName2Form").val(data.content.linkmanName2);
						$("#linkmanPhone1Form").val(data.content.linkmanPhone1);
						$("#linkmanPhone2Form").val(data.content.linkmanPhone2);
						
						$("#linkmanType1Form").combobox('setValue',row.linkmanType1);
						$("#linkmanType2Form").combobox('setValue',row.linkmanType2);
					
					}else{
						top.$.messager.alert("警告",data.msg,"warning");
					}
				}
			});
		}
	});
}


function editCustomerSubmit(numberCode){
	
	if(!$("form").form('validate')){
		return;
	}
	var nickName=$("#nickNameForm").val();
	var address=$("#addressForm").val();
	
	var linkmanName1=$("#linkmanName1Form").val();
	var linkmanName2=$("#linkmanName2Form").val();
	var linkmanPhone1=$("#linkmanPhone1Form").val();
	var linkmanPhone2=$("#linkmanPhone2Form").val();
	var linkmanType1=$("#linkmanType1Form").combobox('getValue');
	var linkmanType2=$("#linkmanType2Form").combobox('getValue');
	
	xyzAjax({
		url:"../CustomerWS/editCustomer.do",
		data:{
			numberCode:numberCode,
			nickName:nickName,
			address:address,
			linkmanName1:linkmanName1,
			linkmanName2:linkmanName2,
			linkmanPhone1:linkmanPhone1,
			linkmanPhone2:linkmanPhone2,
			linkmanType1:linkmanType1,
			linkmanType2:linkmanType2,
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
