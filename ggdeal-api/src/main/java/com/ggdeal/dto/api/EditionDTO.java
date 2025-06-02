package com.ggdeal.dto.api;

import com.ggdeal.model.Edition;
import lombok.Data;

@Data
public class EditionDTO {
    private Long id;
    private String name;
    private String description;

    public EditionDTO(Edition edition) {
        this.id = edition.getId();
        this.name = edition.getName();
        this.description = edition.getDescription();
    }
}
