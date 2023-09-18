package org.backend.menudemo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class MenuDTO {

    private String name;
    private List<String> items;
}
