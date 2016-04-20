package xyz.svc.main;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface SystemConfigSvc {

	Map<String, Object> editSystemConfig(String key, String value);

}
