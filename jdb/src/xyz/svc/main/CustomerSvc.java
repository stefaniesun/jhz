package xyz.svc.main;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public interface CustomerSvc {

	public Map<String, Object> getRandCodeOper(String phone);

	public Map<String, Object> registerOper(String phone,String nickName,String password);

	public Map<String, Object> loginOper(HttpServletRequest request,String username, String password);
	/**
	 * 微信平台快速登录，只需要用户名即可登录
	 * @param username
	 * @return
	 */
	public Map<String, Object> wxLoginOper(String username);

	public Map<String, Object> alterPasswordOper(String oldPassword,String newPassword);

	public Map<String, Object> customerExit();

	public Map<String, Object> recoverPasswordOper(String username,String newPassword);

	public Map<String, Object> verifyRandCodeOper(String phone, String randCode);

	public Map<String,Object> queryCustomerList(String username,
			int offset,
			int pagesize);
	
	
	
	
	public Map<String,Object> editCustomerEnabled(String iidd,int enabled);

	public Map<String, Object> editCustomerLinkInfo(String linkman, String linkPhone);

	public Map<String, Object> editCustomerPassword(String username,
			String password);

	public Map<String, Object> getCustomer(String username);
	
	public Map<String, Object> queryCustomerUserTagList(
			boolean isContain,
			int offset,
			int pagesize,
			String customer,
			String userTag,
			String nameCn);
	
	public Map<String,Object> deleteCustomerUserTag(String customer,String userTags);
	
	public Map<String,Object> addCustomerUserTag(String customer,String userTags);

	public Map<String, Object> editUserTag(String username, String userTag);

	public Map<String, Object> editCardImage(String name, String type);

	public Map<String, Object> editCustomer(String numberCode, String nickName, String address, String linkmanName1,
			String linkmanName2, String linkmanPhone1, String linkmanPhone2, String linkmanType1, String linkmanType2);

	public Map<String, Object> editAccount(String account);
}
