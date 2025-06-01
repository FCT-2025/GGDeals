package com.ggdeal.migrate;

import com.ggdeal.enums.Role;
import com.ggdeal.model.*;
import com.ggdeal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final PlatformModelRepository platformModelRepository;
    private final GenreRepostiory genreRepostiory;

    @Autowired
    public DataInitializer(UserRepository userRepository, PlatformTypeRepository platformTypeRepository, PlatformModelRepository platformModelRepository, BCryptPasswordEncoder bCryptPasswordEncoder, FeatureRepository featureRepository, GenreRepostiory genreRepostiory) {
        this.userRepository = userRepository;
        this.platformTypeRepository = platformTypeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.featureRepository = featureRepository;
        this.platformModelRepository = platformModelRepository;
        this.genreRepostiory = genreRepostiory;
    }


    @Override
    public void run(String... args) throws Exception {
        initUser();
        initPlataform();
        initFeatures();
        intiGenres();
        initPlataforms();
    }

    public void initUser() {
        if (userRepository.count() != 0) return;

        userRepository.save(User.builder()
                .username("root")
                .email("root@example.com")
                .role(Role.ADMIN)
                .password(bCryptPasswordEncoder.encode("12345"))
                .birthdate(LocalDate.now().minusYears(20))
                .build());

    }

    public void initPlataform() {
        if (platformTypeRepository.count() != 0) return;

        List<String> plataformsTypeDefault = List.of("Consola", "PC", "Móvil", "Web");

        plataformsTypeDefault.forEach(name -> {
            platformTypeRepository.save(PlatformType.builder()
                    .name(name)
                    .build());
        });

    }

    public void initFeatures() {
        if (featureRepository.count() != 0) return;

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

        basicFeatures.forEach(name -> {
            featureRepository.save(Feature.builder()
                    .name(name)
                    .build());
        });

    }

    public void initPlataforms() {
        if (platformModelRepository.count() != 0) return;
        List<PlatformModel> plataformsModels = List.of(PlatformModel.builder()
                        .platformType(PlatformType.builder().id(2l).build())
                        .name("PC")
                        .pathLogo("pc.svg")
                        .build(),
                PlatformModel.builder()
                        .platformType(PlatformType.builder().id(1l).build())
                        .name("Play 4")
                        .pathLogo("play4.svg")
                        .build(),
                PlatformModel.builder()
                        .platformType(PlatformType.builder().id(1l).build())
                        .name("Play 5")
                        .pathLogo("play5.svg")
                        .build(),
                PlatformModel.builder()
                        .platformType(PlatformType.builder().id(1l).build())
                        .name("Xbox One")
                        .pathLogo("xboxOne.svg")
                        .build());

        plataformsModels.forEach((platformModel) -> {
            platformModelRepository.save(platformModel);
        });
    }

    public void intiGenres() {
        if (genreRepostiory.count() != 0) return;

        List<String> genresDefault = List.of(
                "Action",
                "Adventure",
                "Role-Playing",
                "Shooter",
                "Platformer",
                "Fighting",
                "Racing",
                "Sports",
                "Simulation",
                "Strategy",
                "Puzzle",
                "Survival",
                "Horror",
                "Open World",
                "Multiplayer Online Battle Arena",
                "Battle Royale",
                "Sandbox",
                "Stealth",
                "Rhythm",
                "MMORPG"
        );

        genresDefault.forEach(name -> {
            genreRepostiory.save(Genre.builder()
                    .name(name)
                    .build());
        });
    }
}
