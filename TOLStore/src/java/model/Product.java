/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.util.List;

/**
 * @author Kingc
 */
import java.util.List;

public class Product {

    private int id;
    private String name;
    private Category category;
    private Brand brand;
    private String images;
    private int price;
    private String description;
    private int storage;
    private boolean disable;
    private int sold;
    private List<Rate> rateList;

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

    public int getStorage() {
        return storage;
    }

    public void setStorage(int storage) {
        this.storage = storage;
    }

    public boolean isDisable() {
        return disable;
    }

    public void setDisable(boolean disable) {
        this.disable = disable;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }

    public List<Rate> getRateList() {
        return rateList;
    }

    public void setRateList(List<Rate> rateList) {
        this.rateList = rateList;
    }

    private Product(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.category = builder.category;
        this.brand = builder.brand;
        this.images = builder.images;
        this.price = builder.price;
        this.description = builder.description;
        this.storage = builder.storage;
        this.disable = builder.disable;
        this.sold = builder.sold;
        this.rateList = builder.rateList;
    }

    // Getters for the private fields (omitted for brevity).
    public static class Builder {

        private int id;
        private String name;
        private Category category;
        private Brand brand;
        private String images;
        private int price;
        private String description;
        private int storage;
        private boolean disable;
        private int sold;
        private List<Rate> rateList;

        public Builder() {

        }

        public Builder id(int id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder category(Category category) {
            this.category = category;
            return this;
        }

        public Builder brand(Brand brand) {
            this.brand = brand;
            return this;
        }

        public Builder images(String images) {
            this.images = images;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder storage(int storage) {
            this.storage = storage;
            return this;
        }

        public Builder disable(boolean disable) {
            this.disable = disable;
            return this;
        }

        public Builder sold(int sold) {
            this.sold = sold;
            return this;
        }

        public Builder rateList(List<Rate> rateList) {
            this.rateList = rateList;
            return this;
        }

        public Product build() {
            return new Product(this);
        }
    }
}
