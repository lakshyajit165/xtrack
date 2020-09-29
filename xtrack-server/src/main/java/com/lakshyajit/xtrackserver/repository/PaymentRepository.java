package com.lakshyajit.xtrackserver.repository;

import com.lakshyajit.xtrackserver.model.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findById(Long id);

    // get notes by a particular person
    @Query(value = "SELECT p FROM Payment p WHERE payer = :payer")
    Page<Payment> findByPayer(@Param("payer") String payer, Pageable pageable);


}
