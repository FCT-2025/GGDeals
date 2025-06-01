package com.ggdeal.controller.admin;

import com.ggdeal.model.Game;
import com.ggdeal.model.PlatformModel;
import com.ggdeal.model.Replica;
import com.ggdeal.repository.PlatformModelRepository;
import com.ggdeal.service.EditionService;
import com.ggdeal.service.game.GameServiceImpl;
import com.ggdeal.service.PlatformTypeService;
import com.ggdeal.service.ReplicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/admin/keys")
public class AdminReplicaController {

    private final ReplicaService replicaService;
    private final GameServiceImpl gameServiceImpl;
    private final EditionService editionService;
    private final PlatformTypeService platformTypeService;
    private final PlatformModelRepository platformModelRepository;

    @Autowired
    public AdminReplicaController(ReplicaService replicaService,
                                  GameServiceImpl gameServiceImpl,
                                  EditionService editionService,
                                  PlatformTypeService platformTypeService,
                                  PlatformModelRepository platformModelRepository) {
        this.replicaService = replicaService;
        this.gameServiceImpl = gameServiceImpl;
        this.editionService = editionService;
        this.platformTypeService = platformTypeService;
        this.platformModelRepository = platformModelRepository;
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
        model.addAttribute("games", gameServiceImpl.findAll());
        model.addAttribute("editions", editionService.findAll());
        model.addAttribute("platforms", platformModelRepository.findAll());

        return "admin/replica";
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

        if (requestBody.get("gameId") == null || requestBody.get("platformId") == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Long gameId = Long.valueOf(requestBody.get("gameId").toString());

        Long editionId = null;
        if (requestBody.get("editionId") != null) {
            editionId = Long.valueOf(requestBody.get("editionId").toString());
        }

        Long platformModelId = Long.valueOf(requestBody.get("platformId").toString());
        Boolean isSold = requestBody.get("isSold") != null ?
                Boolean.valueOf(requestBody.get("isSold").toString()) : false;

        Optional<Game> game = gameServiceImpl.findById(gameId);
        Optional<PlatformModel> platformModel = platformModelRepository.findById(platformModelId);

        if (!game.isPresent() || !platformModel.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        List<String> activationKeys;

        if (requestBody.containsKey("generateKeys") && (Boolean) requestBody.get("generateKeys")) {
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
                game.get(), platformModel.get(), editionId, activationKeys, isSold);

        return ResponseEntity.ok(savedReplicas);
    }


    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> updateReplica(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        Optional<Replica> optionalReplica = replicaService.findById(id);
        if (!optionalReplica.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Replica replica = optionalReplica.get();


        if (requestBody.get("activationKey") != null) {
            replica.setActivationKey(requestBody.get("activationKey").toString());
        }


        if (requestBody.get("gameId") != null) {
            Long gameId = Long.valueOf(requestBody.get("gameId").toString());
            gameServiceImpl.findById(gameId).ifPresent(replica::setGame);
        }


        if (requestBody.get("editionId") != null) {
            Long editionId = Long.valueOf(requestBody.get("editionId").toString());
            editionService.findById(editionId).ifPresent(replica::setEdition);
        }

        if (requestBody.get("platformId") != null) {
            Long platformId = Long.valueOf(requestBody.get("platformId").toString());
            platformModelRepository.findById(platformId).ifPresent(platformModel -> {
                replica.setPlatformModel(platformModel);
            });
        }


        if (requestBody.get("isSold") != null) {
            replica.setIsSold(Boolean.valueOf(requestBody.get("isSold").toString()));
        }

        Replica savedReplica = replicaService.save(replica);


        Map<String, Object> response = new HashMap<>();
        response.put("id", savedReplica.getId());
        response.put("activation_key", savedReplica.getActivationKey());
        response.put("isSold", savedReplica.getIsSold());

        return ResponseEntity.ok(response);
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