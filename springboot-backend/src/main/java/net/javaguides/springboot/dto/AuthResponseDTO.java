package net.javaguides.springboot.dto;

import net.javaguides.springboot.model.Role;
import net.javaguides.springboot.model.UserEntity;

import java.util.List;

public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";

    private UserEntity user;

    public AuthResponseDTO(String accessToken, UserEntity user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}