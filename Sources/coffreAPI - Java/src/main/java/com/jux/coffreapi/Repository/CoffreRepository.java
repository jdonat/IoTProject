package com.jux.coffreapi.Repository;

import com.jux.coffreapi.Model.Coffre;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoffreRepository extends CrudRepository<Coffre, Integer> {
}
