package com.ggdeal.controller.admin;

import com.ggdeal.model.Feature;
import com.ggdeal.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/admin/features")
public class AdminFeatureController {

    private final FeatureService featureService;

    @Autowired
    public AdminFeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping("")
    public String showFeatures(Model model) {
        List<Feature> features = featureService.getAllFeatures();
        model.addAttribute("features", features);
        return "admin/features";
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Feature>> getFeatures() {
        return ResponseEntity.ok(featureService.getAllFeatures());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Feature> getFeature(@PathVariable Long id) {
        return featureService.getFeatureById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {
        return ResponseEntity.ok(featureService.saveFeature(feature));
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Feature> updateFeature(@PathVariable Long id, @RequestBody Feature feature) {
        feature.setId(id);
        return ResponseEntity.ok(featureService.saveFeature(feature));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteFeature(@PathVariable Long id) {
        featureService.deleteFeature(id);
        return ResponseEntity.ok().build();
    }
}