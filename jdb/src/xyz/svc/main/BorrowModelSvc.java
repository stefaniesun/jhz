package xyz.svc.main;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface BorrowModelSvc {

	Map<String, Object> addBorrowModel(String amount, String baseAmount,String overdueAmount);

	Map<String, Object> editBorrowModel(String numberCode, String amount, String baseAmount,String overdueAmount);

	Map<String, Object> deleteBorrowModel(String numberCode);

	Map<String, Object> queryBorrowModelList(int offset,
			int pagesize);

	Map<String, Object> getAllBorrowModel();

}
