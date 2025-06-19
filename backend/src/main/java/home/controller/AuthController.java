package home.controller;

import home.dto.*;
import home.model.HomeUser;
import home.security.JwtUtils;
import home.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User userDetails = (User) authentication.getPrincipal();

        HomeUser user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail()));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        HomeUser registeredUser = userService.registerUser(signupRequest);

        UserResponse userResponse = UserResponse.fromUser(registeredUser);
        SignupResponse response = SignupResponse.success("User registered successfully!", userResponse);

        return ResponseEntity.ok(response);
    }
}
