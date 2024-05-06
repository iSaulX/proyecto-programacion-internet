package com.games.zafiro.services;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.games.zafiro.repositories.SalesInterface;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.models.SalesModel;

import java.util.ArrayList;

@Service
public class SalesService {
    @Autowired
    private SalesInterface repository;

    public ModelResponse save(SalesModel sale){
        repository.save(sale);
        return new ModelResponse(true, "Sale added");
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public ArrayList<SalesModel> findAll(){
        return (ArrayList<SalesModel>) repository.findAll();
    }




}
