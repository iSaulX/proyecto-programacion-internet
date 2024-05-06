package com.games.zafiro.services;
import com.games.zafiro.models.GamesModel;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.repositories.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class GamesService {
    @Autowired
    private GamesRepository repository;

    public ModelResponse save(GamesModel game){
        String name = game.getName();
        if(repository.existsByName(name)){
            return new ModelResponse(false, "Title already exists");
        } else {
            repository.save(game);
            return new ModelResponse(true, "Game saved");
        }
    }

    public boolean existsByTitle(String title){
        return repository.existsByName(title);
    }

    public ArrayList<GamesModel> findAll(){
        return (ArrayList<GamesModel>) repository.findAll();
    }

    public void update(GamesModel game){
        repository.save(game);
    }

    public ModelResponse delete(Long id){
        repository.deleteById(id);
        return new ModelResponse(true, "Game deleted");
    }

    public Optional<GamesModel> findById(Long id){
        return repository.findById(id);
    }

    public Optional<GamesModel> findByName(String name){
        return repository.findByName(name);
    }

}
