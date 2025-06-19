package home.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when there is an issue with user registration.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserRegistrationException extends RuntimeException {

    public UserRegistrationException(String message) {
        super(message);
    }
}