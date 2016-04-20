package xyz.svc.main.imp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.dao.CommonDao;
import xyz.filter.ReturnUtil;
import xyz.model.main.SystemConfig;
import xyz.svc.main.SystemConfigSvc;

@Service
public class SystemConfigSvcImp implements SystemConfigSvc {

	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> editSystemConfig(String key, String value) {
		
		SystemConfig config=(SystemConfig) commonDao.getObjectByUniqueCode("SystemConfig", "key", key);
		if(config==null){
			return ReturnUtil.returnMap(0, "参数不存在");
		}
		
		config.setValue(value);
		
		return ReturnUtil.returnMap(1,null);
	}

}
