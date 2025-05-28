package com.ggdeal.migrate;

import com.ggdeal.model.Feature;
import com.ggdeal.model.PlatformType;
import com.ggdeal.model.Role;
import com.ggdeal.model.User;
import com.ggdeal.repository.FeatureRepository;
import com.ggdeal.repository.PlatformTypeRepository;
import com.ggdeal.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PlatformTypeRepository platformTypeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FeatureRepository featureRepository;

    public DataInitializer(UserRepository userRepository, PlatformTypeRepository platformTypeRepository, BCryptPasswordEncoder bCryptPasswordEncoder, FeatureRepository featureRepository) {
        this.userRepository = userRepository;
        this.platformTypeRepository = platformTypeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.featureRepository = featureRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        initUser();
        initPlataform();
        initFeatures();
    }

    public void initUser() {
        if (userRepository.count() != 0) return;
            userRepository.save(User.builder()
                    .username("root")
                    .email("root@example.com")
                    .role(Role.ADMIN)
                    .password(bCryptPasswordEncoder.encode("1234"))
                    .birthdate(LocalDate.now().minusYears(20))
                    .build());

    }

    public void initPlataform() {
        if (platformTypeRepository.count() != 0) return;
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

    public void initFeatures() {
        if(featureRepository.count() != 0) return;

        List<String> basicFeatures = List.of(
                "Multiplayer",
                "Singleplayer",
                "Co-op",
                "Online PvP",
                "Local PvP",
                "Controller Support",
                "Achievements",
                "Cloud Saves",
                "In-Game Purchases",
                "Cross-platform Multiplayer"
        );

        for (String name : basicFeatures) {
            Feature f = new Feature();
            f.setName(name);
            featureRepository.save(f);
        }
    }
}
