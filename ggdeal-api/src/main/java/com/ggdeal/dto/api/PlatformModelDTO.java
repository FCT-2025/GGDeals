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

    public PlatformModelDTO(PlatformModel platformModel, String mediaBaseUrl) {
        this.id = platformModel.getId();
        this.name = platformModel.getName();
        String path = null;
        if(platformModel.getPathLogo() != null) {
            URI.create(mediaBaseUrl).resolve(platformModel.getPathLogo()).toString();
        }
        this.src =  path;
    }
}
