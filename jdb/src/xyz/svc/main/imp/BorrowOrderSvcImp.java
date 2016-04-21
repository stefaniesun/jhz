package xyz.svc.main.imp;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.annotations.Where;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import freemarker.ext.util.ModelFactory;
import xyz.dao.CommonDao;
import xyz.filter.MyRequestUtil;
import xyz.filter.ReturnUtil;
import xyz.model.main.BorrowModel;
import xyz.model.main.BorrowOrder;
import xyz.model.main.Customer;
import xyz.model.main.MoneyFlow;
import xyz.model.member.XyzSessionLogin;
import xyz.svc.main.BorrowOrderSvp;
import xyz.util.StringTool;
import xyz.util.StringUtil;
import xyz.util.UUIDUtil;

@Service
public class BorrowOrderSvcImp implements BorrowOrderSvp {

	@Autowired
	CommonDao commonDao;
	
	@Override
	public Map<String, Object> addBorrowOrder(String borrowModel, int cycle) {
		
		XyzSessionLogin xyzSessionLogin = MyRequestUtil.getXyzSessionLogin();
		if(xyzSessionLogin==null){
			return ReturnUtil.returnMap(0,"无有效登录信息");
		}
		Customer customer = (Customer)commonDao.getObjectByUniqueCode("Customer", "username", xyzSessionLogin.getUsername());
		
		BorrowModel model=(BorrowModel) commonDao.getObjectByUniqueCode("BorrowModel", "numberCode", borrowModel);
		
		if(customer==null){
			return ReturnUtil.returnMap(0,"用户不存在");
		}else{
				Calendar calendar=Calendar.getInstance();   
			   calendar.setTime(new Date()); 
			   calendar.add(Calendar.DAY_OF_MONTH, cycle==1?8:15);
				BorrowOrder borrowOrder=new BorrowOrder();
				borrowOrder.setNumberCode(StringUtil.get_numberCode("BO"));
				borrowOrder.setAddDate(new Date());
				borrowOrder.setCycle(cycle);
				borrowOrder.setNickName(customer.getNickName());
				borrowOrder.setCharge(model.getBaseAmount().multiply(new BigDecimal(cycle)));
				borrowOrder.setBorrowAmount(model.getAmount());
				borrowOrder.setQuota(model.getBaseAmount());
				borrowOrder.setReturnDate(calendar.getTime());
				borrowOrder.setCustomer(customer.getNumberCode());
				commonDao.save(borrowOrder);
				
				
				/*MoneyFlow moneyFlow=new MoneyFlow();
				moneyFlow.setNumberCode(UUIDUtil.getUUIDStringFor32());
				moneyFlow.setAddDate(new Date());
				moneyFlow.setCycle(cycle);
				moneyFlow.setBorrowOrder(borrowOrder.getNumberCode());
				moneyFlow.setType(MoneyFlow.FLOW_STATUS_CHARGE);
				moneyFlow.setReturnDate(calendar.getTime());
				moneyFlow.setCustomer(customer.getNumberCode());
				moneyFlow.setAmount(model.getBaseAmount().multiply(new BigDecimal(cycle)));
				commonDao.save(moneyFlow);*/
		}	
		return ReturnUtil.returnMap(1,null);
	}

