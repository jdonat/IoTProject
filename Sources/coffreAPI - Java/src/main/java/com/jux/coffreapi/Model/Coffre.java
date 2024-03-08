package com.jux.coffreapi.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "coffre")
public class Coffre {

    @Id
    @Column(name = "id")
    protected int id;

    @Column(name = "closed")
    protected boolean closed;

    @Column(name = "code")
    protected String code;


}
