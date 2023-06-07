package com.example.tproyalbe.controller.vnpay;

import com.example.tproyalbe.DTO.payment.PaymentReqDTO;
import com.example.tproyalbe.DTO.payment.PaymentResDTO;
import com.example.tproyalbe.DTO.payment.PaymentSendEmailDTO;
import com.example.tproyalbe.config.vnpay.VNPayConfig;
import com.example.tproyalbe.service.vnpay.impl.VNPayServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class VNPayController {
    @Autowired
    private VNPayServiceImpl vnPayService;
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping("/create_payment")
    public ResponseEntity<?> createPayment (@RequestBody PaymentReqDTO paymentReqDTO) throws UnsupportedEncodingException {
//        String orderType = req.getParameter("ordertype");
//        String bankCode = req.getParameter("bankCode");

        long amount = paymentReqDTO.getAmount()*100;
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
//        String vnp_IpAddr = VNPayConfig.getIpAddress(req);
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_Returnurl);
//        vnp_Params.put("vnp_OrderType", orderType);
//
//        String locate = req.getParameter("language");
//        if (locate != null && !locate.isEmpty()) {
//            vnp_Params.put("vnp_Locale", locate);
//        } else {
//            vnp_Params.put("vnp_Locale", "vn");
//        }
//        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_Returnurl);
//        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;

        PaymentResDTO paymentResDTO = new PaymentResDTO();
        paymentResDTO.setStatus("OK");
        paymentResDTO.setMsg("Thành công");
        paymentResDTO.setUrl(paymentUrl);
        return ResponseEntity.status(HttpStatus.OK).body(paymentResDTO);
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail (@RequestBody PaymentSendEmailDTO paymentSendEmailDTO) {
        if (paymentSendEmailDTO.getEmail() == null) {
            return new ResponseEntity<>("Tài khoản này chưa có email", HttpStatus.BAD_REQUEST);
        }
        vnPayService.sendEmail(paymentSendEmailDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping("/payment-info")
//    public ResponseEntity<?> transaction (
//            @RequestParam(value = "vnp_Amount") String amount,
//            @RequestParam(value = "vnp_BankCode") String bankCode,
//            @RequestParam(value = "vnp_OrderInfo") String order,
//            @RequestParam(value = "vnp_ResponseCode") String responseCode
//    ) {
//        TransactionStatusDTO transactionStatusDTO = new TransactionStatusDTO();
//        if (responseCode.equals("00")) {
//            transactionStatusDTO.setStatus("OK");
//            transactionStatusDTO.setMsg("Thành công");
//            transactionStatusDTO.setData("");
//        } else {
//            transactionStatusDTO.setStatus("NO");
//            transactionStatusDTO.setMsg("Thất bại");
//            transactionStatusDTO.setData("");
//        }
//        return new ResponseEntity<>(transactionStatusDTO, HttpStatus.OK);
//    }
}