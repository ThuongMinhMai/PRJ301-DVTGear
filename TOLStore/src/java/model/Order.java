/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.Date;
import java.util.List;

/**
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
    private int totalMoney;
    private List<OrderProduct> orderProducts;

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

    // Private constructor to prevent direct instantiation from outside the class.
    private Order() {
    }

    // Builder class for the Order class
    public static class Builder {

        private int id;
        private String customer;
        private Date date;
        private Status status;
        private String receiver;
        private String address;
        private String phone;
        private int totalMoney;
        private List<OrderProduct> orderProducts;

        public Builder() {
            // Set default values if necessary
            id = 0;
            status = Status.COMPLETE; // Set default status
        }

        // Setters for the fields that can be chained
        public Builder id(int id) {
            this.id = id;
            return this;
        }

        public Builder customer(String customer) {
            this.customer = customer;
            return this;
        }

        public Builder date(Date date) {
            this.date = date;
            return this;
        }

        public Builder status(Status status) {
            this.status = status;
            return this;
        }

        public Builder receiver(String receiver) {
            this.receiver = receiver;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder totalMoney(int totalMoney) {
            // Ensure that the totalMoney is non-negative
            if (totalMoney >= 0) {
                this.totalMoney = totalMoney;
            } else {
                throw new IllegalArgumentException("Total money cannot be negative.");
            }
            return this;
        }

        public Builder orderProducts(List<OrderProduct> orderProducts) {
            this.orderProducts = orderProducts;
            return this;
        }

        // Build method to create the Order instance
        public Order build() {
            Order order = new Order();
            order.id = this.id;
            order.customer = this.customer;
            order.date = this.date;
            order.status = this.status;
            order.receiver = this.receiver;
            order.address = this.address;
            order.phone = this.phone;
            order.totalMoney = this.totalMoney;
            order.orderProducts = this.orderProducts;
            return order;
        }
    }

    // Your Status enum code goes here...
    public enum Status {
        COMPLETE, PROCESSING, DELIVERING, CANCELLED;

        public String translate() {
            return translateStatus(this);
        }

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

        public boolean equalString(String str) {
            return this.equals(valueOf(str));
        }
    }

}
