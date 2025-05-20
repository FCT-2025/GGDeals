package com.ggdeal.model.util;

import java.util.Arrays;
import java.util.stream.Collectors;

public class ModelUtils {
    public static String parseSlug(String name) {
        return Arrays.stream(name.trim().toLowerCase().split("\\s+"))
                .map(word -> word.replaceAll("[^a-z0-9-]", ""))
                .collect(Collectors.joining("-"));
    }
}
