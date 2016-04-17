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
import xyz.model.main.UserTag;
import xyz.svc.main.UserTagSvc;
import xyz.util.StringTool;
import xyz.util.UUIDUtil;
@Service
public class UserTagSvcImp implements UserTagSvc {
	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> queryUserTagList(int offset, int pagesize,
			String nameCn) {
		String hql=" from UserTag where 1=1 ";
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
		List<UserTag> userTagList=query.list();
		
		Map<String,Object> mapContent=new HashMap<String, Object>();
		mapContent.put("total", count);
		mapContent.put("rows",userTagList);
		return ReturnUtil.returnMap(1, mapContent);
	}


	@Override
	public Map<String, Object> deleteUserTag(String iidd) {
		if(iidd!=null&&!"".equals(iidd)){
			String sql = "delete from user_tag where iidd in ("+StringTool.StrToSqlString(iidd)+")";
			commonDao.getSqlQuery(sql).executeUpdate();
			return ReturnUtil.returnMap(1, null);
		}else{
			return ReturnUtil.returnMap(0, "请先选中需要删除的对象！");
		}
	}



	@Override
	public Map<String, Object> addUserTag(String nameCn, int quota, int cycle) {
		UserTag userTag=new UserTag();
		userTag.setNumberCode(UUIDUtil.getUUIDStringFor32());
		userTag.setNameCn(nameCn);
		userTag.setCycle(cycle);
		userTag.setQuota(quota);
		commonDao.save(userTag);
		return ReturnUtil.returnMap(1,null);
	}



	@Override
	public Map<String, Object> editUserTag(String numberCode, String nameCn, int quota, int cycle) {
		UserTag userTag=(UserTag) commonDao.getObjectByUniqueCode("UserTag", "numberCode", numberCode);
		userTag.setCycle(cycle);
		userTag.setNameCn(nameCn);
		userTag.setQuota(quota);
		commonDao.update(userTag);
		return ReturnUtil.returnMap(1,null);
	}

}
