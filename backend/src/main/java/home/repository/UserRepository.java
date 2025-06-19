package home.repository;

import home.model.HomeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<HomeUser, Long> {
    
    Optional<HomeUser> findByUsername(String username);
    
    Boolean existsByUsernameOrEmail(String username, String email);
}