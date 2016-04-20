package xyz.svc.main;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface BorrowOrderSvp {

	Map<String, Object> addBorrowOrder(String borrowModel, int cycle);

	Map<String, Object> queryBorrowOrderList(int offset, int pagesize);

	Map<String, Object> queryMoneyFlowList(String borrowOrder, int offset, int pagesize);

	Map<String, Object> chargeConfirmOper(String numberCode);

	Map<String, Object> loanConfirmOper(String numberCode);

	Map<String, Object> backConfirmOper(String numberCode);

	Map<String, Object> getDoingBorrowOrder();

	Map<String, Object> cancelBorrowOrderOper(String numberCode);

	Map<String, Object> checkBorrowOrderOper(String numberCode, int value,String remark);

}
