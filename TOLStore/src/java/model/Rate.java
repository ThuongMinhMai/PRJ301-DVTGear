/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 * @author Kingc
 */
public class Rate {

    private Customer customer;
    private Product product;
    private String content;
    private int value; // rate value form 1-5 star(s)

    // Private constructor to prevent direct instantiation from outside the class.
    private Rate() {
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    // Builder class for the Rate class
    public static class Builder {

        private Customer customer;
        private Product product;
        private String content;
        private int value;

        public Builder() {
            // Set default values if necessary
            value = 0;
        }

        // Setters for the fields that can be chained
        public Builder customer(Customer customer) {
            this.customer = customer;
            return this;
        }

        public Builder product(Product product) {
            this.product = product;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Builder value(int value) {
            // Ensure that the value is within the range of 1-5
            if (value >= 1 && value <= 5) {
                this.value = value;
            } else {
                throw new IllegalArgumentException("Rate value must be between 1 and 5 (inclusive).");
            }
            return this;
        }

        // Build method to create the Rate instance
        public Rate build() {
            Rate rate = new Rate();
            rate.customer = this.customer;
            rate.product = this.product;
            rate.content = this.content;
            rate.value = this.value;
            return rate;
        }
    }
}
