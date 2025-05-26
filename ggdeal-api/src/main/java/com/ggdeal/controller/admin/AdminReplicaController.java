package com.ggdeal.controller.admin;

import com.ggdeal.model.Edition;
import com.ggdeal.model.Game;
import com.ggdeal.model.PlatformType;
import com.ggdeal.model.Replica;
import com.ggdeal.service.EditionService;
import com.ggdeal.service.GameService;
import com.ggdeal.service.PlatformTypeService;
import com.ggdeal.service.ReplicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/admin/keys")
public class AdminReplicaController {

    private final ReplicaService replicaService;
    private final GameService gameService;
    private final EditionService editionService;
    private final PlatformTypeService platformTypeService;

    @Autowired
    public AdminReplicaController(ReplicaService replicaService,
                                  GameService gameService,
                                  EditionService editionService,
                                  PlatformTypeService platformTypeService) {
        this.replicaService = replicaService;
        this.gameService = gameService;
        this.editionService = editionService;
        this.platformTypeService = platformTypeService;
    }

    @GetMapping("")
    public String showReplicas(Model model) {
        List<Replica> replicas = replicaService.findAll();
        long totalReplicas = replicaService.countAll();
        long availableReplicas = replicaService.countByIsSold(false);
        long soldReplicas = replicaService.countByIsSold(true);

        model.addAttribute("replicas", replicas);
        model.addAttribute("totalReplicas", totalReplicas);
        model.addAttribute("availableReplicas", availableReplicas);
        model.addAttribute("soldReplicas", soldReplicas);
        model.addAttribute("games", gameService.findAll());
        model.addAttribute("editions", editionService.findAll());
        model.addAttribute("platforms", platformTypeService.findAll());

        return "admin/keys";
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Replica>> getAllReplicas() {
        return ResponseEntity.ok(replicaService.findAll());
    }

    @GetMapping("/available")
    @ResponseBody
    public ResponseEntity<List<Replica>> getAvailableReplicas() {
        return ResponseEntity.ok(replicaService.findByIsSold(false));
    }

    @GetMapping("/sold")
    @ResponseBody
    public ResponseEntity<List<Replica>> getSoldReplicas() {
        return ResponseEntity.ok(replicaService.findByIsSold(true));
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Replica> getReplica(@PathVariable Long id) {
        return replicaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Replica> createReplica(@RequestBody Replica replica) {
        return ResponseEntity.ok(replicaService.save(replica));
    }

    @PostMapping("/batch")
    @ResponseBody
    public ResponseEntity<List<Replica>> createReplicaBatch(
            @RequestBody Map<String, Object> requestBody) {

        Long gameId = Long.valueOf(requestBody.get("gameId").toString());
        Long editionId = Long.valueOf(requestBody.get("editionId").toString());
        Long platformId = Long.valueOf(requestBody.get("platformId").toString());
        Boolean isSold = Boolean.valueOf(requestBody.get("isSold").toString());

        Optional<Game> game = gameService.findById(gameId);
        Optional<PlatformType> platform = platformTypeService.findById(platformId);

        if (!game.isPresent() || !platform.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        List<String> activationKeys;

        if (requestBody.containsKey("generateKeys") && (Boolean)requestBody.get("generateKeys")) {
            int quantity = Integer.parseInt(requestBody.get("quantity").toString());
            String format = requestBody.get("format").toString();
            String prefix = requestBody.get("prefix") != null ?
                    requestBody.get("prefix").toString() : "";

            activationKeys = replicaService.generateActivationKeys(quantity, format, prefix);
        } else {
            @SuppressWarnings("unchecked")
            List<String> keys = (List<String>) requestBody.get("activationKeys");
            activationKeys = keys;
        }

        List<Replica> savedReplicas = replicaService.saveBatch(
                game.get(), platform.get(), editionId, activationKeys, isSold);

        return ResponseEntity.ok(savedReplicas);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Replica> updateReplica(@PathVariable Long id, @RequestBody Replica replica) {
        if (!replicaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        replica.setId(id);
        return ResponseEntity.ok(replicaService.save(replica));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteReplica(@PathVariable Long id) {
        if (!replicaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        replicaService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}