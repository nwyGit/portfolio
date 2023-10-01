package com.raymondNg.homieComb.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(
        prefix = "oauth.google"
)
public class GoogleOAuthConfig {
    private String clientId;
    private String clientSecret;
}