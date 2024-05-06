package com.games.zafiro.services;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.models.ShoppingCartModel;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.games.zafiro.repositories.ShoppingCartInterface;
import java.util.ArrayList;

@Service
public class ShoppingCartService {
    @Autowired
    private ShoppingCartInterface repository;

    public ModelResponse save(ShoppingCartModel cart){
        if (repository.existsByUserId(cart.getUserId()) && repository.existsByGameId(cart.getGameId())){
            ShoppingCartModel cartInDb = repository.findByUserIdAndGameId(cart.getUserId(), cart.getGameId()).get();
            cartInDb.setQuantity(cartInDb.getQuantity() + cart.getQuantity());
            repository.save(cartInDb);
            return new ModelResponse(true, "Increased quantity of game in cart");
        } else {
            repository.save(cart);
            return new ModelResponse(true, "Game added to cart");
        }
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public void deleteByGameId(Long gameId){
        repository.deleteByGameId(gameId);
    }

    public ArrayList<ShoppingCartModel> findAllByUserId(Long userId){
        return (ArrayList<ShoppingCartModel>) repository.findAllByUserId(userId);
    }

    public ArrayList<ShoppingCartModel> findAll(){
        return (ArrayList<ShoppingCartModel>) repository.findAll();
    }


    public void update(ShoppingCartModel cart){
        repository.save(cart);
    }

    public ModelResponse deleteByUserIdAndGameId(Long userId, Long gameId){
        repository.deleteByUserIdAndGameId(userId, gameId);
        return new ModelResponse(true, "Game deleted from cart");
    }

    public void deleteByUserId(Long userId){
        repository.deleteByUserId(userId);
    }
}
