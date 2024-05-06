package com.games.zafiro.controllers;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.models.ShoppingCartModel;
import com.games.zafiro.services.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/shopping-cart")
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService service;

    @PostMapping("/add")
    public ModelResponse save(@RequestBody ShoppingCartModel cart){
        return service.save(cart);
    }

    @GetMapping("products/{userId}")
    public ArrayList<ShoppingCartModel> findAllByUserId(@PathVariable Long userId){
        return service.findAllByUserId(userId);
    }

    @GetMapping("/all")
    public ArrayList<ShoppingCartModel> findAll(){
        return service.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

    @DeleteMapping("/delete/game/{gameId}/{userId}")
    public ModelResponse deleteByUserIdAndGameId(@PathVariable Long userId, @PathVariable Long gameId){
        service.deleteByUserIdAndGameId(userId, gameId);
        return new ModelResponse(true, "Game deleted from cart");
    }

    @PutMapping("/update")
    public ModelResponse update(@RequestBody ShoppingCartModel cart){
        service.update(cart);
        return new ModelResponse(true, "Cart updated");
    }

    @DeleteMapping("/delete/user/{userId}")
    public void deleteByUserId(@PathVariable Long userId){
        service.deleteByUserId(userId);
    }

}
