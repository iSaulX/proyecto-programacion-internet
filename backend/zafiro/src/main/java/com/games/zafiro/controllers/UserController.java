package com.games.zafiro.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.games.zafiro.models.UserModel;
import com.games.zafiro.services.UserServices;
import com.games.zafiro.models.ModelResponse;

import java.lang.reflect.Array;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServices service;

    @PostMapping("/signup")
    public ModelResponse signup(@RequestBody UserModel user){
        user.setRole("user");
        return service.save(user);
    }

    @PostMapping("/login")
    public ModelResponse login(@RequestBody UserModel user){
        return service.login(user);
    }

    @GetMapping("/id/{email}")
    public ModelResponse findByEmail(@PathVariable String email){
        return service.getIdByEmail(email);
    }

    @PutMapping("/update")
    public ModelResponse update(@RequestBody UserModel user){
        service.update(user);
        return new ModelResponse(true, "User updated");
    }

    @GetMapping("/all")
    public ArrayList<UserModel> findAll(){
        return (ArrayList<UserModel>) service.findAll();
    }


}
