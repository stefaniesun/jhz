package xyz.ctrl.main;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import xyz.svc.main.BorrowModelSvc;
import xyz.svc.main.BorrowOrderSvp;

@Controller
@RequestMapping(value="BorrowModelWS")
public class BorrowModelWS {

	
	@Autowired
	BorrowModelSvc borrowModelSvc;

	@RequestMapping(value="addBorrowModel")
	@ResponseBody
	public Map<String, Object> addBorrowModel(String amount,String baseAmount){
			return borrowModelSvc.addBorrowModel(amount, baseAmount);
		}
	
	
	@RequestMapping(value="editBorrowModel")
	@ResponseBody
	public Map<String, Object> editBorrowModel(String numberCode,String amount,String baseAmount){
			return borrowModelSvc.editBorrowModel(numberCode,amount, baseAmount);
		}
	
	@RequestMapping(value="deleteBorrowModel")
	@ResponseBody
	public Map<String, Object> deleteBorrowModel(String numberCode){
			return borrowModelSvc.deleteBorrowModel(numberCode);
		}
	
	@RequestMapping(value="queryBorrowModelList")
	@ResponseBody
	public Map<String, Object> queryBorrowModelList(int page,
			int rows){
			int pagesize = rows;
			int offset = (page-1)*pagesize;
			return borrowModelSvc.queryBorrowModelList(offset,pagesize);
	}
	
	@RequestMapping(value="getAllBorrowModel")
	@ResponseBody
	public Map<String, Object> getAllBorrowModel(){
			return borrowModelSvc.getAllBorrowModel();
	}
	
	
}
