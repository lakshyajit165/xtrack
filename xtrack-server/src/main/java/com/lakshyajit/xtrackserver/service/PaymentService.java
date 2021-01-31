package com.lakshyajit.xtrackserver.service;

import com.lakshyajit.xtrackserver.exception.BadRequestException;
import com.lakshyajit.xtrackserver.exception.ResourceNotFoundException;
import com.lakshyajit.xtrackserver.model.Category;
import com.lakshyajit.xtrackserver.model.CategoryTotal;
import com.lakshyajit.xtrackserver.model.Payment;
import com.lakshyajit.xtrackserver.payload.PagedResponse;
import com.lakshyajit.xtrackserver.payload.PaymentRequest;
import com.lakshyajit.xtrackserver.payload.PaymentResponse;
import com.lakshyajit.xtrackserver.repository.PaymentRepository;
import com.lakshyajit.xtrackserver.security.UserPrincipal;
import com.lakshyajit.xtrackserver.util.AppConstants;
import com.lakshyajit.xtrackserver.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {


    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    // create a payment
    public Payment createPayment(PaymentRequest paymentRequest, UserPrincipal currentUser)  {

        Payment payment = new Payment();

        payment.setAmount(new BigDecimal(paymentRequest.getAmount()));
        payment.setPayee(paymentRequest.getPayee());
        payment.setPayer(currentUser.getEmail());
        payment.setDescription(paymentRequest.getDescription());
        payment.setCategory(paymentRequest.getCategory());

        return paymentRepository.save(payment);


    }

    // get payments by a user
    public PagedResponse<PaymentResponse> getPaymentsByUser(UserPrincipal currentUser, int page, int size){

        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "updatedAt");
        Page<Payment> payments = paymentRepository.findByPayer(email, pageable);

        if(payments.getNumberOfElements() == 0 || email.equals("")){

            return new PagedResponse<>(Collections.emptyList(), payments.getNumber(),
                    payments.getSize(), payments.getTotalElements(), payments.getTotalPages(), payments.isLast());

        }

        List<PaymentResponse> paymentResponses = payments.map(payment -> {
            return ModelMapper.mapPaymentToPaymentResponse(payment);
        }).getContent();

        return new PagedResponse<>(
                paymentResponses,
                payments.getNumber(),
                payments.getSize(),
                payments.getTotalElements(),
                payments.getTotalPages(),
                payments.isLast()
        );
    }

    // get payments by a user within a particular date range
    public PagedResponse<PaymentResponse> getPaymentsByUserByDate(UserPrincipal currentUser,
                                                                  int page, int size,
                                                                  String from, String to){

        validatePageNumberAndSize(page, size);
        String email = currentUser.getEmail();

        Pageable pageable = PageRequest.of(page, size);

        // create date formats
        String fromDate = from + "T00:00:00Z";

        String toDate = to + "T23:59:59Z";

        Page<Payment> payments = paymentRepository.findByPayerFilteredByDate(email, fromDate, toDate, pageable);

        if(payments.getNumberOfElements() == 0 || email.equals("")){

            return new PagedResponse<>(Collections.emptyList(), payments.getNumber(),
                    payments.getSize(), payments.getTotalElements(), payments.getTotalPages(), payments.isLast());

        }

        List<PaymentResponse> paymentResponses = payments.map(payment -> {
            return ModelMapper.mapPaymentToPaymentResponse(payment);
        }).getContent();
        
        return new PagedResponse<>(
                paymentResponses,
                payments.getNumber(),
                payments.getSize(),
                payments.getTotalElements(),
                payments.getTotalPages(),
                payments.isLast()
        );
    }

    // get category count for a particular user
    public ArrayList<CategoryTotal> getCategoryTotals(UserPrincipal currentUser, String from, String to) {

        // create date formats
        String fromDate = from + "T00:00:00Z";

        String toDate = to + "T23:59:59Z";

        String email = currentUser.getEmail();
        ArrayList<CategoryTotal> categoryTotals = paymentRepository.findCategoryCount(email, fromDate, toDate);

        return categoryTotals;

    }

    //edit a payment(only description and category fields are editable)
    public Payment updatePayment(String description, String category, Long id) throws ResourceNotFoundException {

        if(paymentRepository.existsById(id)){
            Instant now = Instant.now();
            Payment presentPayment = paymentRepository.findById(id).get();

            presentPayment.setUpdatedAt(now);


            presentPayment.setCategory(Category.valueOf(category));
            presentPayment.setDescription(description);

            return paymentRepository.save(presentPayment);

        }else{

            throw new ResourceNotFoundException("Payment", "Id", id);

        }
    }

    // delete a payment
    public Boolean deletePayment(Long id){

        Optional<Payment> payment = paymentRepository.findById(id);

        if(payment.isPresent()){
            paymentRepository.deleteById(id);
            return true;
        }else{
            throw new ResourceNotFoundException("Note", "ID", id);
        }
    }

    // get payment by id
    public PaymentResponse getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);

        if(payment.isPresent()){
            PaymentResponse paymentResponse = new PaymentResponse(
                    payment.get().getId(),
                    payment.get().getAmount(),
                    payment.get().getPayee(),
                    payment.get().getPayer(),
                    payment.get().getDescription(),
                    payment.get().getCategory(),
                    payment.get().getCreatedAt(),
                    payment.get().getUpdatedAt()
            );
            return paymentResponse;
        }else{
            throw new ResourceNotFoundException("Note", "ID", id);
        }

    }

    private void validatePageNumberAndSize(int page, int size) {

        if(page < 0){
            throw new BadRequestException("Page size cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than "+AppConstants.MAX_PAGE_SIZE);
        }
    }
}
