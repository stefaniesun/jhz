﻿
package xyz.model.main;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="provider")
public class Provider {
	@Id
	@Column(name="iidd",unique=true,nullable=false)
	@GeneratedValue(generator = "paymentableGenerator")       
    @GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String iidd;//主键
	
	@Column(name="number_code",unique=true,nullable=false)
	private String numberCode;//编号
	
	@Column(name="name_cn")
	private String nameCn;//名称
	
	@Column(name="type")
	private String type;//类型 HO酒店\SC景点
	
	@Column(name="level")
	private String level;//级别
	
	@Column(name="price")
	private BigDecimal price;//当天参考价格
	
	@Column(name="level_system")
	private String levelSystem;//级别
	
	@Column(name="phone")
	private String phone;//电话
	
	@Column(name="qq")
	private String qq;//腾讯账号
	
	@Column(name="email")
	private String email;//邮箱
	
	@Column(name="linkman")
	private String linkman;//联系人
	
	
	@Column(name="address")
	private String address;//地址

	@Column(name="remark",length=5000)
	private String remark;
	
	@Column(name="image_url")
	private String imageUrl;
	
	@Column(name="online_flag")
	private int onlineFlag;
	
	public String getIidd() {
		return iidd;
	}

	public void setIidd(String iidd) {
		this.iidd = iidd;
	}

	public String getNumberCode() {
		return numberCode;
	}

	public void setNumberCode(String numberCode) {
		this.numberCode = numberCode;
	}

	public String getNameCn() {
		return nameCn;
	}

	public void setNameCn(String nameCn) {
		this.nameCn = nameCn;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getLevelSystem() {
		return levelSystem;
	}

	public void setLevelSystem(String levelSystem) {
		this.levelSystem = levelSystem;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLinkman() {
		return linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}


	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getOnlineFlag() {
		return onlineFlag;
	}

	public void setOnlineFlag(int onlineFlag) {
		this.onlineFlag = onlineFlag;
	}
	
}
