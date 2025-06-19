package home.service;

import home.dto.SignupRequest;
import home.exception.UserRegistrationException;
import home.model.HomeUser;
import home.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        HomeUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                true,   // accountNonExpired
                true,                   // credentialsNonExpired
                true,                   // accountNonLocked
                new ArrayList<>()       // authorities
        );
    }

    @Transactional
    public HomeUser registerUser(SignupRequest signupRequest) {
        HomeUser user = new HomeUser();
        user.setUsername(signupRequest.username());
        user.setEmail(signupRequest.email());
        user.setPassword(signupRequest.password());
        user.setFirstName(signupRequest.firstName());
        user.setLastName(signupRequest.lastName());
        if (userRepository.existsByUsernameOrEmail(user.getUsername(), user.getEmail())) {
            throw new UserRegistrationException("Username or Email is already in use!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<HomeUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
