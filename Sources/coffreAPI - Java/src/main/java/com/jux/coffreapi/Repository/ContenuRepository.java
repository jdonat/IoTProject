package com.jux.coffreapi.Repository;

import com.jux.coffreapi.Model.Contenu;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContenuRepository extends CrudRepository<Contenu, Integer> {
}
