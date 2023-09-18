package org.backend.menudemo.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MenuItemDTO {

    private String name;
    private double price;
    private String description;
    private String category;
    private boolean isNew;


}
