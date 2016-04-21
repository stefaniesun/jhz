package xyz.ctrl.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.svc.main.AccountSvc;

@Controller
@RequestMapping(value="AccountWS")
public class AccountWS {

	@Autowired
	AccountSvc AccountSvc;
	
	@RequestMapping(value="queryAccountList")
	@ResponseBody
	public Map<String, Object> queryAccountList(int page,
			int rows,
			String nameCn){
		int pagesize = rows;
		int offset = (page - 1) * pagesize;
		return AccountSvc.queryAccountList(offset, pagesize, nameCn);
	}
	
	@RequestMapping(value="addAccount")
	@ResponseBody
	public Map<String, Object> addAccount(String account){
				return AccountSvc.addAccount(account);
			}
			
	@RequestMapping(value="editAccount")
	@ResponseBody
	public Map<String, Object> editAccount(String numberCode,
			String account){
				return AccountSvc.editAccount(numberCode, account);
			}
			
	@RequestMapping(value="deleteAccount")
	@ResponseBody
	public Map<String, Object> deleteAccount(String iidd){
		return AccountSvc.deleteAccount(iidd);
	}
	
}
