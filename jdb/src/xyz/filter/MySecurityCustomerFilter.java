package xyz.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import xyz.exception.MyExceptionForRole;
import xyz.model.member.XyzSessionLogin;

@Component
public class MySecurityCustomerFilter implements Filter{
	
	private static String[] customerUrls = new String[]{
		"/BuyerOrderWS/createOrder.cus",
		"/BorrowModelWS/getAllBorrowModel.cus",
		"/BorrowOrderWS/addBorrowOrder.cus",
		"/LinkManWS/editLinkManInfo.cus",
		"/LinkManWS/getLinkManInfo.cus",
		"/UploadWS/uploadImageOper.cus",
		"/CustomerWS/getCustomer.cus"
		
	};
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		;
	}

	@Override
	public void doFilter(
			ServletRequest request1, 
			ServletResponse response1,
			FilterChain chain) 
					throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)request1;
		XyzSessionLogin xyzSessionLogin = (XyzSessionLogin)request.getAttribute("xyzSessionLogin");
		String servletPath = request.getServletPath();
	
		boolean flag = false;
		if(xyzSessionLogin!=null){
			for(String url : customerUrls){
				if(servletPath.equals(url)){
					flag = true;
				}
			}
		}
		if(flag){
			chain.doFilter(request1, response1);
		}else{
			throw new MyExceptionForRole("您无权访问！");
		}
	}
	
	@Override
	public void destroy() {
		;
	}
}
