package home.dto;

import home.model.HomeUser;

/**
 * Data Transfer Object for User entity
 * Contains only the fields that should be exposed to the client
 */
public record UserResponse(
    Long id,
    String username,
    String email,
    String firstName,
    String lastName
) {
    public static UserResponse fromUser(HomeUser user) {
        return new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName()
        );
    }
}