/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.List;

/**
 *
 * @author Kingc
 */
public class Product {

    private int id;
    private String name;
    private Category category;
    private Brand brand;
    private String images;
    private int price;
    private String description;
    private int storage;

    //expand atribute
    private List<Rate> rateList;

    public Product(int id, String name, Category category, Brand brand, String images, int price, String description, int storage) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.images = images;
        this.price = price;
        this.description = description;
        this.storage = storage;
    }

    public List<Rate> getRateList() {
        return rateList;
    }

    public void setRateList(List<Rate> rateList) {
        this.rateList = rateList;
    }

    public int getStorage() {
        return storage;
    }

    public void setStorage(int storage) {
        this.storage = storage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Product{" + "id=" + id + ", name=" + name + ", category=" + category + ", brand=" + brand + ", images=" + images + ", price=" + price + ", description=" + description + ", storage=" + storage + '}';
    }

}
