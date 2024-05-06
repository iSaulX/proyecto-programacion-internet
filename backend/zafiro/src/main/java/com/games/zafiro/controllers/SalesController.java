package com.games.zafiro.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.games.zafiro.models.SalesModel;
import com.games.zafiro.models.ModelResponse;
import com.games.zafiro.services.SalesService;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/sales")
public class SalesController {
    @Autowired
    private SalesService service;

    @PostMapping("/save")
    public ModelResponse save(@RequestBody SalesModel sale){
        return service.save(sale);
    }

    @GetMapping("/all")
    public ArrayList<SalesModel> findAll(){
        return service.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }

    @PutMapping("/update")
    public ModelResponse update(@RequestBody SalesModel sale){
        service.save(sale);
        return new ModelResponse(true, "Sale updated");
    }
}
