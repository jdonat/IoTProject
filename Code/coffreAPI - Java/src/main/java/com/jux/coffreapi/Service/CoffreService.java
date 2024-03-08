package com.jux.coffreapi.Service;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jux.coffreapi.Model.Coffre;
import com.jux.coffreapi.Repository.CoffreRepository;
import jakarta.persistence.PostLoad;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service

public class CoffreService {

    @Autowired
    CoffreRepository coffreRepository;


    public Iterable<Coffre> getCoffres(){

        return coffreRepository.findAll();
    }

    public void saveCoffre(Coffre coffre){
        coffreRepository.save(coffre);
    }



    public Optional<Coffre> getCoffre(final int id){
        return coffreRepository.findById(id);
    }




      }
