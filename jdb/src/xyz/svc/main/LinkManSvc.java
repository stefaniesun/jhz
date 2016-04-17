package xyz.svc.main;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface LinkManSvc {

	Map<String, Object> editLinkManInfo(String name1, String phone1, String type1, String name2, String phone2,
			String type2);

	Map<String, Object> getLinkManInfo();

}
