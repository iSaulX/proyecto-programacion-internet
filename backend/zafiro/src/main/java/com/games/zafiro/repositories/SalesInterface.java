package com.games.zafiro.repositories;
import org.springframework.stereotype.Repository;
import com.games.zafiro.models.SalesModel;
import org.springframework.data.repository.CrudRepository;
import java.util.ArrayList;

@Repository
public interface SalesInterface extends CrudRepository<SalesModel, Long>{

}
