package xyz.model.main;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="customer")
public class Customer {
	@Id
	@Column(name="iidd",unique=true,nullable=false)
	@GeneratedValue(generator = "paymentableGenerator")       
    @GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	public String iidd;

	@Column(name="number_code",unique=true,nullable=false)
	private String numberCode;//主键
	
	@Column(name="username",unique=true,nullable=false)
	private String username;
	
	@Column(name="nick_name")
	private String nickName;
	
	@Column(name="password")
	private String password;
	
	@Column(name="address")
	private String address;
	
	@Column(name="account")
	private String account;
	
	@Column(name="email")
	private String email;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="check_flag")
	private int checkFlag;
	
	@Column(name="card1_image")
	private String card1Image;
	
	@Column(name="card2_image")
	private String card2Image;
	
	@Column(name="card3_image")
	private String card3Image;
	
	@Column(name="enabled")
	private int enabled;//1：激活  0：锁死
	
	@Column(name="add_date")
	private Date addDate;
	
	@Column(name="alter_date")
	private Date alterDate;
	
	@Column(name="linkman_name1")
	private String linkmanName1;
	
	@Column(name="linkman_phone1")
	private String linkmanPhone1;
	
	@Column(name="linkman_type1")
	private String linkmanType1;
	
	@Column(name="linkman_name2")
	private String linkmanName2;
	
	@Column(name="linkman_phone2")
	private String linkmanPhone2;
	
	@Column(name="linkman_type2")
	private String linkmanType2;
	
	@Column(name="user_tag")
	private String userTag;
	
	@Column(name="user_tag_name")
	private String userTagName;
	
	@Transient
	private int borrowCount;
	
	public String getIidd() {
		return iidd;
	}

	public void setIidd(String iidd) {
		this.iidd = iidd;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getEnabled() {
		return enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public Date getAlterDate() {
		return alterDate;
	}

	public void setAlterDate(Date alterDate) {
		this.alterDate = alterDate;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public String getCard1Image() {
		return card1Image;
	}

	public void setCard1Image(String card1Image) {
		this.card1Image = card1Image;
	}

	public String getCard2Image() {
		return card2Image;
	}

	public void setCard2Image(String card2Image) {
		this.card2Image = card2Image;
	}

	public String getCard3Image() {
		return card3Image;
	}

	public void setCard3Image(String card3Image) {
		this.card3Image = card3Image;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}



	public String getNumberCode() {
		return numberCode;
	}

	public void setNumberCode(String numberCode) {
		this.numberCode = numberCode;
	}


	public String getUserTag() {
		return userTag;
	}

	public int getBorrowCount() {
		return borrowCount;
	}

	public void setBorrowCount(int borrowCount) {
		this.borrowCount = borrowCount;
	}

	public void setUserTag(String userTag) {
		this.userTag = userTag;
	}

	public String getLinkmanName1() {
		return linkmanName1;
	}

	public void setLinkmanName1(String linkmanName1) {
		this.linkmanName1 = linkmanName1;
	}

	public String getLinkmanPhone1() {
		return linkmanPhone1;
	}

	public void setLinkmanPhone1(String linkmanPhone1) {
		this.linkmanPhone1 = linkmanPhone1;
	}

	public String getLinkmanType1() {
		return linkmanType1;
	}

	public void setLinkmanType1(String linkmanType1) {
		this.linkmanType1 = linkmanType1;
	}

	public String getLinkmanName2() {
		return linkmanName2;
	}

	public void setLinkmanName2(String linkmanName2) {
		this.linkmanName2 = linkmanName2;
	}

	public String getLinkmanPhone2() {
		return linkmanPhone2;
	}

	public void setLinkmanPhone2(String linkmanPhone2) {
		this.linkmanPhone2 = linkmanPhone2;
	}

	public String getLinkmanType2() {
		return linkmanType2;
	}

	public void setLinkmanType2(String linkmanType2) {
		this.linkmanType2 = linkmanType2;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public int getCheckFlag() {
		return checkFlag;
	}

	public void setCheckFlag(int checkFlag) {
		this.checkFlag = checkFlag;
	}

	public String getUserTagName() {
		return userTagName;
	}

	public void setUserTagName(String userTagName) {
		this.userTagName = userTagName;
	}

}
