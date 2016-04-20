$(document).ready(function() {
	$("#userTagButton").click(function(){
		loadTable();
	});
	
	initTable();
});

function initTable(){

	var toolbar = [];
	
	xyzgrid({
		table : 'borrowOrderManagerTable',
		title : '借款申请列表',
		url:'../BorrowOrderWS/queryBorrowOrderList.do',
		pageList : [5,10,15,30,50],
		pageSize : 15,
		toolbar:toolbar,
		singleSelect : false,
		idField : 'iidd',
		height:'auto',
		columns : [[
		            {field:'checkboxTemp',checkbox:true},
	       			{field:'nickName',title:'借款人',width:70},
	       			{field:'linkPhone',title:'联系电话',width:80},
		      /*			{field:'linkmanPhone1',title:'第一联系电话',width:80},
		      			{field:'linkmanPhone2',title:'第二联系电话',width:80},
		      			{field:'address',title:'现居住地',width:80},*/
		      		
		     			{field:'borrowCount',title:'借款次数',width:60},
		     			{field:'borrowAmount',title:'借款金额',width:60},
		     			{field:'quota',title:'手续费',width:50},
		     			{field:'cycle',title:'借款期数',width:60},
		     			{field:'charge',title:'手续费',width:50},
		     			{field:'addDate',title:'借款时间',width:100},
		     			{field:'addDate',title:'延期申请',width:100},
		     			{field:'returnDate',title:'还款时间',width:100},
		     			{field:'overdue',title:'逾期',width:50},
		     			{field:'overdueAmount',title:'逾期费',width:50},
		     			{field:'checkFlag',title:'审核状态',
		    				formatter: function(value,row){
		    					if(row.cancelFlag=="0"){
		    						if(value=="-1"||value=="0"){
		    							return  "<a href='javascript:void(0);' onclick='check(\""+row.numberCode+"\")'>审核</a>";
		    						}else if(value=="1"){
		    							return "<span style='color:#11cd6e'>已审核</span>";
		    						}
		    					}
		    				}		
		    			},
		    			{field:'returnFlag',title:'状态',
		    				formatter: function(value,row){
		    					if(row.cancelFlag=="1"){
		    						return "<span style='color:#eb4f38'>已取消</span>";
		    					}else if(row.checkFlag=="0"){
		    						return "<span style='color:#a9b7b7'>待审核</span>";
		    					}else if(value=="0"){
		    						return "<span style='color:#56abe4'>进行中</span>";
		    					}else if(value=="1"){
		    						return "<span style='color:#11cd6e'>已还款</span>";
		    					}
		    					
		    				}		
		    			},
		    			{field:'operTemp1',title:'交易流水',
		    				formatter: function(value,row){
		    					if(row.checkFlag=="1"){
		    						return "<a href='javascript:void(0);' onclick='moneyFlow(\""+row.numberCode+"\")'>交易流水</a>";
		    					}
		    					
		    				}	
		    			},
		    			{field:'operTemp2',title:'借款协议',
		    				formatter: function(value,row){
		    					if(row.checkFlag=="1"){
		    						return "<a href='javascript:void(0);' onclick='print(\""+row.numberCode+"\")'>打印</a>";
		    					}
		    					
		    				}	
		    			},
		      			]],
		frozenColumns : [[
		             	
			
		]]
	});
	
}

function loadTable(){
	var username = $("#username").val();
	$("#borrowOrderManagerTable").datagrid("load",{
		username : username,
	});
}



function check(numberCode){
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "审核备注 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='remarkForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_check',
		title : '审核借款',
		content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'审核通过',
			handler:function(){
				checkSubmit(numberCode,"1");
			}
		},{
			text:'审核不通过',
			handler:function(){
				checkSubmit(numberCode,"-1");
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_check").dialog("destroy");
			}
		}]
	});
}

function checkSubmit(numberCode,value){
	
	var remark=	$("#remarkForm").val();
	
	xyzAjax({
		url : "../BorrowOrderWS/checkBorrowOrderOper.do",
		data:{
			numberCode:numberCode,
			value:value,
			remark:remark
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","保存成功","info");
				$("#dialogFormDiv_check").dialog("destroy");
				$("#borrowOrderManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
		}
	});
	
}

function addUserTagButton(title){
	 var contentHtml = "<table>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "等级名称 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='nameCnForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "借款额度 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='quotaForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";
	 contentHtml += "<tr>";
	 contentHtml += "<td align='right'>";
	 contentHtml += "借款最大期数 ： &nbsp";
	 contentHtml += "</td>";
	 contentHtml += "<td>";
	 contentHtml += "<input type='text' id='cycleForm' style='width:400px;' />";
	 contentHtml += "</td>";
	 contentHtml += "</tr>";

	 contentHtml += "</table>";
	
	xyzdialog({
		dialog : 'dialogFormDiv_addUserTag',
		title : title,
		content : contentHtml,
	    fit:false,
	    height:350,
	    width:600,
	    buttons:[{
			text:'确定',
			handler:function(){
				addUserTagSubmit();
			}
		},{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_addUserTag").dialog("destroy");
			}
		}]
	});
	
}


function addUserTagSubmit(){
	var nameCn=$("#nameCnForm").val();
	var quota=$("#quotaForm").val();
	var cycle=$("#cycleForm").val();
	if(!$("form").form('validate')){
		return;
	}
	xyzAjax({
		url:"../UserTagWS/addUserTag.do",
		data:{
			nameCn:nameCn,
			quota:quota,
			cycle:cycle
		},
		success:function(data){
			if(data.status==1){
				top.$.messager.alert("提示","保存成功","info");
				$("#dialogFormDiv_addUserTag").dialog("destroy");
				$("#userTagManagerTable").datagrid("reload");
			}else{
				top.$.messager.alert("警告",data.msg,"warning");
			}
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

function moneyFlow(numberCode){
	xyzdialog({
		dialog : 'dialogFormDiv_moneyFlow',
		title : "交易流水",
		content : "<iframe id='dialogFormDiv_moneyFlowIframe' frameborder='0' name='"+numberCode+"'></iframe>",
	    buttons:[{
			text:'取消',
			handler:function(){
				$("#dialogFormDiv_moneyFlow").dialog("destroy");
			}
		}]
	});
	var tempWidth = $("#dialogFormDiv_moneyFlow").css("width");
	var tempHeight = $("#dialogFormDiv_moneyFlow").css("height");
	var tempWidth2 = parseInt(tempWidth.split("px")[0]);
	var tempHeight2 = parseInt(tempHeight.split("px")[0]);
	$("#dialogFormDiv_moneyFlowIframe").css("width",(tempWidth2-20)+"px");
	$("#dialogFormDiv_moneyFlowIframe").css("height",(tempHeight2-50)+"px");
	$("#dialogFormDiv_moneyFlowIframe").attr("src","../jsp_order/moneyFlowManager.html?numberCode="+numberCode);
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
