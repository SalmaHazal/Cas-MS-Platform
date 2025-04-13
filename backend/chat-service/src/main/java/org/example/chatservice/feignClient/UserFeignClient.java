package org.example.chatservice.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;


@FeignClient(name = "auth-service", configuration = FeignClientConfig.class)
public interface UserFeignClient {
    @GetMapping("/auth/profile")
    String currentUserProfile();
}