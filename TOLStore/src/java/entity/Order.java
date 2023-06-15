/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.Date;
import java.util.List;

/**
 *
 * @author Kingc
 */
public class Order {

    private int id;
    private String customer;
    private Date date;
    private Status status;
    private String receiver;
    private String address;
    private String phone;

    //expand atribute
    private int totalMoney;
    private List<OrderProduct> orderProducts;

    public Order(int id, String customer, Date date, Status status, String receiver, String address, String phone) {
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.status = status;
        this.receiver = receiver;
        this.address = address;
        this.phone = phone;
    }

    public enum Status {
        COMPLETE,
        PROCESSING,
        DELIVERING,
        CANCELLED;

        public static String translateStatus(Status status) {
            switch (status) {
                case COMPLETE:
                    return "Hoàn Thành";
                case PROCESSING:
                    return "Đang Chờ Xử Lý";
                case DELIVERING:
                    return "Đang Giao Hàng";
                case CANCELLED:
                    return "Đã Hủy";
                default:
                    return "";
            }
        }

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(int totalMoney) {
        this.totalMoney = totalMoney;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

}
