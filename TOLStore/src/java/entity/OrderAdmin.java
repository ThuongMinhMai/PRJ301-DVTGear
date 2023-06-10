/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import entity.Order.Status;
import java.util.Date;

/**
 *
 * @author Kingc
 */
public class OrderAdmin {

    private int id;
    private String username;
    private Date date;
    private Status status;
    private int totalMoney;

    public OrderAdmin(int id, String username, Date date, Status status, int totalMoney) {
        this.id = id;
        this.username = username;
        this.date = date;
        this.status = status;
        this.totalMoney = totalMoney;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(int totalMoney) {
        this.totalMoney = totalMoney;
    }

}
