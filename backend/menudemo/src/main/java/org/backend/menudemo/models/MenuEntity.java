package org.backend.menudemo.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class MenuEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date lastUpdated;
    @Column(length = 3000, columnDefinition = "MEDIUMBLOB NOT NULL")
    private List<Long> menuItemIds;

    public MenuEntity(String name, Date lastUpdated, List<Long> menuItemIds) {
        this.name = name;
        this.lastUpdated = lastUpdated;
        this.menuItemIds = menuItemIds;
    }

    public MenuEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public List<Long> getMenuItemIds() {
        return menuItemIds;
    }

    public void setMenuItemIds(List<Long> menuItemIds) {
        this.menuItemIds = menuItemIds;
    }
}
