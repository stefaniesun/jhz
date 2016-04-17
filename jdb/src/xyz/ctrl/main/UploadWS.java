package xyz.ctrl.main;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import Decoder.BASE64Decoder;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import xyz.filter.ReturnUtil;
import xyz.filter.RmiUtil;
import xyz.svc.main.CustomerSvc;
import xyz.util.StringUtil;
import xyz.util.UUIDUtil;

@Controller
@RequestMapping(value="/UploadWS")
public class UploadWS {

	@Autowired
	private CustomerSvc customerSvc;
	
	/*@RequestMapping(value="uploadImage")
	  public Map<String, Object> upload(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request,HttpServletResponse response) {  

        String path = request.getSession().getServletContext().getRealPath("upload/image");  
        
        System.out.println("path=="+path);
        String photoType=request.getParameter("type");
        System.out.println("photoType=="+photoType);
        String fileName = file.getOriginalFilename();  

        String type=fileName.substring(fileName.indexOf("."));
        SimpleDateFormat format=new SimpleDateFormat("yyyyMMddHHmm"); 
        fileName=format.format(new Date())+StringUtil.getRandomStr(4)+type;

        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
        //保存  
        try {  
            file.transferTo(targetFile);
          
            System.out.println("target==="+targetFile.getName());
          //  customerSvc.setImage(targetFile.getName());

            response.setContentType("text/html;charset=utf-8");  
            response.setStatus(200);
		    PrintWriter out = null;
			try {
				out = response.getWriter();
				out.print(targetFile.getName());  
				out.flush();  
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
			    out.close();
			}  
            return ReturnUtil.returnMap(1,null);
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
  
    	return ReturnUtil.returnMap(0,null);
    }  */
	
	
	@RequestMapping(value="uploadImageOper")
	  public Map<String, Object> upload(HttpServletRequest request,HttpServletResponse response,String str,String imageType) {  


				int index=str.indexOf(",");
				str=str.substring(index+1,str.length());

				String path = request.getSession().getServletContext().getRealPath("upload");  

	            response.setContentType("text/html;charset=utf-8");  
	            response.setStatus(200);
			    PrintWriter out = null;
			    File targetFile = null;
				try {
					 if (str == null){
							return ReturnUtil.returnMap(0,"图片上传错误");
					 }
					BASE64Decoder decoder = new BASE64Decoder(); 
					 byte[] b = decoder.decodeBuffer(str); 
					  for(int i=0;i<b.length;++i) 
					  { 
						  if(b[i]<0) {//调整异常数据 
							  b[i]+=256; 
						  } 
					  }	 
					  //生成jpeg图片 
					  SimpleDateFormat format=new SimpleDateFormat("yyyyMMddHHmm"); 
					  targetFile = new File(path, "image");  
				        if(!targetFile.exists()){  
				            targetFile.mkdirs();  
				        }
				        
				       String imageName= format.format(new Date())+StringUtil.getRandomStr(4)+".png";
				       String fileName = targetFile.getAbsolutePath()+"/"+imageName;//新生成的图片 
					  
				       System.out.println("----"+targetFile.getAbsolutePath());
				       System.out.println("----"+targetFile.getName());
				       OutputStream outputStream = new FileOutputStream(fileName); 
					  outputStream.write(b); 
					  outputStream.flush(); 
					  outputStream.close(); 
					  
					customerSvc.editCardImage(imageName,imageType);
					
					out = response.getWriter();
					
					out.print(JSONArray.fromObject(ReturnUtil.returnMap(1,imageName)));  
					//out.print(targetFile.getName());  
					out.flush();  
					
					return ReturnUtil.returnMap(1,null);
				} catch (IOException e) {
					e.printStackTrace();
				}finally{
				    out.close();
				}  

		
			return ReturnUtil.returnMap(1,targetFile.getName());
  }  
	
	
	
}
