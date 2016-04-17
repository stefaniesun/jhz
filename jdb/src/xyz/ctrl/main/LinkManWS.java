package xyz.ctrl.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.svc.main.LinkManSvc;




@Controller
@RequestMapping(value="/LinkManWS")
public class LinkManWS {

	@Autowired
	LinkManSvc linkManSvc;
	
	/**
	 * 用户修改紧急联系人信息
	 */
	@RequestMapping(value="editLinkManInfo")
	@ResponseBody
	public Map<String, Object> editLinkManInfo(String name1,String phone1,String type1,String name2,String phone2,String type2){
		return linkManSvc.editLinkManInfo(name1,phone1,type1,name2,phone2,type2);
	}
	
	
	@RequestMapping(value="getLinkManInfo")
	@ResponseBody
	public Map<String, Object> getLinkManInfo(){
		return linkManSvc.getLinkManInfo();
	}
}
