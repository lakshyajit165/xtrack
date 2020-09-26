package com.lakshyajit.xtrackserver.repository;

import com.lakshyajit.xtrackserver.model.Role;
import com.lakshyajit.xtrackserver.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}