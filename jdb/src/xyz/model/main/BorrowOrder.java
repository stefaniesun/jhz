package xyz.model.main;

import java.math.BigDecimal;
import java.security.KeyStore.PrivateKeyEntry;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="borrow_order")
public class BorrowOrder {
	
	public static int STATUS_LOAN=1;


	@Id
	@Column(name="iidd",unique=true,nullable=false)
	@GeneratedValue(generator = "paymentableGenerator")       
    @GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String iidd;//主键
	
	@Column(name="number_code",unique=true,nullable=false)
	private String numberCode;//编号
	
	@Column(name="customer")
	private String customer;
	
	@Column(name="borrow_amount")
	private BigDecimal borrowAmount;
	
	@Column(name="quota")
	private BigDecimal quota;
	
	@Column(name="charge")
	private BigDecimal charge;
	
	@Column(name="borrow_account")
	private String borrowAccount;
 	
	@Column(name="add_date")
	private Date addDate;
	
	@Column(name="nick_name")
	private String nickName;
	
	@Column(name="return_date")
	private Date returnDate;
	
	@Column(name="overdue")
	private int overdue;
	
	@Column(name="overdue_amount")
	private BigDecimal overdueAmount;
	
	@Column(name="cycle")
	private int cycle;
	
	@Column(name="status")
	private int status;
	
	@Column(name="return_flag")
	private int returnFlag;
	
	@Column(name="check_flag")
	private int checkFlag;
	
	@Column(name="cancel_flag")
	private int cancelFlag;

	
	@Column(name="check_remark")
	private String checkRemark;
	
	@Transient
	private String linkPhone;

	@Transient
	private String linkmanPhone1;
	
	@Transient
	private String linkmanPhone2;

	@Transient
	private int borrowCount;
	
	
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

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public BigDecimal getBorrowAmount() {
		return borrowAmount;
	}

	public void setBorrowAmount(BigDecimal borrowAmount) {
		this.borrowAmount = borrowAmount;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public int getCycle() {
		return cycle;
	}

	public void setCycle(int cycle) {
		this.cycle = cycle;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public BigDecimal getQuota() {
		return quota;
	}

	public void setQuota(BigDecimal quota) {
		this.quota = quota;
	}

	public BigDecimal getCharge() {
		return charge;
	}

	public void setCharge(BigDecimal charge) {
		this.charge = charge;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public int getReturnFlag() {
		return returnFlag;
	}

	public void setReturnFlag(int returnFlag) {
		this.returnFlag = returnFlag;
	}

	public String getLinkPhone() {
		return linkPhone;
	}

	public String getCheckRemark() {
		return checkRemark;
	}

	public void setCheckRemark(String checkRemark) {
		this.checkRemark = checkRemark;
	}

	public int getCheckFlag() {
		return checkFlag;
	}

	public void setCheckFlag(int checkFlag) {
		this.checkFlag = checkFlag;
	}

	public void setLinkPhone(String linkPhone) {
		this.linkPhone = linkPhone;
	}

	public String getLinkmanPhone1() {
		return linkmanPhone1;
	}

	public void setLinkmanPhone1(String linkmanPhone1) {
		this.linkmanPhone1 = linkmanPhone1;
	}

	public String getLinkmanPhone2() {
		return linkmanPhone2;
	}

	public void setLinkmanPhone2(String linkmanPhone2) {
		this.linkmanPhone2 = linkmanPhone2;
	}

	public int getBorrowCount() {
		return borrowCount;
	}

	public void setBorrowCount(int borrowCount) {
		this.borrowCount = borrowCount;
	}

	public int getCancelFlag() {
		return cancelFlag;
	}

	public void setCancelFlag(int cancelFlag) {
		this.cancelFlag = cancelFlag;
	}

	public int getOverdue() {
		return overdue;
	}

	public void setOverdue(int overdue) {
		this.overdue = overdue;
	}

	public BigDecimal getOverdueAmount() {
		return overdueAmount;
	}

	public void setOverdueAmount(BigDecimal overdueAmount) {
		this.overdueAmount = overdueAmount;
	}

	public String getBorrowAccount() {
		return borrowAccount;
	}

	public void setBorrowAccount(String borrowAccount) {
		this.borrowAccount = borrowAccount;
	}



	

	
}
