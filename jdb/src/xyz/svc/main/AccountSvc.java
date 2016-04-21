package xyz.svc.main;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface AccountSvc {

	Map<String, Object> queryAccountList(int offset, int pagesize, String nameCn);

	Map<String, Object> addAccount(String account);

	Map<String, Object> editAccount(String numberCode, String account);

	Map<String, Object> deleteAccount(String iidd);

}
