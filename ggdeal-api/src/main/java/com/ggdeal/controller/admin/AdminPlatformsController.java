package com.ggdeal.controller.admin;

import com.ggdeal.model.PlatformModel;
import com.ggdeal.model.PlatformType;
import com.ggdeal.repository.PlatformTypeRepository;
import com.ggdeal.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/platforms")
@Controller
public class AdminPlatformsController {

    private final PlatformService platformService;
    private final PlatformTypeRepository platformTypeRepository;

    @Autowired
    public AdminPlatformsController(PlatformService platformService, PlatformTypeRepository platformTypeRepository) {
        this.platformService = platformService;
        this.platformTypeRepository = platformTypeRepository;
    }

    @GetMapping("")
    public String adminPlatformsDashboard(Model model) {
        List<PlatformModel> platforms = platformService.findAll();
        model.addAttribute("platforms", platforms);
        model.addAttribute("platformTypes", platformTypeRepository.findAll());
        return "admin/platforms";
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<PlatformModel>> getPlatforms() {
        return ResponseEntity.ok(platformService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<PlatformModel> getPlatform(@PathVariable Long id) {
        return platformService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<PlatformModel> createPlatform(@RequestBody PlatformModel platform) {
        return ResponseEntity.ok(platformService.save(platform));
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<PlatformModel> updatePlatform(@PathVariable Long id, @RequestBody PlatformModel platform) {
        platform.setId(id);
        return ResponseEntity.ok(platformService.save(platform));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deletePlatform(@PathVariable Long id) {
        platformService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/platform-types")
    @ResponseBody
    public ResponseEntity<List<PlatformType>> getPlatformTypes() {
        return ResponseEntity.ok(platformTypeRepository.findAll());
    }

    @GetMapping("/platform-types/{id}")
    @ResponseBody
    public ResponseEntity<PlatformType> getPlatformType(@PathVariable Long id) {
        return platformTypeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}