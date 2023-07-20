package model;

public class Brand {

    private int id;
    private String name;

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Private constructor to prevent direct instantiation
    private Brand() {
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

        public Brand build() {
            Brand brand = new Brand();
            brand.id = this.id;
            brand.name = this.name;
            return brand;
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
