package com.ggdeal.migrate;

import com.ggdeal.model.PlatformType;
import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import com.ggdeal.repository.PlatformTypeRepository;
import com.ggdeal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PlatformTypeRepository platformTypeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public DataInitializer(UserRepository userRepository, PlatformTypeRepository platformTypeRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.platformTypeRepository = platformTypeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        initUser();
        initPlataform();
    }

    public void initUser() {
        if (userRepository.count() == 0) {
            userRepository.save(User.builder()
                    .username("root")
                    .email("root@example.com")
                    .role(Role.ADMIN)
                    .password(bCryptPasswordEncoder.encode("1234"))
                    .birthdate(LocalDate.now().minusYears(20))
                    .build());
        }
    }

    public void initPlataform() {
        if(platformTypeRepository.count() == 0)  {
            platformTypeRepository.save(PlatformType.builder()
                    .name("Consolas")
                    .build());
            platformTypeRepository.save(PlatformType.builder()
                    .name("PC")
                    .build());
            platformTypeRepository.save(PlatformType.builder()
                    .name("Móvil")
                    .build());
            platformTypeRepository.save(PlatformType.builder()
                    .name("Web")
                    .build());
        }
    }
}
