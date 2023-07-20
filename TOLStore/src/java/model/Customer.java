/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 * @author Kingc
 */
public class Customer {

    private int customerId;
    private String username;
    private String password;
    private String avatarUrl;

    // Private constructor to prevent direct instantiation
    private Customer() {
    }

    // Builder class
    public static class Builder {

        private int customerId;
        private String username;
        private String password;
        private String avatarUrl;

        public Builder id(int customerId) {
            this.customerId = customerId;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public Customer build() {
            Customer customer = new Customer();
            customer.customerId = this.customerId;
            customer.username = this.username;
            customer.password = this.password;
            customer.avatarUrl = this.avatarUrl;
            return customer;
        }
    }

    // Getters for customerId, username, password, and avatarUrl (you can also add setters if needed)
    public int getCustomerId() {
        return customerId;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

}
