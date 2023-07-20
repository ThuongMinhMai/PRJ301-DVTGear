/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 * @author Kingc
 */
public class OrderProduct {

    private Product product;
    private int quantity;
    private int price;
    private boolean isRated;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public boolean getIsRated() {
        return isRated;
    }

    public void setIsRated(boolean isRated) {
        this.isRated = isRated;
    }

    // Private constructor to prevent direct instantiation from outside the class.
    private OrderProduct() {
    }

    // Builder class for the OrderProduct class
    public static class Builder {

        private Product product;
        private int quantity;
        private int price;
        private boolean isRated;

        public Builder() {
            // Set default values if necessary
            quantity = 0;
            price = 0;
            isRated = false;
        }

        // Setters for the fields that can be chained
        public Builder product(Product product) {
            this.product = product;
            return this;
        }

        public Builder quantity(int quantity) {
            // Ensure that the quantity is non-negative
            if (quantity >= 0) {
                this.quantity = quantity;
            } else {
                throw new IllegalArgumentException("Quantity cannot be negative.");
            }
            return this;
        }

        public Builder price(int price) {
            // Ensure that the price is non-negative
            if (price >= 0) {
                this.price = price;
            } else {
                throw new IllegalArgumentException("Price cannot be negative.");
            }
            return this;
        }

        public Builder isRated(boolean isRated) {
            this.isRated = isRated;
            return this;
        }

        // Build method to create the OrderProduct instance
        public OrderProduct build() {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.product = this.product;
            orderProduct.quantity = this.quantity;
            orderProduct.price = this.price;
            orderProduct.isRated = this.isRated;
            return orderProduct;
        }
    }
}
