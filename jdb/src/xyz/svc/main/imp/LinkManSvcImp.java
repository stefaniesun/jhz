package xyz.svc.main.imp;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.dao.CommonDao;
import xyz.filter.MyRequestUtil;
import xyz.filter.ReturnUtil;
import xyz.model.main.Customer;
import xyz.model.main.LinkMan;
import xyz.model.member.XyzSessionLogin;
import xyz.model.security.LogOper;
import xyz.svc.main.LinkManSvc;
import xyz.util.EncryptionUtil;
import xyz.util.UUIDUtil;

@Service
public class LinkManSvcImp implements LinkManSvc {

	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> editLinkManInfo(String name1, String phone1, String type1, String name2, String phone2,
			String type2) {
		XyzSessionLogin xyzSessionLogin = MyRequestUtil.getXyzSessionLogin();
		
		if(xyzSessionLogin==null){
			return ReturnUtil.returnMap(0,"无有效登录信息");
		}
		String username=xyzSessionLogin.getUsername();
		String hql = "from Customer  where username = '"+username+"'";
		Customer customer = (Customer)commonDao.queryUniqueByHql(hql);
		
		if(customer==null){
			return ReturnUtil.returnMap(0,"用户不存在");
		}else{
			customer.setLinkmanName1(name1);
			customer.setLinkmanPhone1(phone1);
			customer.setLinkmanType1(type1);
			
			customer.setLinkmanName2(name2);
			customer.setLinkmanPhone2(phone2);
			customer.setLinkmanType2(type2);
			
			commonDao.save(customer);
		}
		
		return ReturnUtil.returnMap(1,null);
	}

	@Override
	public Map<String, Object> getLinkManInfo() {
		XyzSessionLogin xyzSessionLogin = MyRequestUtil.getXyzSessionLogin();
		if(xyzSessionLogin==null){
			return ReturnUtil.returnMap(0,"无有效登录信息");
		}
		String username=xyzSessionLogin.getUsername();
		
		Customer customer=(Customer) commonDao.getObjectByUniqueCode("Customer", "username", username);
		
		return ReturnUtil.returnMap(1,customer);
	}

}
