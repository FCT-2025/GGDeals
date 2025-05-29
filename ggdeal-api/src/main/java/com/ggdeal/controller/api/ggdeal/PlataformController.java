package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.model.PlatformType;
import com.ggdeal.repository.PlatformTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ggdeal")
public class PlataformController {

    private final PlatformTypeRepository platformTypeRepository;

    @Autowired
    public PlataformController(PlatformTypeRepository platformTypeRepository) {
        this.platformTypeRepository = platformTypeRepository;
    }

    @GetMapping("/plataform")
    public ResponseEntity<List<PlatformType>> getPlataform() {
        return ResponseEntity.status(HttpStatus.OK).body(platformTypeRepository.findAll());
    }

}
