package xyz.model.main;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.type.PrimitiveByteArrayBlobType;

@Entity
@Table(name="money_flow")
public class MoneyFlow {

	public static int FLOW_STATUS_CHARGE=0;
	public static int FLOW_STATUS_LOAN=1;
	public static int FLOW_STATUS_BACK=2;
	
	@Id
	@Column(name="iidd",unique=true,nullable=false)
	@GeneratedValue(generator = "paymentableGenerator")       
    @GenericGenerator(name = "paymentableGenerator", strategy = "uuid")
	private String iidd;//主键
	
	@Column(name="number_code",unique=true,nullable=false)
	private String numberCode;//编号
	
	@Column(name="customer")
	private String customer;
	
	@Column(name="borrowOrder")
	private String borrowOrder;
	
	@Column(name="type")
	private int type;
	
	@Column(name="cycle")
	private int cycle;
	
	@Column(name="confirm_flag")
	private int confirmFlag;
	
	@Column(name="return_date")
	private Date returnDate;
	
	@Column(name="amount")
	private BigDecimal amount;
	
	@Column(name="add_date")
	private Date addDate;
	
	@Column(name="confirm_date")
	private Date confirmDate;

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

	public String getBorrowOrder() {
		return borrowOrder;
	}

	public void setBorrowOrder(String borrowOrder) {
		this.borrowOrder = borrowOrder;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	public Date getConfirmDate() {
		return confirmDate;
	}

	public void setConfirmDate(Date confirmDate) {
		this.confirmDate = confirmDate;
	}

	public int getCycle() {
		return cycle;
	}

	public void setCycle(int cycle) {
		this.cycle = cycle;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
	}

	public int getConfirmFlag() {
		return confirmFlag;
	}

	public void setConfirmFlag(int confirmFlag) {
		this.confirmFlag = confirmFlag;
	}
	
}
