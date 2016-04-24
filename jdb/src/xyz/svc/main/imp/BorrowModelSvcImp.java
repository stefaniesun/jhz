package xyz.svc.main.imp;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import xyz.dao.CommonDao;
import xyz.filter.ReturnUtil;
import xyz.model.main.BorrowModel;
import xyz.model.main.Customer;
import xyz.svc.main.BorrowModelSvc;
import xyz.util.StringUtil;

@Service
public class BorrowModelSvcImp implements BorrowModelSvc {

	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> addBorrowModel(String amount, String baseAmount,String overdueAmount) {
		BorrowModel borrowModel=new BorrowModel();
		borrowModel.setNumberCode(StringUtil.get_numberCode("BM"));
		borrowModel.setAmount(new BigDecimal(amount));
		borrowModel.setBaseAmount(new BigDecimal(baseAmount));
		borrowModel.setOverdueAmount(new BigDecimal(overdueAmount));
		commonDao.save(borrowModel);
		return ReturnUtil.returnMap(1,null);
	}



	@Override
	public Map<String, Object> deleteBorrowModel(String numberCode) {
		BorrowModel borrowModel=(BorrowModel) commonDao.getObjectByUniqueCode("BorrowModel", "numberCode", numberCode);
		commonDao.delete(borrowModel);
		return ReturnUtil.returnMap(1,null);
	}

	@Override
	public Map<String, Object> queryBorrowModelList(int offset,
			int pagesize) {

		String hql="from BorrowModel where 1=1 ";

		String countHql = "select count(iidd) "+hql;
		Query countQuery = commonDao.getQuery(countHql);
		Number countTemp = (Number)countQuery.uniqueResult();
		int count = countTemp==null?0:countTemp.intValue();
		
		Query query = commonDao.getQuery(hql);
		query.setMaxResults(pagesize);
		query.setFirstResult(offset);
		@SuppressWarnings("unchecked")
		List<Customer> customerList=query.list();
		Map<String,Object> mapContent=new HashMap<String, Object>();
		mapContent.put("total", count);
		mapContent.put("rows",customerList);
		return ReturnUtil.returnMap(1, mapContent);
	
	}

	@Override
	public Map<String, Object> getAllBorrowModel() {
		String hql="from BorrowModel";
		@SuppressWarnings("unchecked")
		List<BorrowModel> models=commonDao.queryByHql(hql);
		return ReturnUtil.returnMap(1, models);
	}

	@Override
	public Map<String, Object> editBorrowModel(String numberCode, String amount, String baseAmount,
			String overdueAmount) {
		BorrowModel borrowModel=(BorrowModel) commonDao.getObjectByUniqueCode("BorrowModel", "numberCode", numberCode);
		borrowModel.setAmount(new BigDecimal(amount));
		borrowModel.setBaseAmount(new BigDecimal(baseAmount));
		borrowModel.setOverdueAmount(new BigDecimal(overdueAmount));
		commonDao.update(borrowModel);
		return ReturnUtil.returnMap(1,null);
	}

}
