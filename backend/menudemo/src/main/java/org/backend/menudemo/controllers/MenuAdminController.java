package org.backend.menudemo.controllers;


import org.backend.menudemo.models.MenuEntity;
import org.backend.menudemo.models.MenuItemEntity;
import org.backend.menudemo.models.dto.MenuDTO;
import org.backend.menudemo.models.dto.MenuItemDTO;
import org.backend.menudemo.repository.MenuItemRepository;
import org.backend.menudemo.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
@RequestMapping(value = "/admin")
public class MenuAdminController {

    @Autowired
    private MenuItemRepository menuItemRepository;
    @Autowired
    private MenuRepository menuRepository;

    @PostMapping("/addMenuItem")
    public ResponseEntity<?> addMenuItem(@RequestBody MenuItemDTO menuItemDTO) {

        MenuItemEntity newItem = new MenuItemEntity(menuItemDTO.getName(), menuItemDTO.getPrice(), menuItemDTO.getDescription(), menuItemDTO.getCategory(), menuItemDTO.isNew());

        menuItemRepository.save(newItem);

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/getMenuItems")
    public  ResponseEntity<?> getMenuItemObjects() {
        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/removeItem/{id}")
    public  ResponseEntity<?> removeMenuItem(@PathVariable Long id) {
        Optional<MenuItemEntity> removeItem = menuItemRepository.findById(id);

        if(removeItem.isPresent()) {
            menuItemRepository.delete(removeItem.get());
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/updateItem/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody MenuItemDTO menuItemDTO) {
        System.out.println(menuItemDTO.getCategory());

        Optional<MenuItemEntity> updateMenuItem = menuItemRepository.findById(id);

        if (updateMenuItem.isPresent()) {
            updateMenuItem.get().setName(menuItemDTO.getName());
            updateMenuItem.get().setCategory(menuItemDTO.getCategory());
            updateMenuItem.get().setDescription(menuItemDTO.getDescription());
            updateMenuItem.get().setPrice(menuItemDTO.getPrice());
            updateMenuItem.get().setNew(menuItemDTO.isNew());
            menuItemRepository.save(updateMenuItem.get());
        }

        return new ResponseEntity<>(menuItemRepository.findAll(), HttpStatus.OK);
    }

    /** Menu Creation mappings **/

    @GetMapping("/getMenus")
    public ResponseEntity<?> getMenus() {
        return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/createMenu")
    public ResponseEntity<?> createNewMenu(@RequestBody MenuDTO menuDTO) {

        List<Long> menuItemIds = new ArrayList<>();

        for (String item : menuDTO.getItems()) {
            Optional<MenuItemEntity> itemPresent = menuItemRepository.findByName(item);
            itemPresent.ifPresent(menuItemEntity -> menuItemIds.add(menuItemEntity.getId()));
        }

        MenuEntity newMenuEntity = new MenuEntity(menuDTO.getName(), new Date(), menuItemIds);
        menuRepository.save(newMenuEntity);

        return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/removeMenu/{id}")
    public ResponseEntity<?> removeMenu(@PathVariable Long id) {
        Optional<MenuEntity> remove = menuRepository.findById(id);

        remove.ifPresent(menuEntity -> menuRepository.delete(menuEntity));

        return new ResponseEntity<>(menuRepository.findAll(), HttpStatus.OK);
    }
}
