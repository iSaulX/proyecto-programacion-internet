package com.games.zafiro.services;
import com.games.zafiro.models.ShoppingCartModel;
import org.apache.catalina.User;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.games.zafiro.repositories.UserRepository;
import com.games.zafiro.models.UserModel;
import com.games.zafiro.models.ModelResponse;
import org.springframework.ui.Model;

import java.lang.reflect.Array;
import java.util.Base64;
import java.util.ArrayList;

import java.util.Optional;

@Service
public class UserServices {
    @Autowired
    private UserRepository repository;

    public ModelResponse save(UserModel user){
        String email = user.getEmail();
        if(repository.existsByEmail(email)){
            return new ModelResponse(false, "Email already exists");
        } else {
            repository.save(user);
            return new ModelResponse(true, "User saved");
        }
    }

    public Optional<UserModel> findByEmail(String email){
        return Optional.ofNullable(repository.findByEmail(email));
    }

    public boolean existsByEmail(String email){
        return repository.existsByEmail(email);
    }

    public Optional<UserModel> findById(Long id){
        return repository.findById(id);
    }

    public Iterable<UserModel> findAll(){
        return repository.findAll();
    }


    public void update(UserModel user){
        repository.save(user);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public ModelResponse login(UserModel user){
        String email = user.getEmail();
        String password = user.getPassword();
        if (existsByEmail(email)){
            UserModel userDB = findByEmail(email).get();
            if (userDB.getPassword().equals(password)){
                String token = Base64.getEncoder().encodeToString((email + ":" + password).getBytes());
                return new ModelResponse(true, token);
            } else {
                return new ModelResponse(false, "Incorrect password");
            }
        } else {
            return new ModelResponse(false, "User not found");
        }
    }

    public ModelResponse signUp(UserModel user){
        String email = user.getEmail();
        if (existsByEmail(email)){
            return new ModelResponse(false, "Email already exists");
        } else {
            user.setRole("user");
            String token = Base64.getEncoder().encodeToString((email + ":" + user.getPassword()).getBytes());
            repository.save(user);
            return new ModelResponse(true, token);
        }
    }



    public ModelResponse getIdByEmail(String email) {
        try {
            UserModel user = findByEmail(email).get();
            return new ModelResponse(true, user.getId().toString());
        } catch (Exception e) {
            return new ModelResponse(false, "User not found");
        }
    }



}
