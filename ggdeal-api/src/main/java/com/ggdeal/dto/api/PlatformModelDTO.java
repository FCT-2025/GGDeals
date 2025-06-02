package com.ggdeal.dto.api;

import com.ggdeal.model.PlatformModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.net.URI;

@Getter
@Setter
public class PlatformModelDTO {
    private Long id;
    private String src;
    private String name;
    private Integer count;

    public PlatformModelDTO(PlatformModel platformModel, String mediaBaseUrl) {
        this.id = platformModel.getId();
        this.name = platformModel.getName();
        this.count = platformModel.getReplicas().size();
        String path = null;
        if(platformModel.getPathLogo() != null) {
            path = URI.create(mediaBaseUrl).resolve(platformModel.getPathLogo()).toString();
        }
        this.src =  path;
    }
}
