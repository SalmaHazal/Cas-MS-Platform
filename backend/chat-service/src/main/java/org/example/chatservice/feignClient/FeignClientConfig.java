package org.example.chatservice.feignClient;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignClientConfig {

    @Autowired
    private TokenProvider tokenProvider;

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                String token = tokenProvider.getToken();
                if (token != null && !token.isEmpty()) {
                    template.header("Authorization", "Bearer " + token);
                }
            }
        };
    }
}
