package xyz.svc.seller;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface SellerSvc {

	public Map<String, Object> loginOper(String username, String password);

}
