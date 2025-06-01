package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.dto.api.PlatformModelDTO;
import com.ggdeal.repository.PlatformModelRepository;
import com.ggdeal.repository.PlatformTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ggdeal/platform")
public class PlatformController {

    private final PlatformTypeRepository platformTypeRepository;
    private final PlatformModelRepository platformModelRepository;

    @Value("${app.media-url}")
    private String mediaBaseUrl;

    @Autowired
    public PlatformController(PlatformTypeRepository platformTypeRepository, PlatformModelRepository platformModelRepository) {
        this.platformTypeRepository = platformTypeRepository;
        this.platformModelRepository = platformModelRepository;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<PlatformModelDTO>> getPlataform() {
        List<PlatformModelDTO> platforms = platformModelRepository.findAll().stream().map(platformModel -> new PlatformModelDTO(platformModel, mediaBaseUrl)).toList();
        return ResponseEntity.ok(platforms);
    }

}
