package com.games.zafiro.repositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.games.zafiro.models.UserModel;
import com.games.zafiro.models.ModelResponse;

@Repository
public interface UserRepository  extends CrudRepository<UserModel, Long>{
    public UserModel findByEmail(String email);
    public boolean existsByEmail(String email);

}
