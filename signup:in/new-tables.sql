CREATE TABLE Customer(
Customer_ID CHAR(11),
Customer_address CHAR(20),
Customer_name CHAR(20),
Balance CHAR(10),
PRIMARY KEY (Customer_ID,Customer_address),
UNIQUE(Customer_address));

CREATE TABLE Coupon(
Coupon_ID CHAR(11),
Discount CHAR(11),
Expire_date DATE,
Coupon_type CHAR(11),
PRIMARY KEY (Coupon_ID));

CREATE TABLE Restaurant(
R_id CHAR(11),
R_name CHAR(20),
Category CHAR(11),
R_address CHAR(20),
R_Image_Reference VARCHAR(30),
PRIMARY KEY (R_id));

CREATE TABLE Make_advertisment_to(
A_id CHAR(11),
A_type CHAR(20),
A_price CHAR(11),
R_id CHAR(11),
A_time DATE,
Customer_ID CHAR(11) NOT NULL,
PRIMARY KEY(A_id,R_id,Customer_ID),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id) ON DELETE CASCADE,
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID));

CREATE TABLE Orders(
Order_id CHAR(11),
R_id CHAR(11),
Total_Pay CHAR(11),
Details VARCHAR(30),
O_time DATE,
O_address CHAR(20),
PRIMARY KEY(Order_id,R_id),
UNIQUE(Total_Pay),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id));

CREATE TABLE Security_linkwith(
Customer_ID CHAR(11),
Security_id CHAR(11),
Password_id CHAR(11),
User_name CHAR(11),
User_phone CHAR(11),
PRIMARY KEY(Customer_ID,Security_id),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID));


CREATE TABLE Get_C(
Customer_ID CHAR(11),
Coupon_ID CHAR(11),
C_quantity Char(10),
PRIMARY KEY(Customer_ID,Coupon_ID),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID),
FOREIGN KEY(Coupon_ID) REFERENCES Coupon(Coupon_ID));

CREATE TABLE Provide_Coupon(
R_id CHAR(11),
Coupon_ID CHAR(11),
P_quantity Char(10),
PRIMARY KEY(R_id,Coupon_ID),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id),
FOREIGN KEY(Coupon_ID)REFERENCES Coupon(Coupon_ID));

CREATE TABLE Food(
R_id CHAR(11),
F_id CHAR(11),
F_name CHAR(20),
F_discription CHAR(30),
F_type CHAR(20),
F_Image_Reference VARCHAR(30),
PRIMARY KEY(F_id),
FOREIGN KEY (R_id) REFERENCES Restaurant(R_id));

CREATE TABLE Giving_Restaurant_Review_Associate(
R_id CHAR(11),
Customer_ID CHAR(11),
R_ranking CHAR(10),
R_details VARCHAR(30),
R_time DATE,
PRIMARY KEY (R_id,Customer_ID),
UNIQUE(R_ranking),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID));

CREATE TABLE C_create(
Customer_ID CHAR(11),
Order_id CHAR(11),
Create_time DATE,
PRIMARY KEY(Customer_ID,Order_id),
FOREIGN KEY(Customer_ID)REFERENCES Customer(Customer_ID),
FOREIGN KEY(Order_id)REFERENCES Orders(Order_id));

CREATE TABLE Pay(
Order_id CHAR(11),
C_Pay CHAR(11),
Customer_ID CHAR(11),
Pay_time DATE,
PRIMARY KEY(Order_id,Customer_ID),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID),
FOREIGN KEY(Order_id)REFERENCES Orders(Order_id));

CREATE TABLE Use_at(
Coupon_ID CHAR(11),
Order_id CHAR(11),
U_time DATE,
U_quantity CHAR(11),
PRIMARY KEY(Coupon_ID,Order_id),
FOREIGN KEY(Coupon_ID) REFERENCES Coupon(Coupon_ID),
FOREIGN KEY(Order_id) REFERENCES Orders(Order_id));

CREATE TABLE Self_Pick_up(
Customer_ID CHAR(11),
Order_id CHAR(11),
P_address CHAR(20),
Pick_up_time DATE,
PRIMARY KEY(Customer_ID,Order_id),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID),
FOREIGN KEY(Order_id) REFERENCES Orders(Order_id));

CREATE TABLE Driver_deliver(
D_ssn CHAR(11),
D_name CHAR(20),
Car_detail CHAR(20),
Order_id CHAR(11),
Customer_ID CHAR(11),
Customer_address CHAR(20),
D_fee CHAR(10),
PRIMARY KEY (D_ssn,Order_id,Customer_ID,Customer_address),
FOREIGN KEY(Order_id) REFERENCES Orders(Order_id),
FOREIGN KEY(Customer_ID,Customer_address)REFERENCES Customer(Customer_ID,Customer_address));

CREATE TABLE Cancel(
Customer_ID CHAR(11),
Order_id CHAR(11),
Cancel_time Date,
PRIMARY KEY(Customer_ID,Order_id),
FOREIGN KEY(Customer_ID) REFERENCES Customer(Customer_ID),
FOREIGN KEY(Order_id)REFERENCES Orders(Order_id));

CREATE TABLE Refer_to(
Giving_Customer_ID CHAR(11),
Receive_Customer_ID CHAR(11),
Add_balance CHAR(11),
PRIMARY KEY(Giving_Customer_ID,Receive_Customer_ID),
FOREIGN KEY(Giving_Customer_ID)REFERENCES Customer(Customer_ID),
FOREIGN KEY(Receive_Customer_ID)REFERENCES Customer(Customer_ID));

CREATE TABLE Giving_Food_Review_Associate(
Customer_ID CHAR(11),
F_id CHAR(11),
F_ranking CHAR(10),
F_details VARCHAR(30),
F_time DATE,
PRIMARY KEY(F_id,Customer_ID),
UNIQUE(F_ranking),
FOREIGN KEY(F_id) REFERENCES Food(F_id),
FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID));

CREATE TABLE Foodlist_collect_provide(
R_id CHAR(11),
F_id CHAR(11),
F_name CHAR(20),
PRIMARY KEY(R_id,F_id),
FOREIGN KEY(F_id) REFERENCES Food(F_id),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id));

CREATE TABLE Menu_display_include(
R_id CHAR(11)NOT NULL,
F_id CHAR(11),
F_name CHAR(20),
M_price CHAR(10),
PRIMARY KEY(R_id,F_id),
FOREIGN KEY(R_id) REFERENCES Restaurant(R_id),
FOREIGN KEY(F_id) REFERENCES Food(F_id)ON DELETE CASCADE);

CREATE TABLE Make_f(
R_id CHAR(11),
F_id CHAR(11),
Preparing_time CHAR(11),
PRIMARY KEY(R_id,F_id),
FOREIGN KEY(R_id)REFERENCES Restaurant(R_id),
FOREIGN KEY(F_id)REFERENCES Food(F_id));

INSERT INTO Customer VALUES ('Customer_ID','Customer_address','Customer_name','Balance');
INSERT INTO Customer VALUES ('12345','fuller','CHAOWANG','20');

