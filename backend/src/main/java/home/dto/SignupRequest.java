package home.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @NotBlank
    @Size(min = 3, max = 50)
    String username,

    @NotBlank
    @Size(min = 6)
    String password,

    @NotBlank
    @Size(max = 100)
    @Email
    String email,

    @Size(max = 50)
    String firstName,

    @Size(max = 50)
    String lastName
) {
}