	@Override
	public Map<String, Object> queryBorrowOrderList(int offset, int pagesize) {
		String hql="from BorrowOrder where 1=1  order by addDate desc";

		String countHql = "select count(iidd) "+hql;
		Query countQuery = commonDao.getQuery(countHql);
		Number countTemp = (Number)countQuery.uniqueResult();
		int count = countTemp==null?0:countTemp.intValue();
		
		Query query = commonDao.getQuery(hql);
		query.setMaxResults(pagesize);
		query.setFirstResult(offset);
		@SuppressWarnings("unchecked")
		List<BorrowOrder> list=query.list();
		
		
		List<String> userList=new ArrayList<String>();
		for(BorrowOrder order:list){
			userList.add(order.getCustomer());
		}
		
		hql="from Customer where numberCode in("+StringTool.listToSqlString(userList)+")";
		@SuppressWarnings("unchecked")
		List<Customer> customers=commonDao.queryByHql(hql);
		hql="select customer,count(iidd) from BorrowOrder where customer in("+StringTool.listToSqlString(userList)+") group by customer";
		@SuppressWarnings("unchecked")
		List<Object> datas=commonDao.queryByHql(hql);
		
		for(BorrowOrder order:list){
			for(Customer customer:customers){
				if(order.getCustomer().equals(customer.getNumberCode())){
					order.setLinkPhone(customer.getUsername());
					order.setLinkmanPhone1(customer.getLinkmanPhone1());
					order.setLinkmanPhone2(customer.getLinkmanPhone2());
				}	
			}
			for(Object obj:datas){
				Object[] arr=(Object[]) obj;
				if(order.getCustomer().equals(arr[0].toString())){
					order.setBorrowCount(new BigDecimal(arr[1].toString()).intValue());
				}	
			}
		}
		
		
		Map<String,Object> mapContent=new HashMap<String, Object>();
		mapContent.put("total", count);
		mapContent.put("rows",list);
		return ReturnUtil.returnMap(1, mapContent);
	}

	@Override
	public Map<String, Object> queryMoneyFlowList(String borrowOrder, int offset, int pagesize) {
		
		
		String hql="from MoneyFlow where borrowOrder='"+borrowOrder+"' order by addDate asc";
		

		String countHql = "select count(iidd) "+hql;
		Query countQuery = commonDao.getQuery(countHql);
		Number countTemp = (Number)countQuery.uniqueResult();
		int count = countTemp==null?0:countTemp.intValue();
		
		Query query = commonDao.getQuery(hql);
		query.setMaxResults(pagesize);
		query.setFirstResult(offset);
		@SuppressWarnings("unchecked")
		List<MoneyFlow> list=query.list();
		
		
		Map<String,Object> mapContent=new HashMap<String, Object>();
		mapContent.put("total", count);
		mapContent.put("rows",list);
		return ReturnUtil.returnMap(1, mapContent);
	}

	@Override
	public Map<String, Object> chargeConfirmOper(String numberCode) {
		
		MoneyFlow moneyFlow=(MoneyFlow) commonDao.getObjectByUniqueCode("MoneyFlow", "numberCode", numberCode);
		
		moneyFlow.setConfirmDate(new Date());
		moneyFlow.setConfirmFlag(1);
		commonDao.update(moneyFlow);
		
		
		BorrowOrder borrowOrder=(BorrowOrder) commonDao.getObjectByUniqueCode("BorrowOrder", "numberCode", moneyFlow.getBorrowOrder());
		
		MoneyFlow newMoneyFlow=new MoneyFlow();
		newMoneyFlow.setAddDate(new Date());
		newMoneyFlow.setAmount(borrowOrder.getBorrowAmount());
		newMoneyFlow.setBorrowOrder(borrowOrder.getNumberCode());
		newMoneyFlow.setNumberCode(UUIDUtil.getUUIDStringFor32());
		newMoneyFlow.setType(MoneyFlow.FLOW_STATUS_LOAN);
		commonDao.save(newMoneyFlow);
		
		return ReturnUtil.returnMap(1, null);
	}

