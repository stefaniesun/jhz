package xyz.model.member;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import xyz.dao.CommonDao;

@Component
public class XyzSessionUtil {
	
	@Resource
	CommonDao commonDao;
	
	public static Map<String,XyzSessionLogin> logins = new HashMap<String,XyzSessionLogin>();
	
	
	public  XyzSessionLogin getXyzSessionLogin(String apikey) {
		return (XyzSessionLogin) commonDao.getObjectByUniqueCode("XyzSessionLogin", "apikey", apikey);
	}
}
