package xyz.ctrl.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.svc.main.SystemConfigSvc;

@Controller
@RequestMapping(value="/SystemConfigWS")
public class SystemConfigWS {

	@Autowired
	SystemConfigSvc systemConfigSvc;
	
	@RequestMapping(value="editSystemConfig")
	@ResponseBody
	public Map<String, Object> editSystemConfig(String key,String value){
		return systemConfigSvc.editSystemConfig(key,value);
	}
	

}
