package com.example.javakotlinkata.beverageprices.beverages;

public class TeaWithMilk extends Tea {
    @Override
    public double price() {
        return super.price() +  0.10;
    }
}
