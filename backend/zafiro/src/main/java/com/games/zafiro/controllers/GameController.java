package com.games.zafiro.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.games.zafiro.models.GamesModel;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.services.GamesService;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GamesService service;

    @PostMapping("/save")
    public ModelResponse save(@RequestBody GamesModel game){
        return service.save(game);
    }

    @GetMapping("/all")
    public ArrayList<GamesModel> findAll(){
        return service.findAll();
    }

    @PutMapping("/update")
    public ModelResponse update(@RequestBody GamesModel game){
        service.update(game);
        return new ModelResponse(true, "Game updated");
    }

    @DeleteMapping("/delete/{id}")
    public ModelResponse delete(@PathVariable Long id){
        return service.delete(id);
    }

    @GetMapping("/find/{id}")
    public GamesModel findById(@PathVariable Long id){
        return service.findById(id).get();
    }


    @GetMapping("/find/name/{name}/id")
    public ModelResponse findByName(@PathVariable String name){
        if(service.findByName(name).isPresent()){
            GamesModel game = service.findByName(name).get();
            return new ModelResponse(true, game.getId().toString());
        } else {
            return new ModelResponse(false, "Game not found");
        }

    }

}
