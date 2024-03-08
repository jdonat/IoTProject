package com.jux.coffreapi.Model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.IdGeneratorType;

import java.sql.Blob;

@Entity
@Data
@Table(name = "contenu")
public class Contenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    protected int id;

    @Column(name = "description")
    protected String description;

    @Column(name = "imagedata")
    @Lob
    protected byte[] imageData;
}
