/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 * @author Kingc
 */
public class Category {

    private int id;
    private String name;

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Private constructor to prevent direct instantiation
    private Category() {
    }

    // Builder class
    public static class Builder {

        private int id;
        private String name;

        public Builder id(int id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Category build() {
            Category category = new Category();
            category.id = this.id;
            category.name = this.name;
            return category;
        }
    }

    // Getters for id and name (you can also add setters if needed)
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
