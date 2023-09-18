package org.backend.menudemo.repository;

import org.backend.menudemo.models.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
}
