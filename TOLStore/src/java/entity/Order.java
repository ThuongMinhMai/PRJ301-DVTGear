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
    private Customer customer;
    private Date date;
    private Status status;
    private List<OrderProduct> orderProducts;

    public enum Status {
        COMPLETE,
        PROCESSING,
        DELIVERING,
        CANCELLED,
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
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

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProduct(List<OrderProduct> orderProduct) {
        this.orderProducts = orderProduct;
    }

    public Order(int id, Customer customerId, Date date, Status status, List<OrderProduct> orderProduct) {
        this.id = id;
        this.customer = customerId;
        this.date = date;
        this.status = status;
        this.orderProducts = orderProduct;
    }

    public static class OrderProduct {

        private Product product;
        private int quantity;
        private int price;

        public OrderProduct(Product productId, int quantity, int price) {
            this.product = productId;
            this.quantity = quantity;
            this.price = price;
        }

        public Product getProductId() {
            return product;
        }

        public void setProductId(Product productId) {
            this.product = productId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public int getPrice() {
            return price;
        }

        public void setPrice(int price) {
            this.price = price;
        }

    }
}
