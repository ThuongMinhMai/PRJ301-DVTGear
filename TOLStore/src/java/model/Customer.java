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

  public Customer(int customerId, String username, String password, String avatarUrl) {
    this.customerId = customerId;
    this.username = username;
    this.password = password;
    this.avatarUrl = avatarUrl;

  }

  public String getAvatarUrl() {
    return avatarUrl;
  }

  public void setAvatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public int getCustomerId() {
    return customerId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
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

  @Override
  public String toString() {
    return "Customer{" + "customerId=" + customerId + ", username=" + username + ", password=" + password + ", avatarUrl=" + avatarUrl + '}';
  }

}