	@Override
	public Map<String, Object> loanConfirmOper(String numberCode) {
		
		MoneyFlow moneyFlow=(MoneyFlow) commonDao.getObjectByUniqueCode("MoneyFlow", "numberCode", numberCode);
		
		moneyFlow.setConfirmDate(new Date());
		moneyFlow.setConfirmFlag(1);
		commonDao.update(moneyFlow);
		
		BorrowOrder borrowOrder=(BorrowOrder) commonDao.getObjectByUniqueCode("BorrowOrder", "numberCode", moneyFlow.getBorrowOrder());
		borrowOrder.setStatus(BorrowOrder.STATUS_LOAN);
		commonDao.update(borrowOrder);
		
		MoneyFlow newMoneyFlow=new MoneyFlow();
		newMoneyFlow.setAddDate(new Date());
		newMoneyFlow.setAmount(borrowOrder.getBorrowAmount());
		newMoneyFlow.setBorrowOrder(borrowOrder.getNumberCode());
		newMoneyFlow.setNumberCode(UUIDUtil.getUUIDStringFor32());
		newMoneyFlow.setType(MoneyFlow.FLOW_STATUS_BACK);
		commonDao.save(newMoneyFlow);
		
		return ReturnUtil.returnMap(1, null);
	}

	@Override
	public Map<String, Object> backConfirmOper(String numberCode) {
		
		MoneyFlow moneyFlow=(MoneyFlow) commonDao.getObjectByUniqueCode("MoneyFlow", "numberCode", numberCode);
		
		moneyFlow.setConfirmDate(new Date());
		moneyFlow.setConfirmFlag(1);
		commonDao.update(moneyFlow);
		
		BorrowOrder borrowOrder=(BorrowOrder) commonDao.getObjectByUniqueCode("BorrowOrder", "numberCode", moneyFlow.getBorrowOrder());
		borrowOrder.setReturnFlag(1);
		commonDao.update(borrowOrder);

		return ReturnUtil.returnMap(1, null);
	}

	@Override
	public Map<String, Object> getDoingBorrowOrder() {
	
		XyzSessionLogin xyzSessionLogin = MyRequestUtil.getXyzSessionLogin();
		
		if(xyzSessionLogin==null){
			return ReturnUtil.returnMap(0,"无有效登录信息");
		}
		
		Customer customer=(Customer) commonDao.getObjectByUniqueCode("Customer", "username", xyzSessionLogin.getUsername());
		
		String hql="from BorrowOrder where customer='"+customer.getNumberCode()+"' and returnFlag=0 order by addDate desc";
		@SuppressWarnings("unchecked")
		List<BorrowOrder> list=commonDao.queryByHql(hql);
		
		if(list.size()>0){
			return ReturnUtil.returnMap(1, list.get(0));
		}
		return ReturnUtil.returnMap(0, null);
	}

	@Override
	public Map<String, Object> cancelBorrowOrderOper(String numberCode) {
		 BorrowOrder borrowOrder=(BorrowOrder) commonDao.getObjectByUniqueCode("BorrowOrder", "numberCode", numberCode);
		 borrowOrder.setCancelFlag(1);
		 commonDao.update(borrowOrder);
		 return ReturnUtil.returnMap(1, null);
	}

	@Override
	public Map<String, Object> checkBorrowOrderOper(String numberCode, int value,String remark) {
		BorrowOrder borrowOrder=(BorrowOrder) commonDao.getObjectByUniqueCode("BorrowOrder", "numberCode", numberCode);
		 borrowOrder.setCheckFlag(value);
		 borrowOrder.setCheckRemark(remark);
		 commonDao.update(borrowOrder);
		 
		 if(value==1){
		 	MoneyFlow moneyFlow=new MoneyFlow();
			moneyFlow.setNumberCode(UUIDUtil.getUUIDStringFor32());
			moneyFlow.setAddDate(new Date());
			moneyFlow.setCycle(borrowOrder.getCycle());
			moneyFlow.setBorrowOrder(borrowOrder.getNumberCode());
			moneyFlow.setType(MoneyFlow.FLOW_STATUS_CHARGE);
			moneyFlow.setReturnDate(borrowOrder.getReturnDate());
			moneyFlow.setCustomer(borrowOrder.getCustomer());
			moneyFlow.setAmount(borrowOrder.getCharge());
			commonDao.save(moneyFlow);
		 }
		 
		 return ReturnUtil.returnMap(1, null);
	}

}
