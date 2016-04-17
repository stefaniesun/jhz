package xyz.ctrl.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.svc.main.BorrowOrderSvp;


@Controller
@RequestMapping(value="BorrowOrderWS")
public class BorrowOrderWS {
	
	@Autowired
	BorrowOrderSvp borrowOrderSvp;

	@RequestMapping(value="addBorrowOrder")
	@ResponseBody
	public Map<String, Object> addBorrowOrder(String borrowModel,int cycle){
				return borrowOrderSvp.addBorrowOrder(borrowModel, cycle);
		}
	
	@RequestMapping(value="queryBorrowOrderList")
	@ResponseBody
	public Map<String, Object> queryBorrowOrderList(int page,
			int rows){
		int pagesize = rows;
		int offset = (page - 1) * pagesize;
		return borrowOrderSvp.queryUserTagList(offset, pagesize);
	}
	
	@RequestMapping(value="queryMoneyFlowList")
	@ResponseBody
	public Map<String, Object> queryMoneyFlowList(String borrowOrder,int page,
			int rows){
		int pagesize = rows;
		int offset = (page - 1) * pagesize;
		return borrowOrderSvp.queryMoneyFlowList(borrowOrder,offset, pagesize);
	}
	
	@RequestMapping(value="chargeConfirmOper")
	@ResponseBody
	public Map<String, Object> chargeConfirmOper(String numberCode){
		return borrowOrderSvp.chargeConfirmOper(numberCode);
	}
	
	@RequestMapping(value="loanConfirmOper")
	@ResponseBody
	public Map<String, Object> loanConfirmOper(String numberCode){
		return borrowOrderSvp.loanConfirmOper(numberCode);
	}
	
	
	@RequestMapping(value="backConfirmOper")
	@ResponseBody
	public Map<String, Object> backConfirmOper(String numberCode){
		return borrowOrderSvp.backConfirmOper(numberCode);
	}
	
	
}
