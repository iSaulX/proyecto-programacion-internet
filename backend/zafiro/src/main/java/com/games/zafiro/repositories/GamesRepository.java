package com.games.zafiro.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.games.zafiro.models.GamesModel;
import java.util.ArrayList;
import java.util.Optional;


@Repository
public interface GamesRepository extends CrudRepository<GamesModel, Long>{
    public Optional<GamesModel> findByName(String name);
    public boolean existsByName(String name);

}
