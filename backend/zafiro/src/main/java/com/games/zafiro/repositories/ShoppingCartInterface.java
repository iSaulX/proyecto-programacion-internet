package com.games.zafiro.repositories;
import com.games.zafiro.models.ModelResponse;
import org.springframework.stereotype.Repository;
import com.games.zafiro.models.ShoppingCartModel;
import org.springframework.data.repository.CrudRepository;
import java.util.ArrayList;
import java.util.Optional;


@Repository
public interface ShoppingCartInterface extends CrudRepository<ShoppingCartModel, Long>{
    public boolean existsByUserId(Long userId);
    public boolean existsByGameId(Long gameId);
    public void deleteByGameId(Long gameId);
    public ArrayList<ShoppingCartModel> findAllByUserId(Long userId);

    public Optional<ShoppingCartModel> findByUserIdAndGameId(Long userId, Long gameId);
    public void deleteByUserIdAndGameId(Long userId, Long gameId);

    public void deleteByUserId(Long userId);
}
