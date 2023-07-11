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

  //expand attribute
  private boolean isRated;

  public OrderProduct(Product product, int quantity, int price) {
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  public boolean getIsRated() {
    return isRated;
  }

  public void setIsRated(boolean isRated) {
    this.isRated = isRated;
  }

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

  @Override
  public String toString() {
    return "OrderProduct{" + "product=" + product + ", quantity=" + quantity + ", price=" + price + '}';
  }

}
