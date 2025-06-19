package home.dto;

import java.time.LocalDateTime;

/**
 * Standard error response DTO for API errors.
 */
public record ErrorResponse(
    LocalDateTime timestamp,
    int status,
    String error,
    String message,
    String path
) {
    public ErrorResponse(int status, String error, String message, String path) {
        this(LocalDateTime.now(), status, error, message, path);
    }
}
