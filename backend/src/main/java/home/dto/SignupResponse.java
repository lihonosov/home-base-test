package home.dto;

import java.time.LocalDateTime;

/**
 * Response DTO for user registration
 */
public record SignupResponse(
    boolean success,
    String message,
    UserResponse user,
    LocalDateTime timestamp
) {
    public SignupResponse(boolean success, String message, UserResponse user) {
        this(success, message, user, LocalDateTime.now());
    }

    public static SignupResponse success(String message, UserResponse user) {
        return new SignupResponse(true, message, user);
    }

    public static SignupResponse error(String message) {
        return new SignupResponse(false, message, null);
    }
}
