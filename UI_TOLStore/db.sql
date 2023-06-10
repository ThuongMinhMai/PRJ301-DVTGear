use dvtCreamDB
drop table OrderProducts
drop table [Order]
drop table Customer
drop table Product
drop table Category
drop table Brand
drop table Setting

CREATE TABLE Brand (
    brandId INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(255) NOT NULL
);

CREATE TABLE Category (
    categoryId INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(255) NOT NULL
);

CREATE TABLE Product (
    productId INT IDENTITY(1,1) PRIMARY KEY,
    [name] NVARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    brandId INT NOT NULL,
    [description] NVARCHAR(MAX),
    price INT NOT NULL,
    images NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId),
    FOREIGN KEY (brandId) REFERENCES Brand(brandId)
);

CREATE TABLE Customer (
  customerId INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  [password] VARCHAR(255) NOT NULL
);

CREATE TABLE [Order] (
  orderId INT IDENTITY(1,1) PRIMARY KEY,
  customerId INT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  [address] NVARCHAR(MAX) NOT NULL,
  [date] DATE NOT NULL,
  [status] VARCHAR(50) NOT NULL CHECK (status IN ('COMPLETE', 'PROCESSING', 'CANCELLED')),
  FOREIGN KEY (customerId) REFERENCES Customer(customerId)
);

CREATE TABLE OrderProducts (
  orderId INT,
  productId INT,
  quantity INT,
  price INT, -- Added price field
  PRIMARY KEY (orderId, productId),
  FOREIGN KEY (orderId) REFERENCES [Order](orderId),
  FOREIGN KEY (productId) REFERENCES Product(productId)
);

CREATE TABLE Setting (
  id INT PRIMARY KEY,
  adminEmails VARCHAR(MAX),
  bannerUrl VARCHAR(MAX)
);


INSERT INTO Setting (id,adminEmails,bannerUrl)
VALUES (1,'["kingchenobama711@gmail.com"]','')

INSERT INTO Category ([name])
VALUES (N'Laptop'), (N'PC'), (N'Màn Hình'), (N'Bàn Phím'),(N'Chuột'),(N'Tai nghe'),(N'Loa'),(N'Router Wi-fi');

INSERT INTO Brand ([name])
VALUES (N'MSI'), ( N'HP'),(N'DELL'), (N'Apple'),(N'Razer');

INSERT INTO Customer (username,[password])
VALUES (N'kingchen711',N'123456'), (N'trantruongvan',N'12345678');
