package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.dto.api.PlatformModelDTO;
import com.ggdeal.repository.PlatformModelRepository;
import com.ggdeal.repository.PlatformTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ggdeal/platform")
public class PlatformController {

    private final PlatformModelRepository platformModelRepository;

    @Value("${app.media-url}")
    private String mediaBaseUrl;

    @Autowired
    public PlatformController(PlatformModelRepository platformModelRepository) {
        this.platformModelRepository = platformModelRepository;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<PlatformModelDTO>> getPlataform() {
        List<PlatformModelDTO> platforms = platformModelRepository.findAll().stream().map(platformModel -> new PlatformModelDTO(platformModel, mediaBaseUrl)).toList();
        return ResponseEntity.ok(platforms);
    }

    @GetMapping("/type-id/{id}")
    @ResponseBody
    public ResponseEntity<List<PlatformModelDTO>> getPlataformByTypeId(@PathVariable Long id) {
        List<PlatformModelDTO> platforms = platformModelRepository.findAll().stream().filter(filetId -> filetId.getId().equals(id)).map(platformModel -> new PlatformModelDTO(platformModel, mediaBaseUrl)).toList();
        return ResponseEntity.ok(platforms);
    }

}
