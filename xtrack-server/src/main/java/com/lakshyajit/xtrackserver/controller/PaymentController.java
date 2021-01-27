package com.lakshyajit.xtrackserver.controller;

import com.lakshyajit.xtrackserver.exception.ResourceNotFoundException;
import com.lakshyajit.xtrackserver.model.Category;
import com.lakshyajit.xtrackserver.model.Payment;
import com.lakshyajit.xtrackserver.payload.ApiResponse;
import com.lakshyajit.xtrackserver.payload.PagedResponse;

import com.lakshyajit.xtrackserver.payload.PaymentRequest;
import com.lakshyajit.xtrackserver.payload.PaymentResponse;
import com.lakshyajit.xtrackserver.security.CurrentUser;
import com.lakshyajit.xtrackserver.security.UserPrincipal;
import com.lakshyajit.xtrackserver.service.PaymentService;
import com.lakshyajit.xtrackserver.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {


    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    // Server Test Route
    @GetMapping("/test")
    public String testRoute(){
        return "Serve is Up!";
    }
    // create a payment
    @PostMapping("/create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createPayment(@Valid @RequestBody PaymentRequest paymentRequest,
                                           @CurrentUser UserPrincipal currentUser){

       Payment payment = paymentService.createPayment(paymentRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(payment.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Payment Complete!"));
    }

    // get payments by a user
    @GetMapping("/mypayments")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<PaymentResponse> getPaymentsByUser(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size
    ) {
        return paymentService.getPaymentsByUser(currentUser, page, size);
    }

    // get payments by a user within a date range
    @GetMapping("/mypayments/filtered")
    @PreAuthorize("hasRole('USER')")
    public PagedResponse<PaymentResponse> getPaymentsByUserFilteredByDate(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "from") String from,
            @RequestParam(value = "to") String to,
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size
    ) {
        return paymentService.getPaymentsByUserByDate(currentUser, page, size, from, to);
    }

    // get payment by id
    @GetMapping("/mypayments/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPaymentById(
            @PathVariable Long id
    ) {

        try {
            PaymentResponse payment = paymentService.getPaymentById(id);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{id}")
                    .buildAndExpand(payment.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(payment);
        }catch (ResourceNotFoundException e) {

            return ResponseEntity.badRequest().body(new ApiResponse(false, "Error fetching payment details!"));
        }
    }
    // edit payment(only desc and category are editable
    @PatchMapping("mypayments/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updatePayment(
            @Valid @RequestBody PaymentRequest paymentRequest,
            @PathVariable Long id
    ) {

        try {
            Payment payment = paymentService.updatePayment(paymentRequest.getDescription(), paymentRequest.getCategory().toString(), id);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{id}")
                    .buildAndExpand(payment.getId()).toUri();

            return ResponseEntity.created(location)
                    .body(new ApiResponse(true, "Payment updated successfully!"));
        }catch (ResourceNotFoundException e) {

            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid Id!"));
        }
    }

    // Delete a payment
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteNote(@PathVariable Long id){
        if(paymentService.deletePayment(id)){
            return ResponseEntity.ok()
                    .body(new ApiResponse(true, "Payment deleted successfully!"));
        }else{
            return ResponseEntity.status(400)
                    .body(new ApiResponse(false, "An error occurred!"));
        }
    }
}
