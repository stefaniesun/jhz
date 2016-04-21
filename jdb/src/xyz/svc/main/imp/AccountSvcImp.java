package xyz.svc.main.imp;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.dao.CommonDao;
import xyz.filter.ReturnUtil;
import xyz.model.main.Account;
import xyz.model.main.UserTag;
import xyz.svc.main.AccountSvc;
import xyz.util.StringTool;
import xyz.util.StringUtil;

@Service
public class AccountSvcImp implements AccountSvc {

	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> queryAccountList(int offset, int pagesize,
			String nameCn) {
		String hql=" from Account where 1=1 ";
		if(nameCn!=null&&!"".equals(nameCn)){
			hql+=" and nameCn like '%"+nameCn+"%'";
		}
		
		String countHql = "select count(iidd) "+hql;
		Query countQuery = commonDao.getQuery(countHql);
		Number countTemp = (Number)countQuery.uniqueResult();
		int count = countTemp==null?0:countTemp.intValue();
		
		Query query = commonDao.getQuery(hql);
		query.setMaxResults(pagesize);
		query.setFirstResult(offset);
		@SuppressWarnings("unchecked")
		List<UserTag> accountList=query.list();
		
		Map<String,Object> mapContent=new HashMap<String, Object>();
		mapContent.put("total", count);
		mapContent.put("rows",accountList);
		return ReturnUtil.returnMap(1, mapContent);
	}

	@Override
	public Map<String, Object> addAccount(String account) {
		Account a=new Account();
		a.setNumberCode(StringUtil.get_numberCode("AC"));
		a.setAccount(account);
		a.setAddDate(new Date());
		commonDao.save(a);
		return ReturnUtil.returnMap(1,null);
	}

	@Override
	public Map<String, Object> editAccount(String numberCode, String account) {
		Account a=(Account) commonDao.getObjectByUniqueCode("Account", "numberCode", numberCode);
		a.setAccount(account);
		commonDao.update(a);
		return ReturnUtil.returnMap(1,null);
	}

	@Override
	public Map<String, Object> deleteAccount(String iidd) {
		if(iidd!=null&&!"".equals(iidd)){
			String sql = "delete from account where iidd in ("+StringTool.StrToSqlString(iidd)+")";
			commonDao.getSqlQuery(sql).executeUpdate();
			return ReturnUtil.returnMap(1, null);
		}else{
			return ReturnUtil.returnMap(0, "请先选中需要删除的对象！");
		}
	}

}
